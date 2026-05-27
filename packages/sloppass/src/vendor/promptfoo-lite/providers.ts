import type { PromptfooLiteProvider } from "./provider.js";

function offlineProvider(id: PromptfooLiteProvider["id"], label: string): PromptfooLiteProvider {
  return {
    id,
    async evaluate(files, checks) {
      if (files.length === 0 || checks.length === 0) return [];
      return [
        {
          title: `${label} provider is configured for offline mode`,
          category: checks[0],
          severity: "info",
          why_it_matters:
            "SlopPass keeps provider selection explicit while the deterministic runner avoids making live model calls.",
          evidence: `${id}: ${files.length} file(s), ${checks.length} check category/categories`,
          suggested_fix: "Keep provider set to http for deterministic-only review, or add a gated adapter before operator-facing model review.",
          confidence_note: "Offline provider mode. No model call was made.",
        },
      ];
    },
  };
}

export const openaiProvider = offlineProvider("openai", "OpenAI");
export const anthropicProvider = offlineProvider("anthropic", "Anthropic");
export const googleProvider = offlineProvider("google", "Google");
export const ollamaProvider = offlineProvider("ollama", "Ollama");

export const httpProvider: PromptfooLiteProvider = {
  id: "http",
  async evaluate() {
    return [];
  },
};
