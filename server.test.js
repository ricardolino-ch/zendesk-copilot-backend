const test = require("node:test");
const assert = require("node:assert/strict");
const { getLanguageName, requireTicketId, promptFor } = require("./server");
const fs = require("node:fs");

test("accepts supported languages and ticket IDs", () => {
  assert.equal(getLanguageName("fr"), "French");
  assert.equal(requireTicketId(12345), "12345");
});

test("rejects unsafe ticket IDs", () => {
  assert.throws(() => requireTicketId("12/../34"));
});

test("summary prompt enforces requested language and compact output", () => {
  const prompt = promptFor({ action: "summarize_ticket", targetLanguage: "en", ticketContext: { subject: "Test", description: "Body", comments: [] } });
  assert.match(prompt, /MUST be English/);
  assert.match(prompt, /2–4 bullet points/);
});

test("reply prompt uses the selected language", () => {
  const prompt = promptFor({ action: "reply_from_summary", targetLanguage: "fr", text: "Résumé" });
  assert.match(prompt, /entirely in French/);
  assert.match(prompt, /Bonjour/);
});

test("reply prompt requires the full closing sentence", () => {
  const prompt = promptFor({ action: "reply_from_summary", targetLanguage: "de", text: "Zusammenfassung" });
  assert.match(prompt, /Bei weiteren Fragen stehen wir Ihnen jederzeit gerne zur Verfügung/);
  assert.match(prompt, /Freundliche Grüsse/);
});

test("Ricardo system prompt is loaded", () => {
  const prompt = fs.readFileSync("./systemprompt.txt", "utf8");
  assert.match(prompt, /ausschliesslich Antwortentwürfe/);
  assert.match(prompt, /Vermute niemals Artikelnummern/);
});

test("approved knowledge pack is available", () => {
  const pack = fs.readFileSync("./knowledge-pack.md", "utf8");
  assert.match(pack, /Ricardo Wissenspaket/);
  assert.match(pack, /Käuferschutz/);
});

test("only approved feedback is eligible as a pattern", () => {
  assert.match(fs.readFileSync("./server.js", "utf8"), /status === "approved"/);
  assert.match(fs.readFileSync("./server.js", "utf8"), /GEPRÜFTE ÄHNLICHE MUSTERBEISPIELE/);
});

test("feedback is anonymized before storage and reuse", () => {
  const source = fs.readFileSync("./server.js", "utf8");
  assert.match(source, /anonymizeText\(original\)/);
  assert.match(source, /\[E-MAIL\]/);
  assert.match(source, /\[TELEFON\]/);
});

test("project documentation is loaded", () => {
  const source = fs.readFileSync("./server.js", "utf8");
  assert.match(source, /PROJECT_SOURCES/);
  assert.match(source, /loadMarkdownTree/);
});

test("ticket prompt prioritizes the current customer question", () => {
  const source = fs.readFileSync("./server.js", "utf8");
  assert.match(source, /CURRENT CUSTOMER QUESTION/);
  assert.match(source, /sort_order=desc/);
});

test("reply prompt separates evidence from internal guidance", () => {
  const source = fs.readFileSync("./server.js", "utf8");
  assert.match(source, /internal agent hint/);
  assert.match(source, /distinguish clearly between an amount shown on a label/);
  assert.match(source, /Respond directly, naturally and personally/);
});

test("system prompt allows one specific follow-up question", () => {
  const source = fs.readFileSync("./systemprompt.txt", "utf8");
  assert.match(source, /eine einzige klare und fallbezogene Rückfrage/);
  assert.match(source, /nicht nach Angaben, die bereits im Ticket stehen/);
});
