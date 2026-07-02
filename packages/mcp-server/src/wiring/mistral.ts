// wiring/mistral.ts
// Per-app MCP wiring for the mistral connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI Models

import { mistralChatCompletion, mistralListModels, mistralCreateEmbedding } from "../mistral-tool.js";

export const mistralTools = [
  // ── mistral-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "mistral_chat_completion",
    description: "Run a chat completion with a Mistral AI model (mistral-small, mistral-medium, mistral-large, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mistral API key" },
        model: { type: "string", description: "Model ID (default: mistral-small-latest)" },
        prompt: { type: "string", description: "Single user message (alternative to messages)" },
        system_prompt: { type: "string" },
        messages: { type: "string", description: "JSON array of {role, content} messages" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
        top_p: { type: "number" },
      },
    },
  },
  {
    name: "mistral_list_models",
    description: "List all available Mistral AI models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "mistral_create_embedding",
    description: "Create vector embeddings for text using Mistral's embedding model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        input: { type: "string", description: "Text or JSON array of strings to embed" },
        model: { type: "string", description: "Embedding model (default: mistral-embed)" },
      },
      required: ["input"],
    },
  },
] as const;

export const mistralHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mistral-tool.ts
  mistral_chat_completion: (args) => mistralChatCompletion(args),
  mistral_list_models:     (args) => mistralListModels(args),
  mistral_create_embedding:(args) => mistralCreateEmbedding(args),
};
