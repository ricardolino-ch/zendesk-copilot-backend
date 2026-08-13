(function () {
  const client = ZAFClient.init();
  const API_URL = "https://zendesk-copilot-backend-3gv4.onrender.com/copilot";
  const API_TOKEN = "d479b48256587650f1c553f923af1a81186b61dcd546c37ee76d57b3563f784d";
  const text = document.getElementById("text");
  const agentContext = document.getElementById("agent-context");
  const language = document.getElementById("language");
  const status = document.getElementById("status");
  const controls = Array.from(document.querySelectorAll("button[data-action], #insert, #save-feedback"));
  let context = null;
  let lastGeneratedText = "";

  function setContext(value) {
    context = value;
    document.getElementById("ticket-label").textContent = `Ticket #${value.ticketId}${value.subject ? ` · ${value.subject}` : ""}`;
  }
  client.on("copilot.context", setContext);
  try {
    const query = new URLSearchParams(window.location.search).get("context");
    if (query) setContext(JSON.parse(query));
  } catch (error) {
    setStatus("Ticket-Kontext konnte nicht geladen werden.", true);
  }
  client.get(["ticket.id", "ticket.subject", "ticket.requester.name"]).then((data) => {
    if (!context && data["ticket.id"]) setContext({ ticketId: String(data["ticket.id"]), subject: data["ticket.subject"] || "", requesterName: data["ticket.requester.name"] || "" });
  });

  function setBusy(message) { controls.forEach((button) => { button.disabled = true; }); status.className = "status loading"; status.textContent = message; }
  function setStatus(message, isError) { controls.forEach((button) => { button.disabled = false; }); status.className = `status${isError ? " error" : ""}`; status.textContent = message; }
  async function call(action) {
    if (!context) throw new Error("Ticket-Kontext wird noch geladen. Bitte kurz warten.");
    if (action !== "summarize_ticket" && action !== "reply_from_summary" && !text.value.trim() && !agentContext.value.trim()) throw new Error("Bitte einen internen Hinweis oder einen Text eingeben.");
    const response = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_TOKEN}` }, body: JSON.stringify({ action, targetLanguage: language.value, text: text.value, agentContext: agentContext.value, ticketId: context.ticketId, requesterName: context.requesterName }) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Der Copilot ist momentan nicht erreichbar.");
    return data.output;
  }
  document.querySelectorAll("button[data-action]").forEach((button) => button.addEventListener("click", async () => {
    const action = button.dataset.action;
    const labels = { summarize_ticket: "Zusammenfassung wird erstellt …", reply_from_summary: "Antwort wird erstellt …", translate_summary: "Zusammenfassung wird übersetzt …", improve_text: "Text wird verbessert …", translate_text: "Text wird übersetzt …" };
    setBusy(labels[action]);
    try { text.value = await call(action); lastGeneratedText = text.value; setStatus("Fertig."); } catch (error) { setStatus(error.message, true); }
  }));
  document.getElementById("insert").addEventListener("click", async () => {
    try {
      if (!context || !text.value.trim()) throw new Error("Es gibt keinen Text zum Einfügen.");
      setBusy("Ticket-Zuordnung wird geprüft …");
      const instances = (await client.get("instances")).instances || {};
      const editors = Object.keys(instances).filter((guid) => instances[guid].location === "ticket_editor");
      for (const guid of editors) {
        const editor = client.instance(guid);
        const data = await editor.get("ticket.id");
        if (String(data["ticket.id"] || "") === String(context.ticketId)) {
          editor.trigger("copilot.insert", { ticketId: context.ticketId, text: text.value });
          setStatus("Antwort wird in das zugehörige Ticket eingefügt.");
          return;
        }
      }
      throw new Error("Sicherheitsprüfung fehlgeschlagen: Der passende Ticket-Editor wurde nicht gefunden. Es wurde nichts eingefügt.");
    } catch (error) { setStatus(error.message, true); }
  });
  document.getElementById("save-feedback").addEventListener("click", async () => {
    try {
      if (!context || !lastGeneratedText || !text.value.trim()) throw new Error("Bitte zuerst einen Entwurf erzeugen und korrigieren.");
      setBusy("Korrektur wird zur Prüfung gespeichert …");
      const response = await fetch(API_URL.replace(/\/copilot$/, "/feedback"), { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_TOKEN}` }, body: JSON.stringify({ action: "copilot_edit", language: language.value, original: lastGeneratedText, corrected: text.value, ticketId: context.ticketId }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Korrektur konnte nicht gespeichert werden.");
      setStatus("Korrektur gespeichert und zur Prüfung vorgemerkt.");
    } catch (error) { setStatus(error.message, true); }
  });
  async function closeCopilot() {
    try {
      await client.invoke("instances.close");
    } catch (error) {
      // Keep the close control reliable even if Zendesk reports a late instance event.
      window.parent.postMessage({ type: "zendesk-copilot-close" }, "*");
    }
  }
  document.getElementById("close").addEventListener("click", closeCopilot);
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeCopilot(); });
}());
