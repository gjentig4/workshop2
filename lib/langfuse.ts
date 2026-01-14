import { Langfuse } from "langfuse";

let langfuseInstance: Langfuse | null = null;

export function getLangfuse(): Langfuse | null {
  // Only initialize if keys are configured
  if (
    !process.env.LANGFUSE_SECRET_KEY ||
    !process.env.LANGFUSE_PUBLIC_KEY ||
    process.env.LANGFUSE_SECRET_KEY === "your_secret_key"
  ) {
    return null;
  }

  if (!langfuseInstance) {
    langfuseInstance = new Langfuse({
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      baseUrl: process.env.LANGFUSE_HOST || "https://cloud.langfuse.com",
    });
  }

  return langfuseInstance;
}

export function getLangfuseBaseUrl(): string {
  return process.env.LANGFUSE_HOST || "https://cloud.langfuse.com";
}

export interface TraceMetadata {
  model: string;
  temperature?: number;
  reasoningEnabled?: boolean;
  reasoningEffort?: string;
  toolsEnabled?: boolean;
  structuredOutputEnabled?: boolean;
  systemPrompt?: string;
}

export function createTrace(name: string, metadata: TraceMetadata) {
  const langfuse = getLangfuse();
  if (!langfuse) {
    return null;
  }

  return langfuse.trace({
    name,
    metadata,
  });
}

// Get the URL for a trace
export function getTraceUrl(traceId: string): string {
  const baseUrl = getLangfuseBaseUrl();
  // The URL format is: {baseUrl}/trace/{traceId}
  return `${baseUrl}/trace/${traceId}`;
}

export async function flushLangfuse() {
  const langfuse = getLangfuse();
  if (langfuse) {
    await langfuse.flushAsync();
  }
}
