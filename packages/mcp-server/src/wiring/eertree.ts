// wiring/eertree.ts
// Per-app MCP wiring for the eertree connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const eertreeTools = [
  // ── eertree-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "eertree",
    description: "Build a palindromic tree (eertree) to count distinct palindromic substrings.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string to analyse" },
      }, required: ["text"],
    },
  },
] as const;
