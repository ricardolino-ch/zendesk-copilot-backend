(function () {
  const client = ZAFClient.init();
  const button = document.getElementById("open-copilot");

  async function ticketContext() {
    const data = await client.get(["ticket.id", "ticket.subject", "ticket.requester.name"]);
    if (!data["ticket.id"]) throw new Error("Dieses Ticket muss zuerst gespeichert werden.");
    return { ticketId: String(data["ticket.id"]), subject: data["ticket.subject"] || "", requesterName: data["ticket.requester.name"] || "" };
  }

  button.addEventListener("click", async () => {
    try {
      const context = await ticketContext();
      client.instance("modal", { url: "assets/modal.html", size: { width: "960px", height: "760px" } }).then((modalClient) => {
        modalClient.trigger("copilot.context", context);
      });
    } catch (error) {
      client.invoke("notify", error.message, "error");
    }
  });

  // A modal can only request insertion through this editor instance. The ticket ID is
  // checked again immediately before Zendesk receives any text.
  client.on("copilot.insert", async (payload) => {
    try {
      const current = await ticketContext();
      if (!payload || String(payload.ticketId) !== current.ticketId) {
        throw new Error("Sicherheitsprüfung fehlgeschlagen: Die Antwort gehört nicht zu diesem Ticket.");
      }
      await client.invoke("ticket.editor.insert", payload.text);
      client.invoke("notify", "Antwort wurde in dieses Ticket eingefügt.", "notice");
    } catch (error) {
      client.invoke("notify", error.message || "Die Antwort konnte nicht eingefügt werden.", "error");
    }
  });
}());
