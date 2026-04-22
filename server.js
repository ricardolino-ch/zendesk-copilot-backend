require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let ticketFieldCache = {
  expiresAt: 0,
  data: []
};

function getLanguageName(code) {
  const map = {
    de: "German",
    fr: "French",
    it: "Italian",
    en: "English"
  };
  return map[code] || "German";
}

function getGreeting(code, requesterName) {
  const safeName = requesterName || "{{ticket.requester.name}}";

  const greetings = {
    de: `Grüezi ${safeName}

Vielen Dank für Ihre Anfrage.`,
    fr: `Bonjour ${safeName}

Merci beaucoup pour votre demande.`,
    it: `Gentile ${safeName}

La ringraziamo per la Sua richiesta.`,
    en: `Hello ${safeName}

Thank you for your inquiry.`
  };

  return greetings[code] || greetings.de;
}

function getClosing(code) {
  const closings = {
    de: "Freundliche Grüsse",
    fr: "Meilleures salutations",
    it: "Cordiali saluti",
    en: "Kind regards"
  };

  return closings[code] || closings.de;
}

async function runPrompt(prompt) {
  const response = await client.responses.create({
    model: "gpt-5.4",
    input: prompt
  });

  return response.output_text || "";
}

function getZendeskAuthHeader() {
  const email = process.env.ZENDESK_EMAIL;
  const token = process.env.ZENDESK_API_TOKEN;

  if (!email || !token) {
    throw new Error("ZENDESK_EMAIL oder ZENDESK_API_TOKEN fehlt");
  }

  const raw = `${email}/token:${token}`;
  return `Basic ${Buffer.from(raw).toString("base64")}`;
}

function getZendeskBaseUrl() {
  const subdomain = process.env.ZENDESK_SUBDOMAIN;

  if (!subdomain) {
    throw new Error("ZENDESK_SUBDOMAIN fehlt");
  }

  return `https://${subdomain}.zendesk.com/api/v2`;
}

async function zendeskGet(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": getZendeskAuthHeader(),
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Zendesk request failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function fetchTicketFields() {
  if (Date.now() < ticketFieldCache.expiresAt && ticketFieldCache.data.length) {
    return ticketFieldCache.data;
  }

  const baseUrl = getZendeskBaseUrl();
  let url = `${baseUrl}/ticket_fields.json`;
  let allFields = [];
  let pageCount = 0;
  const maxPages = 50;

  while (url && pageCount < maxPages) {
    const json = await zendeskGet(url);
    const fields = Array.isArray(json.ticket_fields) ? json.ticket_fields : [];
    allFields = allFields.concat(fields);
    url = json.next_page || null;
    pageCount += 1;
  }

  ticketFieldCache = {
    expiresAt: Date.now() + 30 * 60 * 1000,
    data: allFields
  };

  return allFields;
}

function mapTicketFieldValue(fieldDef, rawValue) {
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return "";
  }

  const type = fieldDef.type || "";

  if ((type === "tagger" || type === "multiselect") && Array.isArray(fieldDef.custom_field_options)) {
    if (type === "multiselect" && Array.isArray(rawValue)) {
      const labels = rawValue.map((value) => {
        const option = fieldDef.custom_field_options.find((opt) => opt.value === value);
        return option ? option.name : String(value);
      });
      return labels.join(", ");
    }

    const option = fieldDef.custom_field_options.find((opt) => opt.value === rawValue);
    return option ? option.name : String(rawValue);
  }

  if (Array.isArray(rawValue)) {
    return rawValue.join(", ");
  }

  if (typeof rawValue === "object") {
    return JSON.stringify(rawValue);
  }

  return String(rawValue);
}

async function buildTicketContext(ticketId) {
  const baseUrl = getZendeskBaseUrl();

  const ticketJson = await zendeskGet(`${baseUrl}/tickets/${ticketId}.json`);
  const commentsJson = await zendeskGet(`${baseUrl}/tickets/${ticketId}/comments.json?sort=-created_at`);
  const fieldDefs = await fetchTicketFields();

  const ticket = ticketJson.ticket || {};
  const comments = Array.isArray(commentsJson.comments) ? commentsJson.comments : [];

  const customFields = Array.isArray(ticket.custom_fields) ? ticket.custom_fields : [];
  const mappedFields = customFields
    .map((item) => {
      const def = fieldDefs.find((field) => String(field.id) === String(item.id));
      const fieldName = def ? def.title : `Field ${item.id}`;
      const mappedValue = def ? mapTicketFieldValue(def, item.value) : String(item.value || "");

      return {
        id: item.id,
        name: fieldName,
        value: mappedValue
      };
    })
    .filter((item) => item.value);

  const latestComments = comments
    .slice(0, 10)
    .reverse()
    .map((comment, index) => {
      const body = comment.plain_body || comment.body || "";
      const visibility = comment.public ? "public" : "private";
      return `Comment ${index + 1} (${visibility}):\n${body}`;
    })
    .join("\n\n");

  return {
    id: ticket.id || ticketId,
    subject: ticket.subject || "",
    description: ticket.description || "",
    status: ticket.status || "",
    priority: ticket.priority || "",
    type: ticket.type || "",
    tags: Array.isArray(ticket.tags) ? ticket.tags : [],
    customFields: mappedFields,
    commentsText: latestComments
  };
}

function formatTicketContextForPrompt(ticketContext) {
  const fieldsText = ticketContext.customFields.length
    ? ticketContext.customFields.map((field) => `${field.name}: ${field.value}`).join("\n")
    : "No relevant custom fields set.";

  const tagsText = ticketContext.tags.length ? ticketContext.tags.join(", ") : "No tags.";

  return `
Ticket subject:
${ticketContext.subject || ""}

Ticket description:
${ticketContext.description || ""}

Ticket status:
${ticketContext.status || ""}

Ticket priority:
${ticketContext.priority || ""}

Ticket type:
${ticketContext.type || ""}

Ticket tags:
${tagsText}

Custom fields:
${fieldsText}

Recent ticket comments:
${ticketContext.commentsText || "No comments found."}
`;
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/copilot", async (req, res) => {
  try {
    const {
      action,
      targetLanguage = "de",
      text = "",
      ticketId = "",
      requesterName = ""
    } = req.body;

    const languageName = getLanguageName(targetLanguage);
    const greeting = getGreeting(targetLanguage, requesterName);
    const closing = getClosing(targetLanguage);

    let prompt = "";

    if (action === "summarize_ticket") {
      if (!ticketId) {
        return res.status(400).json({
          error: "Missing ticketId",
          details: "ticketId is required for summarize_ticket"
        });
      }

      const fullTicketContext = await buildTicketContext(ticketId);
      const promptContext = formatTicketContextForPrompt(fullTicketContext);

      prompt = `
You are a Zendesk support copilot.

Create a HIGH QUALITY ticket summary in ${languageName}.

STRICT RULES:
Do not write a customer reply.
Do not include greeting.
Do not include closing.
Do not include signature.
Do not invent anything.
Preserve all important details.

GOAL:
The summary must be useful for a support agent and must capture the full ticket context.

FORMAT:

Problem:
- ...

Details:
- include all important names
- include all important emails
- include all important account references
- include all important numbers
- include all important custom field values
- include all important distinctions if multiple entities exist

Context:
- what happened so far
- what is relevant in the ticket history
- mention if information comes from private or public context only if that matters

Customer intent:
- what exactly does the customer want?

IMPORTANT:
Do not oversimplify.
Do not drop information.
If multiple emails, accounts, or persons are mentioned, list all of them clearly.
If custom fields contain useful context, include them.

${promptContext}
`;
    } else if (action === "improve_text") {
      prompt = `
You are a Zendesk support copilot.

Your task is to turn the following draft into a complete customer facing support reply.

Instructions:
1. Detect the language of the original text.
2. Keep the same language.
3. Rewrite the text so it sounds professional, clear, polite and natural.
4. Return a complete reply, not just a corrected sentence fragment.
5. Use exactly the correct standard greeting and closing for the detected language.
6. Do not add any agent name.
7. Do not add any extra signature.
8. Return only the final customer reply.

Customer name:
${requesterName}

Use these exact templates:

German greeting:
${getGreeting("de", requesterName)}

German closing:
${getClosing("de")}

French greeting:
${getGreeting("fr", requesterName)}

French closing:
${getClosing("fr")}

Italian greeting:
${getGreeting("it", requesterName)}

Italian closing:
${getClosing("it")}

English greeting:
${getGreeting("en", requesterName)}

English closing:
${getClosing("en")}

Original text:
${text}
`;
    } else if (action === "translate_text") {
      prompt = `
You are a Zendesk support copilot.

Translate the following text into ${languageName}.
Keep the meaning exactly.

If the text is a customer reply, return a full customer ready reply using:
Greeting:
${greeting}

Closing:
${closing}

If the text is not a customer reply, translate it naturally without inventing extra content.

Return only the final text.

Original text:
${text}
`;
    } else {
      return res.status(400).json({
        error: "Invalid action",
        details: "Unknown action"
      });
    }

    const output = await runPrompt(prompt);

    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Backend error",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
