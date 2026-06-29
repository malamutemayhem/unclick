// wiring/groq.ts
// Per-app MCP wiring for the groq connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { groqChatCompletion, groqListModels } from "../groq-tool.js";

export const groqTools = [
  // ── groq-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "groq_chat_completion",
    description: "Run a fast LLM inference with Groq. Supports Llama 3, Mixtral, Gemma, and other open models at high speed.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Groq API key from console.groq.com/keys" },
        model: { type: "string", description: "Model ID (e.g. llama-3.3-70b-versatile, mixtral-8x7b-32768, gemma2-9b-it). Default: llama-3.3-70b-versatile" },
        messages: { type: "array", items: { type: "object", additionalProperties: true }, description: "Array of {role, content} messages" },
        prompt: { type: "string", description: "Single user message (alternative to messages)" },
        system_prompt: { type: "string", description: "System prompt (used with prompt shorthand)" },
        max_tokens: { type: "number", description: "Maximum tokens to generate" },
        temperature: { type: "number", minimum: 0, maximum: 2, description: "Sampling temperature (0-2)" },
        top_p: { type: "number", description: "Top-p sampling (0-1)" },
        stop: { description: "Stop sequence(s)", oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] },
      },
      required: ["api_key"],
    },
  },
  {
    name: "groq_list_models",
    description: "List all models available on Groq.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Groq API key" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const groqHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // groq-tool.ts
  groq_chat_completion:    (args) => groqChatCompletion(args),
  groq_list_models:        (args) => groqListModels(args),
};
