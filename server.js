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

let macroCache = {
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

async function fetchAllZendeskMacros() {
  const subdomain = process.env.ZENDESK_SUBDOMAIN;

  if (!subdomain) {
    throw new Error("ZENDESK_SUBDOMAIN fehlt");
  }

  if (Date.now() < macroCache.expiresAt && Array.isArray(macroCache.data) && macroCache.data.length) {
    return macroCache.data;
  }

  const headers = {
    "Authorization": getZendeskAuthHeader(),
    "Content-Type": "application/json"
  };

  let url = `https://${subdomain}.zendesk.com/api/v2/macros.json?active=true`;
  let allMacros = [];
  let pageCount = 0;
  const maxPages = 100;

  while (url && pageCount < maxPages) {
    const response = await fetch(url, {
      method: "GET",
      headers
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Zendesk macros request failed: ${response.status} ${text}`);
    }

    const json = await response.json();
    const macros = Array.isArray(json.macros) ? json.macros : [];
    allMacros = allMacros.concat(macros);

    url = json.next_page || null;
    pageCount += 1;
  }

  const normalized = allMacros.map((macro) => {
    const actions = Array.isArray(macro.actions) ? macro.actions : [];

    const commentHtmlAction = actions.find((a) => a.field === "comment_value_html");
    const commentTextAction = actions.find((a) => a.field === "comment_value");
    const publicAction = actions.find((a) => a.field === "comment_mode_is_public");

    let preview = "";

    if (commentHtmlAction && typeof commentHtmlAction.value === "string") {
      preview = commentHtmlAction.value
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<[^>]+>/g, "")
        .trim();
    } else if (commentTextAction) {
      if (typeof commentTextAction.value === "string") {
        preview = commentTextAction.value.trim();
      } else if (Array.isArray(commentTextAction.value)) {
        preview = String(commentTextAction.value[1] || "").trim();
      }
    }

    return {
      id: macro.id,
      title: macro.title || "",
      active: macro.active !== false,
      restriction: macro.restriction || null,
      commentIsPublic: publicAction ? Boolean(publicAction.value) : true,
      preview,
      actionsCount: actions.length
    };
  });

  macroCache = {
    expiresAt: Date.now() + 10 * 60 * 1000,
    data: normalized
  };

  return normalized;
}

async function suggestMacrosForTicket({ ticketSubject = "", latestComment = "" }) {
  const macros = await fetchAllZendeskMacros();

  const candidates = macros
    .filter((m) => m.active)
    .filter((m) => m.preview && m.preview.trim())
    .slice(0, 500);

  if (!candidates.length) {
    return [];
  }

  const compactList = candidates.map((m) => ({
    id: m.id,
    title: m.title,
    preview: m.preview.slice(0, 1200),
    commentIsPublic: m.commentIsPublic
  }));

  const prompt = `
You are a Zendesk macro copilot.

Task:
Select the 3 macros that best match the ticket.

Rules:
1. Use only the macros provided below.
2. Do not invent macro ids.
3. Prefer macros whose comment preview clearly matches the ticket issue.
4. Return valid JSON only.
5. Use this exact shape:
{
  "suggestions": [
    {
      "id": 123,
      "reason": "short reason"
    }
  ]
}

Ticket subject:
${ticketSubject}

Latest customer comment:
${latestComment}

Available macros:
${JSON.stringify(compactList)}
`;

  const response = await client.responses.create({
    model: "gpt-5.4",
    input: prompt
  });

  const raw = response.output_text || "{}";

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error("Macro ranking konnte nicht als JSON gelesen werden");
  }

  const picked = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];

  const merged = picked
    .map((item) => {
      const macro = candidates.find((m) => String(m.id) === String(item.id));
      if (!macro) return null;

      return {
        id: macro.id,
        title: macro.title,
        preview: macro.preview,
        reason: item.reason || "Passend zum Ticketinhalt"
      };
    })
    .filter(Boolean)
    .slice(0, 3);

  return merged;
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
      ticketSubject = "",
      requesterName = "",
      latestComment = ""
    } = req.body;

    const greeting = getGreeting(targetLanguage, requesterName);
    const closing = getClosing(targetLanguage);
    const languageName = getLanguageName(targetLanguage);

    let prompt = "";

    if (action === "suggest_macros") {
      const suggestions = await suggestMacrosForTicket({
        ticketSubject,
        latestComment
      });

      return res.json({ suggestions });
    }

    if (action === "summarize_ticket") {
      prompt = `
You are a Zendesk support copilot.

Create a concise summary in German.
Use short bullet points only.
Do not include any greeting.
Do not include any closing.
Do not invent facts.
Focus on:
1. Customer issue
2. Relevant details
3. What the customer wants

Ticket subject:
${ticketSubject}

Latest customer comment:
${latestComment}
`;
    } else if (action === "suggest_reply") {
      prompt = `
You are a Zendesk support copilot.

Write a professional support reply in ${languageName}.

Use exactly this greeting at the beginning:
${greeting}

Use exactly this closing at the end:
${closing}

Rules:
1. No agent name
2. No extra signature
3. Concise, polite, helpful
4. Do not invent facts
5. If information is missing, phrase carefully
6. Return only the final reply

Ticket subject:
${ticketSubject}

Customer name:
${requesterName}

Latest customer comment:
${latestComment}
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
Return a full customer ready reply.

Use exactly this greeting at the beginning:
${greeting}

Use exactly this closing at the end:
${closing}

Rules:
1. Preserve meaning
2. Sound natural and professional
3. No agent name
4. No extra signature
5. Return only the final reply

Customer name:
${requesterName}

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
  console.log(`Server listening on port ${port}`);
});
