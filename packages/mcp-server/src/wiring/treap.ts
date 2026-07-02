// wiring/treap.ts
// Per-app MCP wiring for the treap connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const treapTools = [
  // ── treap-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "treap_sim",
    description: "Simulate a treap (randomized BST): insert values, get sorted output, tree height, and search.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Values to insert" },
        search: { type: "array", items: { type: "number" }, description: "Values to search for" },
      }, required: ["values"],
    },
  },
] as const;
