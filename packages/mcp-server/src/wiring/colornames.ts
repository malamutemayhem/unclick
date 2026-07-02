// wiring/colornames.ts
// Per-app MCP wiring for the colornames connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { colorNameLookup, colorNameRandom } from "../colornames-tool.js";

export const colornamesTools = [
  // ── colornames-tool.ts ───────────────────────────────────────────────────────
  {
    name: "color_name_lookup",
    description: "Find the closest named color for a hex code.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        hex: { type: "string" as const, description: "Hex color code (e.g. 'ff5733' or '#ff5733')." },
      }, required: ["hex"],
    },
  },
  {
    name: "color_name_random",
    description: "Get a random named color with its hex code and name.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const colornamesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // colornames-tool.ts
  color_name_lookup:         (args) => colorNameLookup(args),
  color_name_random:         (args) => colorNameRandom(args),};
