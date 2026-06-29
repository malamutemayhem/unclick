// wiring/cataas.ts
// Per-app MCP wiring for the cataas connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { cataasRandomCat, cataasListTags } from "../cataas-tool.js";

export const cataasTools = [
  // ── cataas-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "cataas_random_cat",
    description: "Get a random cat image, optionally with a tag or text overlay.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        tag: { type: "string", description: "Filter by tag (e.g. cute, funny, sleeping)" },
        text: { type: "string", description: "Text to overlay on the image" },
      },
    },
  },
  {
    name: "cataas_list_tags",
    description: "List all available cat image tags.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const cataasHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cataas-tool.ts
  cataas_random_cat:       (args) => cataasRandomCat(args),
  cataas_list_tags:        (args) => cataasListTags(args),
};
