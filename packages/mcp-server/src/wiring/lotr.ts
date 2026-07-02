// wiring/lotr.ts
// Per-app MCP wiring for the lotr connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { lotrBooks, lotrCharacters, lotrQuotes } from "../lotr-tool.js";

export const lotrHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // lotr-tool.ts
  lotr_books:              (args) => lotrBooks(args),
  lotr_characters:         (args) => lotrCharacters(args),
  lotr_quotes:             (args) => lotrQuotes(args),
};
