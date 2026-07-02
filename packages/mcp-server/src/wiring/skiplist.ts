// wiring/skiplist.ts
// Per-app MCP wiring for the skiplist connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const skiplistTools = [
  // ── skiplist-tool.ts ────────────────────────────────────────────────────────
  {
    name: "skip_list_sim",
    description: "Simulate a skip list: insert values, get sorted output, and search for elements in O(log n) expected time.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Values to insert" },
        search: { type: "array", items: { type: "number" }, description: "Values to search for" },
      }, required: ["values"],
    },
  },
] as const;
