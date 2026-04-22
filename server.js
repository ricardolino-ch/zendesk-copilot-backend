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

function getGreeting(name) {
  return `Grüezi ${name || "{{ticket.requester.name}}"}

Vielen Dank für Ihre Anfrage.`;
}

function getClosing() {
  return "Freundliche Grüsse";
}

async function runPrompt(prompt) {
  const res = await client.responses.create({
    model: "gpt-5.4",
    input: prompt
  });

  return res.output_text || "";
}

async function fetchHelpArticle(query) {
  try {
    const url = `https://help.ricardo.ch/api/v2/help_center/de/articles/search.json?query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const json = await res.json();

    const article = (json.results || [])[0];

    if (!article) return "";

    const cleanText = article.body
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .slice(0, 400);

    return `
Ricardo Hilfe Kontext:
Titel: ${article.title}
Inhalt: ${cleanText}
`;
  } catch (e) {
    console.log("Help fallback:", e.message);
    return "";
  }
}

app.post("/copilot", async (req, res) => {
  try {
    const { action, text = "", requesterName = "" } = req.body;

    let prompt = "";

    if (action === "reply_from_summary") {

      const helpContext = await fetchHelpArticle(text);

      prompt = `
Du bist ein Ricardo Support Agent.

Erstelle eine professionelle Antwort basierend auf der internen Zusammenfassung.

Regeln:
- Keine internen Begriffe erwähnen
- Keine "Zusammenfassung" erwähnen
- Klar, freundlich, lösungsorientiert
- Keine unnötigen Infos
- Ricardo Begriffe verwenden:
  Benutzerkonto, Benutzername, Gebühren, Artikelnummer

${getGreeting(requesterName)}

<Antwort>

${getClosing()}

Interne Zusammenfassung:
${text}

${helpContext}
`;
    }

    else {
      return res.status(400).json({ error: "Invalid action" });
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
  console.log("Server running");
});
