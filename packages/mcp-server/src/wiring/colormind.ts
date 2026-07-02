// wiring/colormind.ts
// Per-app MCP wiring for the colormind connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { colormindGeneratePalette, colormindListModels } from "../colormind-tool.js";

export const colormindTools = [
  // ── colormind-tool.ts ──────────────────────────────────────────────────────
  {
    name: "colormind_generate_palette",
    description: "Generate an AI-powered 5-color palette using Colormind.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        model: { type: "string", description: "Color model to use (default: default)" },
        input: {
          type: "array",
          description: "Optional 5-element array of [R,G,B] or 'N' for colors to lock/generate",
          items: {},
        },
      },
    },
  },
  {
    name: "colormind_list_models",
    description: "List available Colormind color models.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const colormindHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // colormind-tool.ts
  colormind_generate_palette: (args) => colormindGeneratePalette(args),
  colormind_list_models:   (args) => colormindListModels(args),
};
