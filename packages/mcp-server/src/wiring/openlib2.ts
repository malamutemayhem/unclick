// wiring/openlib2.ts
// Per-app MCP wiring for the openlib2 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { gutenbergSearch, gutenbergBook } from "../openlib2-tool.js";

export const openlib2Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openlib2-tool.ts
  gutenberg_search:        (args) => gutenbergSearch(args),
  gutenberg_book:          (args) => gutenbergBook(args),
};
