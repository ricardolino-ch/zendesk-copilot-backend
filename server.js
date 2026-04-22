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

function getLanguageName(code) {
  const map = {
    de: "German",
    fr: "French",
    it: "Italian",
    en: "English"
  };
  return map[code] || "German";
}

async function runPrompt(prompt) {
  const response = await client.responses.create({
    model: "gpt-5.4",
    input: prompt
  });

  return response.output_text || "";
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/copilot", async (req, res) => {
  try {
    const {
      action,
      targetLanguage = "de",
      text = "",
      ticketSubject = "",
      latestComment = ""
    } = req.body;

    const languageName = getLanguageName(targetLanguage);

    let prompt = "";

    if (action === "summarize_ticket") {
      prompt = `
You are a Zendesk support copilot.

Create a HIGH QUALITY ticket summary in ${languageName}.

STRICT RULES:
- Do NOT write a customer reply
- Do NOT include greeting
- Do NOT include closing
- Do NOT invent anything
- Preserve ALL important details

GOAL:
The summary must be useful for a support agent.

FORMAT:

Problem:
- ...

Details:
- extract ALL relevant data exactly from the ticket
- emails
- names
- numbers
- actions requested
- differences (important!)

Context:
- anything important to understand the situation

Customer intent:
- what exactly does the customer want?

IMPORTANT:
- Do NOT simplify too much
- Do NOT drop information
- If multiple items exist, list ALL of them
- Keep structure clean and readable

Ticket subject:
${ticketSubject}

Ticket content:
${latestComment}
`;
    }

    else if (action === "improve_text") {
      prompt = `
Improve the following text into a professional support reply.
Keep language.
Add proper structure.
Return only final text.

Text:
${text}
`;
    }

    else if (action === "translate_text") {
      prompt = `
Translate the following text into ${languageName}.
Keep meaning exactly.
Do NOT add greeting or closing.

Text:
${text}
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
