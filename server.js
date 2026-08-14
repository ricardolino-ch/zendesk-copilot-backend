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

const requestCounts = new Map();
function requireApiToken(req, res, next) {
  const configured = process.env.COPILOT_API_TOKEN;
  if (!configured || req.get("authorization") !== `Bearer ${configured}`) return res.status(401).json({ error: "Unauthorized" });
  const key = req.ip || "unknown";
  const now = Date.now();
  const current = requestCounts.get(key) || { started: now, count: 0 };
  if (now - current.started > 60000) { current.started = now; current.count = 0; }
  current.count += 1;
  requestCounts.set(key, current);
  if (current.count > 60) return res.status(429).json({ error: "Too many requests" });
  next();
}

const LANGUAGES = { de: "German", fr: "French", it: "Italian", en: "English" };
const SUPPORTED_ACTIONS = new Set([
  "summarize_ticket", "translate_summary", "reply_from_summary", "improve_text", "translate_text"
]);
const SYSTEM_PROMPT = fs.readFileSync(path.join(__dirname, "systemprompt.txt"), "utf8").trim();
const KNOWLEDGE_PACK = fs.readFileSync(path.join(__dirname, "knowledge-pack.md"), "utf8").trim();
function loadMarkdownTree(root) {
  if (!fs.existsSync(root)) return "";
  const files = [];
  const visit = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) visit(full);
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  });
  visit(root);
  return files.sort().map((file) => `\n\n## Quelle: ${path.relative(__dirname, file)}\n${fs.readFileSync(file, "utf8")}`).join("").trim();
}
const PROJECT_SOURCES = `${loadMarkdownTree(path.join(__dirname, "docs"))}\n\n${loadMarkdownTree(path.join(__dirname, "project-sources"))}`.trim();
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

function getFullClosing(code) {
  const sentence = {
    de: "Bei weiteren Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.",
    fr: "Si vous avez d'autres questions, nous restons volontiers à votre disposition.",
    it: "Per qualsiasi ulteriore domanda, restiamo volentieri a Sua disposizione.",
    en: "If you have any further questions, we will be happy to assist you."
  }[code] || "Bei weiteren Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.";
  return `${sentence}\n\n${getClosing(code)}`;
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

function anonymizeText(value) {
  return String(value || "")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[E-MAIL]")
    .replace(/(?:\+?\d[\d\s()./-]{7,}\d)/g, "[TELEFON]")
    .replace(/\b(?:ticket|artikel|order|bestellung|konto|benutzerkonto|mitglied)\s*#?\s*\d{4,}\b/gi, (match) => match.replace(/\d{4,}/, "[NUMMER]"))
    .replace(/\b\d{7,}\b/g, "[NUMMER]")
    .trim();
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
    zendeskGet(`/tickets/${id}/comments.json?sort_order=desc&per_page=100`)
  ]);
  const ticket = ticketJson.ticket || {};
  const comments = Array.isArray(commentsJson.comments) ? commentsJson.comments : [];
  const publicComments = comments.filter((comment) => comment.public !== false);
  const latestPublicComment = publicComments[0] || comments[0] || null;
  return {
    subject: shortenText(ticket.subject, 300),
    description: shortenText(ticket.description, 1800),
    latestCustomerQuestion: latestPublicComment ? shortenText(latestPublicComment.plain_body || latestPublicComment.body, 2500) : "",
    comments: comments.slice(0, 20).reverse().map((comment) => shortenText(comment.plain_body || comment.body, 1500)).filter(Boolean)
  };
}

function ticketPrompt(context) {
  return `Subject:\n${context.subject || "—"}\n\nOriginal description (background only):\n${context.description || "—"}\n\nCURRENT CUSTOMER QUESTION (answer this first):\n${context.latestCustomerQuestion || "No current customer question found."}\n\nConversation comments (background):\n${context.comments.join("\n\n") || "No comments found."}`;
}

function promptFor({ action, targetLanguage, text, agentContext, requesterName, ticketContext }) {
  const language = getLanguageName(targetLanguage);
  const internalContext = agentContext ? `\n\nINTERNER HINWEIS DES AGENTEN (VERBINDLICH ZU BERÜCKSICHTIGEN):\n${agentContext}\n\nDiesen Hinweis niemals wörtlich an das Mitglied ausgeben. Übertrage aber jede wesentliche Information, Anweisung und Empfehlung in eine passende Kundenantwort oder mache die offene Unsicherheit ausdrücklich kenntlich. Wenn der Hinweis sagt, dass Informationen bereits im Benutzerkonto vorhanden sind, frage nicht nochmals danach, sondern erkläre den direkten Navigationsweg. Enthält der Hinweis eine passende URL, verwende diese URL in der Antwort. Bei Gebühren- oder Rechnungsfragen ist die Gebührenübersicht mit offenem Saldo und Zahlungsdetails massgebend.` : "";
  const templates = `German greeting: ${getGreeting("de", requesterName)}\nGerman closing: ${getFullClosing("de")}\nFrench greeting: ${getGreeting("fr", requesterName)}\nFrench closing: ${getFullClosing("fr")}\nItalian greeting: ${getGreeting("it", requesterName)}\nItalian closing: ${getFullClosing("it")}\nEnglish greeting: ${getGreeting("en", requesterName)}\nEnglish closing: ${getFullClosing("en")}`;
  const accountNavigationRule = `\n\nACCOUNT AND FEE STANDARD:\n- If the internal hint says the information is already in the member account, do not ask the member to provide it again. Tell them where to find it.\n- If the hint includes a relevant URL, preserve and use that URL.\n- For fee or invoice questions, direct the member to the fee overview and open balance in the account. Do not ask for an invoice date or amount when the account already contains the information.`;
  if (action === "summarize_ticket") return `You are a Ricardo Zendesk support assistant. Create a concise internal summary in ${language}. The output language MUST be ${language}; translate extracted facts where needed. Return only 2–4 bullet points, each one sentence at most. Include the issue, essential data and the customer’s request. No greeting, closing, heading or invented information.\n\nTicket:\n${ticketPrompt(ticketContext)}${internalContext}`;
  if (action === "translate_summary") return `Translate this internal summary into ${language}. Preserve its bullet structure and meaning. Do not expand it or turn it into a customer response. Return only the translation.\n\nText:\n${text}`;
  if (action === "reply_from_summary") { const source = `${ticketContext ? ticketPrompt(ticketContext) : "No ticket context loaded."}${text ? `\n\nEXISTING DRAFT (optional reference only; regenerate it and do not follow it if it conflicts with the current ticket or internal hint):\n${text}` : ""}`; return `You are a Ricardo support agent writing a natural, personal customer reply in ${language}. First answer the CURRENT CUSTOMER QUESTION.\n\nWORK ORDER (mandatory):\n1. Read the internal agent hint first and extract every material fact, instruction and recommendation.\n2. Read the current ticket and knowledge base to verify and apply it.\n3. Do not silently omit any material point from the hint. Reflect it in the customer reply, explain it conditionally, or ask one specific question if it cannot yet be confirmed.\n4. Regenerate the answer from the current ticket. The existing draft is only an optional reference and must never override the current ticket or hint.\n\n${internalContext}\n\nINTERNAL AGENT HINT RULES:\n- A stated date, deadline, prior contact, automatic message, or case outcome may be used as a verified case fact.\n- A recommendation in the hint is an intended next step and must be addressed in the reply unless it conflicts with a confirmed ticket fact or approved rule.\n- Never copy the hint literally, mention it, or reveal internal reasoning. Convert it into a natural customer-facing explanation.\n- If it conflicts with the ticket or knowledge base, do not guess. State only the supported part and ask one specific follow-up question if needed.\n\nSTRICT EVIDENCE RULES:\n- Never invent details absent from both the ticket and the internal hint.\n- Never add article IDs, sale IDs, amounts, payment status, refund decisions or account consequences unsupported by the ticket, the internal hint, or a clearly applicable approved rule.\n- Do not use a general knowledge-base rule to override a specific verified case fact in the internal hint.\n- Never expose internal reasoning or knowledge-source wording.\n- Respond directly, naturally and personally, with appropriate empathy.\n- If a refund is discussed, distinguish clearly between an amount shown on a label, an amount actually charged, and an amount eligible for refund.\n\nThe reply MUST be entirely in ${language}; do not default to German. Use only supported facts, and do not invent names, amounts, decisions or promises. If the requested action is not possible, explain why in plain language and state the correct next step. Use exactly this greeting:\n${getGreeting(targetLanguage, requesterName)}\n\nUse exactly this closing, including the sentence before the sign-off:\n${getFullClosing(targetLanguage)}\n\nCURRENT TICKET SOURCE:\n${source}`; }
  if (action === "improve_text") return `Turn this draft into a complete, professional, friendly Ricardo customer reply. Detect and retain the original language. Do not invent facts, agent names or signatures. Return only the final reply. Use the applicable exact greeting and closing below.\n\nCustomer name: ${requesterName || ""}\n${templates}\n\nOriginal text:\n${text}`;
  return `Translate this text into ${language}. Preserve its meaning precisely. If it is a customer reply, return a complete customer-ready reply using the appropriate exact greeting and closing below. Otherwise translate naturally without adding content. Return only the final text.\n\nCustomer name: ${requesterName || ""}\n${templates}\n\nOriginal text:\n${text}`;
}

function approvedExamplesFor(query) {
  if (!fs.existsSync(FEEDBACK_FILE)) return "";
  const queryWords = new Set(String(query || "").toLowerCase().match(/[a-zäöüàéèê0-9]{4,}/g) || []);
  const rows = fs.readFileSync(FEEDBACK_FILE, "utf8").split("\n").filter(Boolean).map((line) => {
    try { return JSON.parse(line); } catch (_) { return null; }
  }).filter((row) => row && row.status === "approved");
  const ranked = rows.map((row) => {
    const words = String(row.original || "").toLowerCase().match(/[a-zäöüàéèê0-9]{4,}/g) || [];
    const score = words.reduce((sum, word) => sum + (queryWords.has(word) ? 1 : 0), 0);
    return { row, score };
  }).sort((a, b) => b.score - a.score).slice(0, 3).filter((item) => item.score > 0);
  if (!ranked.length) return "";
  return ranked.map(({ row }, index) => `Geprüftes Muster ${index + 1}:\n${anonymizeText(row.corrected)}`).join("\n\n");
}

async function runPrompt(prompt, query) {
  const examples = approvedExamplesFor(query);
  const examplesBlock = examples ? `\n\nGEPRÜFTE ÄHNLICHE MUSTERBEISPIELE:\n${examples}\n\nNutze diese Beispiele nur als Stil- und Lösungsreferenz. Übertrage keine Fakten, Namen, Nummern oder Fristen aus einem Beispiel in das aktuelle Ticket.` : "";
  const response = await getOpenAIClient().responses.create({
    model: "gpt-5.6-luna",
    input: `${SYSTEM_PROMPT}\n\nVERBINDLICHE FREIGEGEBENE WISSENSBASIS:\n${KNOWLEDGE_PACK}\n\nZUSÄTZLICHE PROJEKTQUELLEN UND DOKUMENTATION:\n${PROJECT_SOURCES}${examplesBlock}\n\nZusätzliche verbindliche Vorgabe: Schreibe die konkrete Aufgabe vollständig in der vom Auftrag verlangten Zielsprache. Verwende Quellen nur, wenn sie zum Ticket passen. Bei Widerspruch oder fehlender Grundlage keine Regel erfinden.\n\nAUFGABE:\n${prompt}`
  });
  return String(response.output_text || "").trim();
}

app.get("/health", (req, res) => res.json({ ok: true, version: "2.0.0" }));

app.post("/feedback", requireApiToken, (req, res) => {
  try {
    const { action, language, original, corrected, ticketId = "" } = req.body || {};
    if (!String(original || "").trim() || !String(corrected || "").trim()) return res.status(400).json({ error: "Original and corrected text are required" });
    if (String(original).length > 20000 || String(corrected).length > 20000) return res.status(400).json({ error: "Feedback is too long" });
    fs.mkdirSync(FEEDBACK_DIR, { recursive: true });
    fs.appendFileSync(FEEDBACK_FILE, `${JSON.stringify({ status: "pending", createdAt: new Date().toISOString(), action: String(action || "unknown"), language: String(language || "de"), ticketId: "", original: anonymizeText(original), corrected: anonymizeText(corrected) })}\n`, "utf8");
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

app.post("/copilot", requireApiToken, async (req, res) => {
  try {
    const { action, targetLanguage = "de", text = "", agentContext = "", ticketId = "", requesterName = "" } = req.body || {};
    if (!SUPPORTED_ACTIONS.has(action)) return res.status(400).json({ error: "Invalid action" });
    if (!LANGUAGES[targetLanguage]) return res.status(400).json({ error: "Invalid target language" });
    if (action !== "summarize_ticket" && action !== "reply_from_summary" && !String(text).trim()) return res.status(400).json({ error: "Text is required for this action" });
    const ticketContext = (action === "summarize_ticket" || action === "reply_from_summary") ? await buildTicketContext(ticketId) : null;
    const query = `${text} ${agentContext} ${ticketContext ? ticketPrompt(ticketContext) : ""}`;
    const output = await runPrompt(promptFor({ action, targetLanguage, text: shortenText(text, 12000), agentContext: shortenText(agentContext, 6000), requesterName: shortenText(requesterName, 120), ticketContext }), query);
    if (!output) throw new Error("The AI service returned no text.");
    res.json({ output });
  } catch (error) {
    console.error("Copilot error:", error.message);
    res.status(error.status || 500).json({ error: error.status ? error.message : "The request could not be completed. Please try again." });
  }
});

if (require.main === module) app.listen(port, () => console.log(`Ricardo Copilot 2.0 listening on ${port}`));

module.exports = { app, getLanguageName, requireTicketId, promptFor };
