// wiring/cohere.ts
// Per-app MCP wiring for the cohere connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI Models

import { cohereChat, cohereGenerate, cohereEmbed, cohereRerank, cohereClassify, cohereListModels } from "../cohere-tool.js";

export const cohereTools = [
  // ── cohere-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "cohere_chat",
    description: "Chat with a Cohere Command model. Supports system preamble and conversation history.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Cohere API key" },
        message: { type: "string", description: "User message" },
        model: { type: "string", description: "Model ID (default: command-r-plus)" },
        preamble: { type: "string", description: "System prompt / preamble" },
        chat_history: { type: "string", description: "JSON array of prior messages [{role, message}]" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
      },
      required: ["message"],
    },
  },
  {
    name: "cohere_generate",
    description: "Generate text completions using Cohere Command models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        prompt: { type: "string" },
        model: { type: "string", description: "Model ID (default: command)" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
        stop_sequences: { type: "string", description: "JSON array of stop strings" },
      },
      required: ["prompt"],
    },
  },
  {
    name: "cohere_embed",
    description: "Create vector embeddings for text using Cohere's embed models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        texts: { type: "string", description: "JSON array of strings to embed" },
        model: { type: "string", description: "Embed model (default: embed-english-v3.0)" },
        input_type: { type: "string", enum: ["search_document", "search_query", "classification", "clustering"], description: "search_document, search_query, classification, clustering" },
      },
      required: ["texts"],
    },
  },
  {
    name: "cohere_rerank",
    description: "Rerank a list of documents by relevance to a query using Cohere Rerank.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        query: { type: "string" },
        documents: { type: "string", description: "JSON array of strings or {text} objects" },
        model: { type: "string", description: "Rerank model (default: rerank-english-v3.0)" },
        top_n: { type: "number", description: "Return top N results" },
      },
      required: ["query", "documents"],
    },
  },
  {
    name: "cohere_classify",
    description: "Classify texts into categories using Cohere Classify with few-shot examples.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        inputs: { type: "string", description: "JSON array of strings to classify" },
        examples: { type: "string", description: "JSON array of {text, label} few-shot examples" },
        model: { type: "string" },
      },
      required: ["inputs", "examples"],
    },
  },
  {
    name: "cohere_list_models",
    description: "List all available Cohere models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const cohereHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cohere-tool.ts
  cohere_chat:             (args) => cohereChat(args),
  cohere_generate:         (args) => cohereGenerate(args),
  cohere_embed:            (args) => cohereEmbed(args),
  cohere_rerank:           (args) => cohereRerank(args),
  cohere_classify:         (args) => cohereClassify(args),
  cohere_list_models:      (args) => cohereListModels(args),
};
