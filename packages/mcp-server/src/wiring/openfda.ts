// wiring/openfda.ts
// Per-app MCP wiring for the openfda connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { openfdaDrugSearch, openfdaRecallSearch, openfdaAdverseEvents } from "../openfda-tool.js";

export const openfdaTools = [
  // ── openfda-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "openfda_drug_search",
    description: "Search FDA drug labels by brand name or ingredient.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Drug name or ingredient to search for" },
        limit: { type: "number", description: "Number of results (default 5)" },
      },
      required: ["query"],
    },
  },
  {
    name: "openfda_recall_search",
    description: "Search FDA food and drug recall enforcement actions.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Product or reason to search for" },
        limit: { type: "number", description: "Number of results (default 5)" },
      },
      required: ["query"],
    },
  },
  {
    name: "openfda_adverse_events",
    description: "Search FDA drug adverse event reports.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        drug: { type: "string", description: "Drug name to search adverse events for" },
        limit: { type: "number", description: "Number of results (default 5)" },
      },
      required: ["drug"],
    },
  },
] as const;

export const openfdaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openfda-tool.ts
  openfda_drug_search:     (args) => openfdaDrugSearch(args),
  openfda_recall_search:   (args) => openfdaRecallSearch(args),
  openfda_adverse_events:  (args) => openfdaAdverseEvents(args),
};
