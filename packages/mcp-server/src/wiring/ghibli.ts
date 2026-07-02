// wiring/ghibli.ts
// Per-app MCP wiring for the ghibli connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ghibliFilms, ghibliPeople } from "../ghibli-tool.js";

export const ghibliTools = [
  // ── ghibli-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "ghibli_films",
    description: "List all Studio Ghibli films with directors and descriptions.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "ghibli_people",
    description: "List characters from Studio Ghibli films.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const ghibliHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ghibli-tool.ts
  ghibli_films:            (args) => ghibliFilms(args),
  ghibli_people:           (args) => ghibliPeople(args),
};
