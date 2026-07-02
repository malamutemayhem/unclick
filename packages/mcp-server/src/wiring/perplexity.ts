// wiring/perplexity.ts
// Per-app MCP wiring for the perplexity connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI Models

import { perplexityChatCompletion } from "../perplexity-tool.js";

export const perplexityTools = [
  // ── perplexity-tool.ts ───────────────────────────────────────────────────────
  {
    name: "perplexity_chat_completion",
    description: "Run a search-augmented chat completion with Perplexity AI. Returns grounded answers with citations from the web.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Perplexity API key" },
        model: { type: "string", description: "Model (default: sonar). Options: sonar, sonar-pro, sonar-reasoning" },
        prompt: { type: "string", description: "User message (alternative to messages)" },
        system_prompt: { type: "string" },
        messages: { type: "string", description: "JSON array of {role, content} messages" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
        search_recency_filter: { type: "string", description: "Limit sources by time: month, week, day, hour" },
        search_domain_filter: { type: "string", description: "JSON array of domains to restrict search to" },
        return_citations: { type: "boolean", description: "Include citation URLs in response (default true)" },
        return_related_questions: { type: "boolean" },
      },
    },
  },
] as const;

export const perplexityHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // perplexity-tool.ts
  perplexity_chat_completion:(args) => perplexityChatCompletion(args),
};
