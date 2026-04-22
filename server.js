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
You are a support copilot for Zendesk.

Create a concise ticket summary in German.
Use short bullet points only.
Do not include any greeting.
Do not include any closing.
Do not invent facts.
Focus on the customer's issue, request, relevant details, and desired outcome.

Ticket subject:
${ticketSubject}

Latest customer comment:
${latestComment}
`;
    } else if (action === "suggest_reply") {
      prompt = `
You are a support copilot for Zendesk.

Write a professional support reply in ${languageName}.
Use exactly this greeting at the beginning:

${greeting}

Use exactly this closing at the end:

${closing}

Rules:
1. Do not add any agent name.
2. Do not add any extra signature.
3. Keep the answer concise, polite, and helpful.
4. Do not invent facts.
5. If details are missing, phrase the reply carefully.
6. Return only the final customer facing reply.

Ticket subject:
${ticketSubject}

Customer name:
${requesterName}

Latest customer comment:
${latestComment}
`;
    } else if (action === "improve_text") {
      prompt = `
You are a support copilot for Zendesk.

Improve the following support draft.
Detect the language of the provided text.
Keep the same language as the original text.
Return a polished, professional customer facing version.

If the text is or should be a full support reply, enforce this exact language specific structure:
1. Use the correct standard greeting with the customer's name.
2. Write a concise and professional body.
3. Use the correct language specific closing.
4. Do not add any agent name.
5. Do not add any extra signature.

Customer name:
${requesterName}

Available standard greetings and closings:
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
You are a support copilot for Zendesk.

Translate the following support draft into ${languageName}.
Return a polished customer facing reply.

Use exactly this greeting at the beginning:
${greeting}

Use exactly this closing at the end:
${closing}

Rules:
1. The main body must preserve the meaning of the original text.
2. Make it sound natural and professional.
3. Do not add any agent name.
4. Do not add any extra signature.
5. Return only the final translated reply.

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
