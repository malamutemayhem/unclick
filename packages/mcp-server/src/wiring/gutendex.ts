// wiring/gutendex.ts
// Per-app MCP wiring for the gutendex connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { gutendexSearch, gutendexBook } from "../gutendex-tool.js";

export const gutendexTools = [
  // ── gutendex-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "gutendex_search",
    description: "Search Project Gutenberg free ebooks.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search query." },
        page: { type: "number" as const, description: "Page number." },
      }, required: ["query"],
    },
  },
  {
    name: "gutendex_book",
    description: "Get details for a Project Gutenberg book by ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Gutenberg book ID." },
      }, required: ["id"],
    },
  },
] as const;

export const gutendexHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gutendex-tool.ts
  gutendex_search:           (args) => gutendexSearch(args),
  gutendex_book:             (args) => gutendexBook(args),
};
