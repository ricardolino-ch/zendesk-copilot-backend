(function () {
  const client = ZAFClient.init();
  const button = document.getElementById("open-copilot");
  let launcherCollapsed = false;
  client.invoke("resize", { width: "190px", height: "46px" }).catch(() => {});

  // Restore the launcher after the modal closes so it can be opened again.
  setInterval(async () => {
    if (!launcherCollapsed) return;
    try {
      const data = await client.get("instances");
      const hasModal = Object.values(data.instances || {}).some((instance) => instance.location === "modal");
      if (!hasModal) {
        launcherCollapsed = false;
        document.body.style.display = "block";
        button.style.visibility = "visible";
        button.style.pointerEvents = "auto";
        await client.invoke("resize", { width: "190px", height: "46px" });
      }
    } catch (error) { /* Zendesk may briefly reject instance queries during teardown. */ }
  }, 700);

  async function ticketContext() {
    const data = await client.get(["ticket.id", "ticket.subject", "ticket.requester.name"]);
    if (!data["ticket.id"]) throw new Error("Dieses Ticket muss zuerst gespeichert werden.");
    return { ticketId: String(data["ticket.id"]), subject: data["ticket.subject"] || "", requesterName: data["ticket.requester.name"] || "" };
  }

  button.addEventListener("click", async () => {
    try {
      const context = await ticketContext();
      // Zendesk keeps the ticket_editor iframe above a modal in some layouts.
      // Hide the launcher before opening so it cannot visually overlap the workspace.
      button.style.visibility = "hidden";
      button.style.pointerEvents = "none";
      document.body.style.display = "none";
      launcherCollapsed = true;
      // Collapse the launcher iframe itself; hiding its body alone leaves a blank card.
      await client.invoke("resize", { width: "1px", height: "1px" });
      const encoded = encodeURIComponent(JSON.stringify(context));
      await client.invoke("instances.create", {
        location: "modal",
        url: `assets/modal.html?context=${encoded}`,
        size: { width: "960px", height: "760px" }
      });
    } catch (error) {
      button.style.visibility = "visible";
      button.style.pointerEvents = "auto";
      document.body.style.display = "block";
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
      if (lines.length && lines.every((line) => /^[-•*]\s+/.test(line))) return `<ul>${lines.map((line) => `<li>${escapeHtml(line.replace(/^[-•*]\s+/, ""))}</li>`).join("")}</ul><div><br></div>`;
      return `<div>${lines.map(escapeHtml).join("<br>")}</div><div><br></div>`;
    }).join("");
  }
}());
