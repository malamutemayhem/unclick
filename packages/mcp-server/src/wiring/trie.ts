// wiring/trie.ts
// Per-app MCP wiring for the trie connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const trieTools = [
  // ── trie-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "trie_ops",
    description: "Build a trie (prefix tree) from words and perform search, prefix count, and autocomplete queries.",
    inputSchema: {
      type: "object" as const,
      properties: {
        words: { type: "array", items: { type: "string" }, description: "Words to insert into the trie" },
        queries: { type: "array", items: { type: "string" }, description: "Words to search for (exact match and prefix count)" },
        prefix: { type: "string", description: "Prefix for autocomplete suggestions" },
      }, required: ["words"],
    },
  },
] as const;
