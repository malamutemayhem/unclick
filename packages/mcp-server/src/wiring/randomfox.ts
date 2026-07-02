// wiring/randomfox.ts
// Per-app MCP wiring for the randomfox connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { randomFoxImage } from "../randomfox-tool.js";

export const randomfoxTools = [
  // ── randomfox-tool.ts ──────────────────────────────────────────────────────
  {
    name: "random_fox_image",
    description: "Get a random fox image URL.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const randomfoxHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // randomfox-tool.ts
  random_fox_image:        (args) => randomFoxImage(args),
};
