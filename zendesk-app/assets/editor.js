(function () {
  const client = ZAFClient.init();
  const button = document.getElementById("open-copilot");
  client.invoke("resize", { width: "190px", height: "46px" }).catch(() => {});

  async function ticketContext() {
    const data = await client.get(["ticket.id", "ticket.subject", "ticket.requester.name"]);
    if (!data["ticket.id"]) throw new Error("Dieses Ticket muss zuerst gespeichert werden.");
    return { ticketId: String(data["ticket.id"]), subject: data["ticket.subject"] || "", requesterName: data["ticket.requester.name"] || "" };
  }

  button.addEventListener("click", async () => {
    try {
      const context = await ticketContext();
      const encoded = encodeURIComponent(JSON.stringify(context));
      await client.invoke("instances.create", {
        location: "modal",
        url: `assets/modal.html?context=${encoded}`,
        size: { width: "960px", height: "760px" }
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
      await client.invoke("ticket.editor.insert", textToHtml(payload.text));
      client.invoke("notify", "Antwort wurde in dieses Ticket eingefügt.", "notice");
    } catch (error) {
      client.invoke("notify", error.message || "Die Antwort konnte nicht eingefügt werden.", "error");
    }
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>\"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
  }
  function textToHtml(value) {
    return String(value || "").trim().split(/\n\s*\n/).filter(Boolean).map((block) => {
      const lines = block.split(/\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length && lines.every((line) => /^[-•*]\s+/.test(line))) return `<ul>${lines.map((line) => `<li>${escapeHtml(line.replace(/^[-•*]\s+/, ""))}</li>`).join("")}</ul>`;
      return `<p>${lines.map(escapeHtml).join("<br>")}</p>`;
    }).join("");
  }
}());
