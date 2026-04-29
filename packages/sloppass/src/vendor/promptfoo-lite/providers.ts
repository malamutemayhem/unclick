import type { PromptfooLiteProvider } from "./provider.js";

function scaffoldProvider(id: PromptfooLiteProvider["id"], label: string): PromptfooLiteProvider {
  return {
    id,
    async evaluate(files, checks) {
      if (files.length === 0 || checks.length === 0) return [];
      return [
        {
          title: `${label} provider scaffold is wired`,
          category: checks[0],
          severity: "info",
          why_it_matters:
            "SlopPass keeps provider plumbing explicit while the first scaffold avoids making live model calls.",
          evidence: `${id}: ${files.length} file(s), ${checks.length} check category/categories`,
          suggested_fix: "Add the provider call adapter in a later implementation chip before operator-facing model review.",
          confidence_note: "Provider scaffold only. No model call was made.",
        },
      ];
    },
  };
}

export const openaiProvider = scaffoldProvider("openai", "OpenAI");
export const anthropicProvider = scaffoldProvider("anthropic", "Anthropic");
export const googleProvider = scaffoldProvider("google", "Google");
export const ollamaProvider = scaffoldProvider("ollama", "Ollama");

export const httpProvider: PromptfooLiteProvider = {
  id: "http",
  async evaluate() {
    return [];
  },
};
