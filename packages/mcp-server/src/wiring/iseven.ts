// wiring/iseven.ts
// Per-app MCP wiring for the iseven connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { isEven } from "../iseven-tool.js";

export const isevenTools = [
  // ── iseven-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "is_even",
    description: "Check whether a number is even, via the isEven API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        number: { type: "number", description: "The number to check" },
      },
      required: ["number"],
    },
  },

  // ── iceandfire-tool.ts (Game of Thrones / ASOIAF) ──────────────────────────
  {
    name: "iceandfire_characters",
    description: "Search characters from A Song of Ice and Fire (Game of Thrones).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search for" },
        limit: { type: "number", description: "Results per page (default 10)" },
      },
    },
  },
  {
    name: "iceandfire_books",
    description: "List or search books in the A Song of Ice and Fire series.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Book title to search for" },
      },
    },
  },
  {
    name: "iceandfire_houses",
    description: "Search noble houses from A Song of Ice and Fire (Game of Thrones).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "House name to search for" },
        limit: { type: "number", description: "Results per page (default 10)" },
      },
    },
  },
] as const;

export const isevenHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // iseven-tool.ts
  is_even:                 (args) => isEven(args),
};
