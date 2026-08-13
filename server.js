require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
let openAIClient;

function getOpenAIClient() {
  if (!openAIClient) openAIClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openAIClient;
}

app.use(cors());
app.use(express.json({ limit: "100kb" }));

const LANGUAGES = { de: "German", fr: "French", it: "Italian", en: "English" };
const SUPPORTED_ACTIONS = new Set([
  "summarize_ticket", "translate_summary", "reply_from_summary", "improve_text", "translate_text"
]);
const SYSTEM_PROMPT = fs.readFileSync(path.join(__dirname, "systemprompt.txt"), "utf8").trim();
const KNOWLEDGE_PACK = fs.readFileSync(path.join(__dirname, "knowledge-pack.md"), "utf8").trim();
const FEEDBACK_DIR = path.join(__dirname, "feedback");
const FEEDBACK_FILE = path.join(FEEDBACK_DIR, "pending.jsonl");

function getLanguageName(code) {
  return LANGUAGES[code] || LANGUAGES.de;
}

function getGreeting(code, requesterName) {
  const name = String(requesterName || "{{ticket.requester.name}}").trim();
  return {
    de: `Grüezi ${name}\n\nVielen Dank für Ihre Anfrage.`,
    fr: `Bonjour ${name}\n\nMerci beaucoup pour votre demande.`,
    it: `Gentile ${name}\n\nLa ringraziamo per la Sua richiesta.`,
    en: `Hello ${name}\n\nThank you for your inquiry.`
  }[code] || getGreeting("de", name);
}

function getClosing(code) {
  return { de: "Freundliche Grüsse", fr: "Meilleures salutations", it: "Cordiali saluti", en: "Kind regards" }[code] || "Freundliche Grüsse";
}

function requireTicketId(ticketId) {
  // Zendesk ticket IDs are positive integers. Rejecting anything else avoids accidental API calls.
  if (!/^\d+$/.test(String(ticketId || ""))) {
    const error = new Error("A valid ticketId is required for this action.");
    error.status = 400;
    throw error;
  }
  return String(ticketId);
}

function shortenText(text, maxLength) {
  const value = String(text || "").trim();
  return value.length > maxLength ? `${value.slice(0, maxLength)} …` : value;
}

function getZendeskConfig() {
  const { ZENDESK_EMAIL: email, ZENDESK_API_TOKEN: token, ZENDESK_SUBDOMAIN: subdomain } = process.env;
  if (!email || !token || !subdomain) throw new Error("Zendesk configuration is incomplete.");
  return { email, token, subdomain };
}

async function zendeskGet(path) {
  const { email, token, subdomain } = getZendeskConfig();
  const response = await fetch(`https://${subdomain}.zendesk.com/api/v2${path}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${email}/token:${token}`).toString("base64")}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) throw new Error(`Zendesk request failed (${response.status}).`);
  return response.json();
}

async function buildTicketContext(ticketId) {
  const id = requireTicketId(ticketId);
  const [ticketJson, commentsJson] = await Promise.all([
    zendeskGet(`/tickets/${id}.json`),
    zendeskGet(`/tickets/${id}/comments.json?sort=-created_at`)
  ]);
  const ticket = ticketJson.ticket || {};
  const comments = Array.isArray(commentsJson.comments) ? commentsJson.comments : [];
  return {
    subject: shortenText(ticket.subject, 300),
    description: shortenText(ticket.description, 1800),
    comments: comments.slice(0, 3).reverse().map((comment) => shortenText(comment.plain_body || comment.body, 1200)).filter(Boolean)
  };
}

function ticketPrompt(context) {
  return `Subject:\n${context.subject || "—"}\n\nDescription:\n${context.description || "—"}\n\nLatest comments:\n${context.comments.join("\n\n") || "No comments found."}`;
}

function promptFor({ action, targetLanguage, text, requesterName, ticketContext }) {
  const language = getLanguageName(targetLanguage);
  const templates = `German greeting: ${getGreeting("de", requesterName)}\nGerman closing: ${getClosing("de")}\nFrench greeting: ${getGreeting("fr", requesterName)}\nFrench closing: ${getClosing("fr")}\nItalian greeting: ${getGreeting("it", requesterName)}\nItalian closing: ${getClosing("it")}\nEnglish greeting: ${getGreeting("en", requesterName)}\nEnglish closing: ${getClosing("en")}`;
  if (action === "summarize_ticket") return `You are a Ricardo Zendesk support assistant. Create a concise internal summary in ${language}. The output language MUST be ${language}; translate extracted facts where needed. Return only 2–4 bullet points, each one sentence at most. Include the issue, essential data (such as account, item or contact details) and the customer’s request. No greeting, closing, heading or invented information.\n\nTicket:\n${ticketPrompt(ticketContext)}`;
  if (action === "translate_summary") return `Translate this internal summary into ${language}. Preserve its bullet structure and meaning. Do not expand it or turn it into a customer response. Return only the translation.\n\nText:\n${text}`;
  if (action === "reply_from_summary") return `You are a Ricardo support agent. Write a short, clear, friendly customer reply in ${language} from the provided ticket context or internal summary. The reply MUST be entirely in ${language}; do not default to German. Answer the customer's actual questions, do not expose internal wording and do not invent facts. Use exactly this greeting:\n${getGreeting(targetLanguage, requesterName)}\n\nUse exactly this closing:\n${getClosing(targetLanguage)}\n\nSource:\n${text || ticketPrompt(ticketContext)}`;
  if (action === "improve_text") return `Turn this draft into a complete, professional, friendly Ricardo customer reply. Detect and retain the original language. Do not invent facts, agent names or signatures. Return only the final reply. Use the applicable exact greeting and closing below.\n\nCustomer name: ${requesterName || ""}\n${templates}\n\nOriginal text:\n${text}`;
  return `Translate this text into ${language}. Preserve its meaning precisely. If it is a customer reply, return a complete customer-ready reply using the appropriate exact greeting and closing below. Otherwise translate naturally without adding content. Return only the final text.\n\nCustomer name: ${requesterName || ""}\n${templates}\n\nOriginal text:\n${text}`;
}

async function runPrompt(prompt) {
  const response = await getOpenAIClient().responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.4",
    input: `${SYSTEM_PROMPT}\n\nVERBINDLICHE FREIGEGEBENE WISSENSBASIS:\n${KNOWLEDGE_PACK}\n\nZusätzliche verbindliche Vorgabe: Schreibe die konkrete Aufgabe vollständig in der vom Auftrag verlangten Zielsprache. Verwende die Wissensbasis nur, wenn sie zum Ticket passt. Bei Widerspruch oder fehlender Grundlage keine Regel erfinden.\n\nAUFGABE:\n${prompt}`
  });
  return String(response.output_text || "").trim();
}

app.get("/health", (req, res) => res.json({ ok: true, version: "2.0.0" }));

app.post("/feedback", (req, res) => {
  try {
    const { action, language, original, corrected, ticketId = "" } = req.body || {};
    if (!String(original || "").trim() || !String(corrected || "").trim()) return res.status(400).json({ error: "Original and corrected text are required" });
    if (String(original).length > 20000 || String(corrected).length > 20000) return res.status(400).json({ error: "Feedback is too long" });
    fs.mkdirSync(FEEDBACK_DIR, { recursive: true });
    fs.appendFileSync(FEEDBACK_FILE, `${JSON.stringify({ status: "pending", createdAt: new Date().toISOString(), action: String(action || "unknown"), language: String(language || "de"), ticketId: /^\\d+$/.test(String(ticketId)) ? String(ticketId) : "", original: String(original), corrected: String(corrected) })}\n`, "utf8");
    res.status(202).json({ ok: true, status: "pending" });
  } catch (error) { res.status(500).json({ error: "Feedback could not be saved" }); }
});

function feedbackAuthorized(req) {
  const token = process.env.FEEDBACK_REVIEW_TOKEN;
  return token && req.get("authorization") === `Bearer ${token}`;
}

app.get("/feedback/review", (req, res) => res.sendFile(path.join(__dirname, "feedback", "review.html")));

app.get("/feedback/pending", (req, res) => {
  if (!feedbackAuthorized(req)) return res.status(401).json({ error: "Review authorization required" });
  if (!fs.existsSync(FEEDBACK_FILE)) return res.json({ items: [] });
  const items = fs.readFileSync(FEEDBACK_FILE, "utf8").split("\n").filter(Boolean).map((line, index) => ({ index, ...JSON.parse(line) })).filter((item) => item.status === "pending");
  res.json({ items });
});

app.post("/feedback/review", (req, res) => {
  if (!feedbackAuthorized(req)) return res.status(401).json({ error: "Review authorization required" });
  const index = Number(req.body && req.body.index);
  const status = req.body && req.body.status;
  if (!Number.isInteger(index) || !["approved", "rejected"].includes(status) || !fs.existsSync(FEEDBACK_FILE)) return res.status(400).json({ error: "Invalid review request" });
  const lines = fs.readFileSync(FEEDBACK_FILE, "utf8").split("\n").filter(Boolean);
  if (!lines[index]) return res.status(404).json({ error: "Feedback not found" });
  const item = JSON.parse(lines[index]);
  item.status = status;
  item.reviewedAt = new Date().toISOString();
  lines[index] = JSON.stringify(item);
  fs.writeFileSync(FEEDBACK_FILE, `${lines.join("\n")}\n`, "utf8");
  res.json({ ok: true, status });
});

app.post("/copilot", async (req, res) => {
  try {
    const { action, targetLanguage = "de", text = "", ticketId = "", requesterName = "" } = req.body || {};
    if (!SUPPORTED_ACTIONS.has(action)) return res.status(400).json({ error: "Invalid action" });
    if (!LANGUAGES[targetLanguage]) return res.status(400).json({ error: "Invalid target language" });
    if (action !== "summarize_ticket" && action !== "reply_from_summary" && !String(text).trim()) return res.status(400).json({ error: "Text is required for this action" });
    const ticketContext = (action === "summarize_ticket" || (action === "reply_from_summary" && !String(text).trim())) ? await buildTicketContext(ticketId) : null;
    const output = await runPrompt(promptFor({ action, targetLanguage, text: shortenText(text, 12000), requesterName: shortenText(requesterName, 120), ticketContext }));
    if (!output) throw new Error("The AI service returned no text.");
    res.json({ output });
  } catch (error) {
    console.error("Copilot error:", error.message);
    res.status(error.status || 500).json({ error: error.status ? error.message : "The request could not be completed. Please try again." });
  }
});

if (require.main === module) app.listen(port, () => console.log(`Ricardo Copilot 2.0 listening on ${port}`));

module.exports = { app, getLanguageName, requireTicketId, promptFor };
