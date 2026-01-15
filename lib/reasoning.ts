// Reasoning effort detection and parameter mapping
// Based on OpenRouter's unified reasoning API: https://openrouter.ai/docs/guides/best-practices/reasoning-tokens

export type ReasoningEffort = "low" | "medium" | "high";

// Patterns to detect models that support reasoning/thinking
const REASONING_PATTERNS = [
  /claude.*sonnet/i, // Claude Sonnet models with extended thinking
  /claude.*opus/i, // Claude Opus models
  /o1/i, // OpenAI o1 models
  /o3/i, // OpenAI o3 models
  /gpt-5/i, // GPT-5 series
  /deepseek.*r1/i, // DeepSeek R1
  /qwq/i, // Qwen QwQ models
  /gemini.*thinking/i, // Gemini thinking models
];

export function supportsReasoning(modelId: string): boolean {
  return REASONING_PATTERNS.some((pattern) => pattern.test(modelId));
}

export function getReasoningHint(modelId: string): string | null {
  if (/claude/i.test(modelId)) {
    return "Claude models use extended thinking with max_tokens for reasoning budget";
  }
  if (/o1|o3|gpt-5/i.test(modelId)) {
    return "OpenAI reasoning models use effort levels (low/medium/high)";
  }
  if (/deepseek.*r1/i.test(modelId)) {
    return "DeepSeek R1 has reasoning enabled by default";
  }
  if (/qwq/i.test(modelId)) {
    return "QwQ models support extended reasoning";
  }
  return null;
}

// Map reasoning effort to OpenRouter's unified reasoning parameter
// See: https://openrouter.ai/docs/guides/best-practices/reasoning-tokens
export function mapReasoningParams(
  modelId: string,
  effort: ReasoningEffort
): Record<string, unknown> {
  // For Anthropic Claude models, use max_tokens approach
  // The reasoning budget is calculated as a portion of max_tokens
  if (/claude/i.test(modelId)) {
    const maxTokensByEffort = {
      low: 4000,
      medium: 10000,
      high: 20000,
    };
    return {
      max_tokens: maxTokensByEffort[effort] + 4000, // Add buffer for actual response
      reasoning: {
        max_tokens: maxTokensByEffort[effort],
      },
    };
  }

  // OpenAI o1/o3/GPT-5 models - use effort levels
  if (/o1|o3|gpt-5/i.test(modelId)) {
    return {
      reasoning: {
        effort: effort,
      },
    };
  }

  // DeepSeek R1 - reasoning is on by default, but we can still use unified param
  if (/deepseek.*r1/i.test(modelId)) {
    return {
      reasoning: {
        effort: effort,
      },
    };
  }

  // Gemini thinking models
  if (/gemini.*thinking/i.test(modelId)) {
    const maxTokensByEffort = {
      low: 4000,
      medium: 10000,
      high: 20000,
    };
    return {
      reasoning: {
        max_tokens: maxTokensByEffort[effort],
      },
    };
  }

  // QwQ and other models - use effort
  if (/qwq/i.test(modelId)) {
    return {
      reasoning: {
        effort: effort,
      },
    };
  }

  // Default: use effort parameter
  return {
    reasoning: {
      effort: effort,
    },
  };
}
