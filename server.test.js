const test = require("node:test");
const assert = require("node:assert/strict");
const { getLanguageName, requireTicketId, promptFor } = require("./server");

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
