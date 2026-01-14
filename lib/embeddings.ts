import OpenAI from "openai";

let openaiInstance: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_key_here") {
      throw new Error("OPENAI_API_KEY is not configured");
    }
    openaiInstance = new OpenAI({ apiKey });
  }
  return openaiInstance;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAI();

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const openai = getOpenAI();

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  return response.data.map((d) => d.embedding);
}

// Estimate token count (rough approximation)
export function estimateTokens(text: string): number {
  // Rough estimate: ~4 characters per token for English text
  return Math.ceil(text.length / 4);
}
