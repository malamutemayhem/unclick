// wiring/yesno.ts
// Per-app MCP wiring for the yesno connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { yesNoRandom } from "../yesno-tool.js";

export const yesnoTools = [
  // ── yesno-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "yesno_random",
    description: "Get a random yes/no answer with an animated GIF.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        force: { type: "string", enum: ["yes", "no", "maybe"], description: "Force a specific answer" },
      },
    },
  },
] as const;

export const yesnoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // yesno-tool.ts
  yesno_random:            (args) => yesNoRandom(args),
};
