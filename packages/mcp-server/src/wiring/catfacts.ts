// wiring/catfacts.ts
// Per-app MCP wiring for the catfacts connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { catFact, catFacts, catBreeds } from "../catfacts-tool.js";

export const catfactsTools = [
  // ── catfacts-tool.ts ────────────────────────────────────────────────────────
  {
    name: "cat_fact",
    description: "Get a random cat fact.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "cat_facts",
    description: "Get multiple cat facts with pagination.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of facts (max 50, default 5)" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "cat_breeds",
    description: "List cat breeds with details.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of breeds (max 50, default 10)" },
        page: { type: "number" },
      },
    },
  },
] as const;

export const catfactsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // catfacts-tool.ts
  cat_fact:                (args) => catFact(args),
  cat_facts:               (args) => catFacts(args),
  cat_breeds:              (args) => catBreeds(args),
};
