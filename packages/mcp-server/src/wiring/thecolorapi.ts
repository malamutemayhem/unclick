// wiring/thecolorapi.ts
// Per-app MCP wiring for the thecolorapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { theColorApiId, theColorApiScheme } from "../thecolorapi-tool.js";

export const thecolorapiTools = [
  // ── thecolorapi-tool.ts ───────────────────────────────────────────────────
  {
    name: "thecolorapi_id",
    description: "Get detailed color information (name, RGB, HSL, CMYK) for a hex color.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        hex: { type: "string" as const, description: "Hex color code (e.g. FF5733 or #FF5733)." },
      }, required: ["hex"],
    },
  },
  {
    name: "thecolorapi_scheme",
    description: "Generate a color scheme from a seed hex color.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        hex: { type: "string" as const, description: "Seed hex color (e.g. FF5733)." },
        mode: { type: "string" as const, description: "Scheme mode: monochrome, analogic, complement, triad, quad (default: analogic)." },
        count: { type: "number" as const, description: "Number of colors (default 5, max 10)." },
      }, required: ["hex"],
    },
  },
] as const;

export const thecolorapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // thecolorapi-tool.ts
  thecolorapi_id:            (args) => theColorApiId(args),
  thecolorapi_scheme:        (args) => theColorApiScheme(args),};
