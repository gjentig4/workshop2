// Reasoning effort detection and parameter mapping

export type ReasoningEffort = "low" | "medium" | "high";

// Patterns to detect models that support reasoning/thinking
const REASONING_PATTERNS = [
  /claude.*sonnet/i, // Claude Sonnet models with extended thinking
  /claude.*opus/i, // Claude Opus models
  /o1/i, // OpenAI o1 models
  /o3/i, // OpenAI o3 models
  /deepseek.*r1/i, // DeepSeek R1
  /qwq/i, // Qwen QwQ models
];

export function supportsReasoning(modelId: string): boolean {
  return REASONING_PATTERNS.some((pattern) => pattern.test(modelId));
}

export function getReasoningHint(modelId: string): string | null {
  if (/claude/i.test(modelId)) {
    return "Claude models use extended thinking with budget tokens";
  }
  if (/o1|o3/i.test(modelId)) {
    return "OpenAI reasoning models use reasoning_effort parameter";
  }
  if (/deepseek.*r1/i.test(modelId)) {
    return "DeepSeek R1 has reasoning enabled by default";
  }
  if (/qwq/i.test(modelId)) {
    return "QwQ models support extended reasoning";
  }
  return null;
}

// Map reasoning effort to provider-specific parameters
export function mapReasoningParams(
  modelId: string,
  effort: ReasoningEffort
): Record<string, unknown> {
  // Claude models - use thinking budget tokens
  if (/claude/i.test(modelId)) {
    const budgetTokens = {
      low: 5000,
      medium: 20000,
      high: 50000,
    };
    return {
      thinking: {
        type: "enabled",
        budget_tokens: budgetTokens[effort],
      },
    };
  }

  // OpenAI o1/o3 models - use reasoning_effort
  if (/o1|o3/i.test(modelId)) {
    return {
      reasoning_effort: effort,
    };
  }

  // DeepSeek R1 - reasoning is on by default, no params needed
  if (/deepseek.*r1/i.test(modelId)) {
    return {};
  }

  // QwQ - similar to Claude
  if (/qwq/i.test(modelId)) {
    const budgetTokens = {
      low: 5000,
      medium: 20000,
      high: 50000,
    };
    return {
      thinking: {
        type: "enabled",
        budget_tokens: budgetTokens[effort],
      },
    };
  }

  return {};
}
