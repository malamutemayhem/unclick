// wiring/rbtree.ts
// Per-app MCP wiring for the rbtree connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const rbtreeTools = [
  // ── rbtree-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "rb_tree_sim",
    description: "Build a red-black tree from a list of keys. Returns inorder traversal, tree height, black height, and validity check.",
    inputSchema: {
      type: "object" as const,
      properties: {
        keys: { type: "array", items: { type: "number" }, description: "Keys to insert into the red-black tree" },
      }, required: ["keys"],
    },
  },
] as const;
