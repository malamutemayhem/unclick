// wiring/urbandictionary.ts
// Per-app MCP wiring for the urbandictionary connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { urbanDefine, urbanRandom } from "../urbandictionary-tool.js";

export const urbandictionaryTools = [
  // ── urbandictionary-tool.ts ─────────────────────────────────────────────────
  {
    name: "urban_define",
    description: "Look up slang definitions on Urban Dictionary.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        term: { type: "string", description: "Slang term to define" },
      },
      required: ["term"],
    },
  },
  {
    name: "urban_random",
    description: "Get random Urban Dictionary definitions.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const urbandictionaryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // urbandictionary-tool.ts
  urban_define:              (args) => urbanDefine(args),
  urban_random:              (args) => urbanRandom(args),
};
