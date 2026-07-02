// wiring/togetherai.ts
// Per-app MCP wiring for the togetherai connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Monitoring / CI / CDP / Email / Commerce / Inference

import { togetherai_chat_completion, togetherai_completion, togetherai_create_embedding, togetherai_list_models } from "../togetherai-tool.js";

export const togetheraiTools = [
  // ── togetherai-tool.ts ────────────────────────────────────────────────────────
  {
    name: "togetherai_chat_completion",
    description: "Run a chat completion with any Together AI model. Supports Llama, Mistral, Qwen, and 100+ open-source models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Together AI API key" },
        model: { type: "string", description: "Model ID (e.g. meta-llama/Llama-3-8b-chat-hf). Use togetherai_list_models to browse." },
        messages: { type: "array", items: {}, description: "Array of {role, content} message objects" },
        max_tokens: { type: "number", description: "Maximum tokens to generate" },
        temperature: { type: "number", description: "Sampling temperature 0-2 (default 0.7)" },
        top_p: { type: "number", description: "Top-p nucleus sampling" },
        top_k: { type: "number", description: "Top-k sampling" },
        stop: { type: "array", items: {}, description: "Stop sequences" },
      },
      required: ["api_key", "model", "messages"],
    },
  },
  {
    name: "togetherai_completion",
    description: "Run a text completion with any Together AI model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Together AI API key" },
        model: { type: "string", description: "Model ID (e.g. mistralai/Mistral-7B-v0.1)" },
        prompt: { type: "string", description: "Text prompt to complete" },
        max_tokens: { type: "number", description: "Maximum tokens to generate" },
        temperature: { type: "number", description: "Sampling temperature 0-2" },
        top_p: { type: "number", description: "Top-p nucleus sampling" },
        top_k: { type: "number", description: "Top-k sampling" },
        stop: { type: "array", items: {}, description: "Stop sequences" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "togetherai_create_embedding",
    description: "Create text embeddings using a Together AI embedding model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Together AI API key" },
        model: { type: "string", description: "Embedding model ID (e.g. togethercomputer/m2-bert-80M-8k-retrieval)" },
        input: { description: "Text string or array of strings to embed" },
      },
      required: ["api_key", "input"],
    },
  },
  {
    name: "togetherai_list_models",
    description: "List all available models on Together AI including chat, completion, embedding, and image models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Together AI API key" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const togetheraiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // togetherai-tool.ts
  togetherai_chat_completion: (args) => togetherai_chat_completion(args),
  togetherai_completion:      (args) => togetherai_completion(args),
  togetherai_create_embedding:(args) => togetherai_create_embedding(args),
  togetherai_list_models:     (args) => togetherai_list_models(args),
};
