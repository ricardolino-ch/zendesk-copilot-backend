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

function getGreeting(code, requesterName) {
  const safeName = requesterName || "{{ticket.requester.name}}";

  const greetings = {
    de: `Grüezi ${safeName}

Vielen Dank für Ihre Anfrage.`,
    fr: `Bonjour ${safeName}

Merci beaucoup pour votre demande.`,
    it: `Gentile ${safeName}

La ringraziamo per la Sua richiesta.`,
    en: `Hello ${safeName}

Thank you for your inquiry.`
  };

  return greetings[code] || greetings.de;
}

function getClosing(code) {
  const closings = {
    de: "Freundliche Grüsse",
    fr: "Meilleures salutations",
    it: "Cordiali saluti",
    en: "Kind regards"
  };

  return closings[code] || closings.de;
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
      requesterName = "",
      latestComment = ""
    } = req.body;

    const greeting = getGreeting(targetLanguage, requesterName);
    const closing = getClosing(targetLanguage);
    const languageName = getLanguageName(targetLanguage);

    let prompt = "";

    if (action === "summarize_ticket") {
      prompt = `
You are a Zendesk support copilot.

Create a concise summary in German.
Use short bullet points only.
Do not include any greeting.
Do not include any closing.
Do not invent facts.
Focus on:
1. Customer issue
2. Relevant details
3. What the customer wants

Ticket subject:
${ticketSubject}

Latest customer comment:
${latestComment}
`;
    } else if (action === "suggest_reply") {
      prompt = `
You are a Zendesk support copilot.

Write a professional support reply in ${languageName}.

Use exactly this greeting at the beginning:
${greeting}

Use exactly this closing at the end:
${closing}

Rules:
1. No agent name
2. No extra signature
3. Concise, polite, helpful
4. Do not invent facts
5. If information is missing, phrase carefully
6. Return only the final reply

Ticket subject:
${ticketSubject}

Customer name:
${requesterName}

Latest customer comment:
${latestComment}
`;
    } else if (action === "improve_text") {
      prompt = `
You are a Zendesk support copilot.

Your task is to turn the following draft into a complete customer facing support reply.

Instructions:
1. Detect the language of the original text.
2. Keep the same language.
3. Rewrite the text so it sounds professional, clear, polite and natural.
4. Return a complete reply, not just a corrected sentence fragment.
5. Use exactly the correct standard greeting and closing for the detected language.
6. Do not add any agent name.
7. Do not add any extra signature.
8. Return only the final customer reply.

Customer name:
${requesterName}

Use these exact templates:

German greeting:
${getGreeting("de", requesterName)}

German closing:
${getClosing("de")}

French greeting:
${getGreeting("fr", requesterName)}

French closing:
${getClosing("fr")}

Italian greeting:
${getGreeting("it", requesterName)}

Italian closing:
${getClosing("it")}

English greeting:
${getGreeting("en", requesterName)}

English closing:
${getClosing("en")}

Original text:
${text}
`;
    } else if (action === "translate_text") {
      prompt = `
You are a Zendesk support copilot.

Translate the following text into ${languageName}.
Keep the meaning exactly.
Return a full customer ready reply.

Use exactly this greeting at the beginning:
${greeting}

Use exactly this closing at the end:
${closing}

Rules:
1. Preserve meaning
2. Sound natural and professional
3. No agent name
4. No extra signature
5. Return only the final reply

Customer name:
${requesterName}

Original text:
${text}
`;
    } else {
      return res.status(400).json({
        error: "Invalid action",
        details: "Unknown action"
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
  console.log(`Server listening on port ${port}`);
});
