// wiring/memegen.ts
// Per-app MCP wiring for the memegen connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { memegenTemplates, memegenCreate } from "../memegen-tool.js";

export const memegenTools = [
  // ── memegen-tool.ts ────────────────────────────────────────────────────────
  {
    name: "memegen_templates",
    description: "List available meme templates from memegen.link.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "memegen_create",
    description: "Generate a meme image URL from a template, top text, and bottom text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        template: { type: "string" as const, description: "Template id (default: fry). Use memegen_templates to list." },
        top_text: { type: "string" as const, description: "Top line of the meme." },
        bottom_text: { type: "string" as const, description: "Bottom line of the meme." },
      },
    },
  },
] as const;

export const memegenHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // memegen-tool.ts
  memegen_templates:         (args) => memegenTemplates(args),
  memegen_create:            (args) => memegenCreate(args),};
