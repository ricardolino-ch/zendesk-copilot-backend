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

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/copilot", async (req, res) => {
  try {
    const { message, ticketSubject, requesterName, latestComment } = req.body;

    const prompt = `
Du bist ein hilfreicher Support Copilot in Zendesk.
Schreibe eine präzise, professionelle Antwort auf Deutsch.
Berücksichtige Betreff, Absender und letzten Kommentar.
Wenn Informationen fehlen, schreibe keine Fakten dazu.

Betreff: ${ticketSubject || ""}
Requester: ${requesterName || ""}
Letzter Kommentar: ${latestComment || ""}
Zusätzliche Anfrage: ${message || ""}
`;

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: prompt
    });

    res.json({
      output: response.output_text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Backend error",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
