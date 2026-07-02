// wiring/randomduck.ts
// Per-app MCP wiring for the randomduck connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { randomDuckImage, randomDuckList } from "../randomduck-tool.js";

export const randomduckTools = [
  // ── randomduck-tool.ts ────────────────────────────────────────────────────
  {
    name: "random_duck_image",
    description: "Get a random duck image URL.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "random_duck_list",
    description: "List all available duck image filenames.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const randomduckHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // randomduck-tool.ts
  random_duck_image:         (args) => randomDuckImage(args),
  random_duck_list:          (args) => randomDuckList(args),};
