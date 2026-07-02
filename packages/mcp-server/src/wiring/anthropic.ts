// wiring/anthropic.ts
// Per-app MCP wiring for the anthropic connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { anthropicCreateMessage, anthropicListModels } from "../anthropic-tool.js";

export const anthropicTools = [
  // ── anthropic-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "anthropic_create_message",
    description: "Send a message to the Anthropic Messages API (Claude models). Useful for agents that need to call Claude programmatically or compare model outputs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        model: { type: "string", description: "Claude model ID (default: claude-sonnet-4-6)" },
        prompt: { type: "string", description: "Convenience: single user message (alternative to messages array)" },
        messages: { description: "Array of {role, content} message objects" },
        system: { type: "string", description: "System prompt" },
        max_tokens: { type: "number", description: "Max tokens to generate (default: 1024)" },
        temperature: { type: "number" },
        top_p: { type: "number" },
        top_k: { type: "number" },
        stop_sequences: { description: "Array of stop sequences" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "anthropic_list_models",
    description: "List all Claude models available via the Anthropic API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const anthropicHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // anthropic-tool.ts
  anthropic_create_message:    (args) => anthropicCreateMessage(args),
  anthropic_list_models:       (args) => anthropicListModels(args),
};
