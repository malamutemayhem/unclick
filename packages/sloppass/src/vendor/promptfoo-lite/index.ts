import type { PromptfooLiteProvider } from "./provider.js";
import {
  anthropicProvider,
  googleProvider,
  httpProvider,
  ollamaProvider,
  openaiProvider,
} from "./providers.js";

export type { PromptfooLiteFile, PromptfooLiteProvider } from "./provider.js";

const PROVIDERS: Record<PromptfooLiteProvider["id"], PromptfooLiteProvider> = {
  openai: openaiProvider,
  anthropic: anthropicProvider,
  google: googleProvider,
  ollama: ollamaProvider,
  http: httpProvider,
};

export function getProvider(id: PromptfooLiteProvider["id"]): PromptfooLiteProvider {
  return PROVIDERS[id];
}
