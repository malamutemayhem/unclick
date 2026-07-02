// wiring/metmuseum.ts
// Per-app MCP wiring for the metmuseum connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { metSearch, metObject, metDepartments } from "../metmuseum-tool.js";

export const metmuseumTools = [
  // ── metmuseum-tool.ts ──────────────────────────────────────────────────────
  {
    name: "met_search",
    description: "Search the Metropolitan Museum of Art collection for artworks.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (e.g. sunflowers, Egyptian, armor)" },
        hasImages: { type: "boolean", description: "Only return objects with images (default true)" },
      },
      required: ["query"],
    },
  },
  {
    name: "met_object",
    description: "Get full details for a Met Museum artwork by object ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { objectID: { type: "number", description: "Met Museum object ID" } },
      required: ["objectID"],
    },
  },
  {
    name: "met_departments",
    description: "List all departments in the Metropolitan Museum of Art.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const metmuseumHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // metmuseum-tool.ts
  met_search:              (args) => metSearch(args),
  met_object:              (args) => metObject(args),
  met_departments:         (args) => metDepartments(args),
};
