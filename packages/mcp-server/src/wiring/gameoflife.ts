// wiring/gameoflife.ts
// Per-app MCP wiring for the gameoflife connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { gameOfLifeStep } from "../gameoflife-tool.js";

export const gameoflifeTools = [
  // ── gameoflife-tool.ts ───────────────────────────────────────────────────────
  {
    name: "game_of_life_step",
    description: "Run Conway's Game of Life simulation steps (local, no network).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        grid: { type: "string" as const, description: "Grid string with rows separated by newlines. '#' or '1' = alive, '.' or '0' = dead." },
        width: { type: "number" as const, description: "Grid width for random generation (default 10, max 50)." },
        height: { type: "number" as const, description: "Grid height for random generation (default 10, max 50)." },
        steps: { type: "number" as const, description: "Number of simulation steps (default 1, max 20)." },
      },
    },
  },
] as const;

export const gameoflifeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gameoflife-tool.ts
  game_of_life_step:         (args) => gameOfLifeStep(args),};
