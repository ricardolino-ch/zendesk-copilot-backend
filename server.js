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

  return `Grüezi ${safeName}

Vielen Dank für Ihre Anfrage.`;
}

function getClosing() {
  return "Freundliche Grüsse";
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

  const raw = `${email}/token:${token}`;
  return `Basic ${Buffer.from(raw).toString("base64")}`;
}

function getZendeskBaseUrl() {
  return `https://${process.env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2`;
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
    throw new Error("Zendesk API Fehler");
  }

  return response.json();
}

async function buildTicketContext(ticketId) {
  const baseUrl = getZendeskBaseUrl();

  const [ticketJson, commentsJson] = await Promise.all([
    zendeskGet(`${baseUrl}/tickets/${ticketId}.json`),
    zendeskGet(`${baseUrl}/tickets/${ticketId}/comments.json?sort=-created_at`)
  ]);

  const ticket = ticketJson.ticket || {};
  const comments = (commentsJson.comments || []).slice(0, 3);

  const commentText = comments
    .reverse()
    .map(c => c.plain_body || "")
    .join("\n\n");

  return `
Betreff:
${ticket.subject || ""}

Beschreibung:
${ticket.description || ""}

Kommentare:
${commentText}
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

    let prompt = "";

    if (action === "summarize_ticket") {

      const context = await buildTicketContext(ticketId);

      prompt = `
You are a Zendesk support assistant.

Create a SHORT and PRECISE summary in ${languageName}.

Rules:
- ONLY bullet points
- max 4 bullet points
- each bullet max 1 sentence
- no intro text
- no conclusion
- no explanation
- no "Zusammenfassung:" label
- focus only on important facts

Focus on:
- problem
- key data (emails, accounts, phone)
- what the user wants

Use Ricardo wording:
Benutzerkonto, Benutzername, Gebühren, Artikelnummer

Ticket:
${context}
`;
    }

    else if (action === "translate_summary") {
      prompt = `
Translate the following text into ${languageName}.
Keep bullet structure.
Do not expand.

Text:
${text}
`;
    }

    else if (action === "reply_from_summary") {
      prompt = `
You are a Ricardo support agent.

Write a clean customer reply in German.

Rules:
- friendly
- short
- clear
- no internal wording
- no over-explaining

${getGreeting("de", requesterName)}

<Antwort>

${getClosing()}

Summary:
${text}
`;
    }

    else if (action === "improve_text") {
      prompt = `
Improve the following text into a professional support reply.
Keep language.
Return final version only.

Text:
${text}
`;
    }

    else if (action === "translate_text") {
      prompt = `
Translate the following text into ${languageName}.
Return clean text only.

Text:
${text}
`;
    }

    const output = await runPrompt(prompt);

    res.json({ output });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Backend error"
    });
  }
});

app.listen(port, () => {
  console.log("Server running");
});
