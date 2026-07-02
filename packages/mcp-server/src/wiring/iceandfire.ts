// wiring/iceandfire.ts
// Per-app MCP wiring for the iceandfire connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { iceandfireCharacters, iceandfireBooks, iceandfireHouses } from "../iceandfire-tool.js";

export const iceandfireHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // iceandfire-tool.ts
  iceandfire_characters:   (args) => iceandfireCharacters(args),
  iceandfire_books:        (args) => iceandfireBooks(args),
  iceandfire_houses:       (args) => iceandfireHouses(args),
};
