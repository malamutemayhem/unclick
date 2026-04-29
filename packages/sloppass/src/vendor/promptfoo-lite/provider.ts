import type { SlopPassCategory, SlopPassFinding } from "../../types.js";

export interface PromptfooLiteFile {
  path: string;
  content: string;
}

export interface PromptfooLiteProvider {
  id: "openai" | "anthropic" | "google" | "ollama" | "http";
  evaluate(files: PromptfooLiteFile[], checks: SlopPassCategory[]): Promise<SlopPassFinding[]>;
}
