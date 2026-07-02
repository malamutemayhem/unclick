// wiring/colorconvert.ts
// Per-app MCP wiring for the colorconvert connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { colorHexConvert } from "../colorconvert-tool.js";

export const colorconvertTools = [
  // ── colorconvert-tool.ts ─────────────────────────────────────────────────────
  {
    name: "color_hex_convert",
    description: "Convert a hex color to RGB and HSL values.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        hex: { type: "string" as const, description: "Hex color code (e.g. #FF5733 or FF5733)." },
      }, required: ["hex"],
    },
  },
] as const;

export const colorconvertHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // colorconvert-tool.ts
  color_hex_convert:         (args) => colorHexConvert(args),
};
