// wiring/avltree.ts
// Per-app MCP wiring for the avltree connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const avltreeTools = [
  // ── avltree-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "avl_tree",
    description: "Build an AVL (self-balancing BST) from a list of keys. Returns inorder traversal, tree height, and optional key search results.",
    inputSchema: {
      type: "object" as const,
      properties: {
        keys: { type: "array", items: { type: "number" }, description: "Keys to insert into the AVL tree" },
        search_keys: { type: "array", items: { type: "number" }, description: "Optional keys to search for in the tree" },
      }, required: ["keys"],
    },
  },
] as const;
