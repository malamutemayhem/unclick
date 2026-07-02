// wiring/tfidf.ts
// Per-app MCP wiring for the tfidf connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { tfidfCalculate } from "../tfidf-tool.js";

export const tfidfTools = [
  // ── tfidf-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "tfidf_calculate",
    description: "Calculate TF-IDF scores to rank documents by relevance to a query.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        documents: { type: "array" as const, items: { type: "string" as const }, description: "Array of document strings." },
        query: { type: "string" as const, description: "Search query." },
      }, required: ["documents", "query"],
    },
  },
] as const;

export const tfidfHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tfidf-tool.ts
  tfidf_calculate:           (args) => tfidfCalculate(args),
};
