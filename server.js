import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const { pregunta, contexto } = req.body;

    const response = await client.responses.create({
      model: "gpt-5",
      input: `
Analiza estos datos:

${JSON.stringify(contexto)}

Pregunta:
${pregunta}
`
    });

    res.json({
      respuesta: response.output_text
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

app.listen(process.env.PORT || 10000);
