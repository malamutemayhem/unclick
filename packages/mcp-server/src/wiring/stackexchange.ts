// wiring/stackexchange.ts
// Per-app MCP wiring for the stackexchange connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { stackexchangeSearch, stackexchangeQuestion } from "../stackexchange-tool.js";

export const stackexchangeTools = [
  // ── stackexchange-tool.ts ────────────────────────────────────────────────────
  {
    name: "stackexchange_search",
    description: "Search Stack Exchange (default: Stack Overflow) for questions.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search query." },
        site: { type: "string" as const, description: "SE site (default: stackoverflow)." },
        page: { type: "number" as const, description: "Page number." },
      }, required: ["query"],
    },
  },
  {
    name: "stackexchange_question",
    description: "Get a Stack Exchange question by ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Question ID." },
        site: { type: "string" as const, description: "SE site (default: stackoverflow)." },
      }, required: ["id"],
    },
  },
] as const;

export const stackexchangeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // stackexchange-tool.ts
  stackexchange_search:      (args) => stackexchangeSearch(args),
  stackexchange_question:    (args) => stackexchangeQuestion(args),
};
