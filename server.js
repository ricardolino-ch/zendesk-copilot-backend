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

async function fetchRicardoHelp(query) {
  try {
    const url = `https://help.ricardo.ch/api/v2/help_center/de/articles/search.json?query=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    const json = await res.json();

    const articles = (json.results || []).slice(0, 3).map(a => ({
      title: a.title,
      url: a.html_url,
      snippet: a.body.replace(/<[^>]+>/g, "").slice(0, 500)
    }));

    return articles;
  } catch (e) {
    console.error("Help API Fehler:", e);
    return [];
  }
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/copilot", async (req, res) => {
  try {
    const {
      action,
      text = "",
      requesterName = ""
    } = req.body;

    let prompt = "";

    if (action === "reply_from_summary") {

      const helpArticles = await fetchRicardoHelp(text);

      const helpContext = helpArticles.map(a => `
Titel: ${a.title}
Inhalt: ${a.snippet}
Link: ${a.url}
`).join("\n");

      prompt = `
Du bist ein Ricardo Support Agent.

Erstelle eine professionelle Antwort basierend auf:

1. interner Zusammenfassung
2. Ricardo Hilfe Artikeln

Regeln:
- Schreibe KEINE interne Analyse
- Nutze klare Sprache
- Keine unnötigen Erklärungen
- Nur relevante Infos
- Verwende Ricardo Begriffe:
  Benutzerkonto, Benutzername, Gebühren, Artikelnummer

Struktur:

${getGreeting("de", requesterName)}

<Antwort>

${getClosing()}

Interne Zusammenfassung:
${text}

Ricardo Hilfe Kontext:
${helpContext}
`;
    }

    else {
      return res.status(400).json({
        error: "Invalid action"
      });
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
  console.log("Server running on port " + port);
});
