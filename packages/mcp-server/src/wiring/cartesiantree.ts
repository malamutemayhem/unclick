// wiring/cartesiantree.ts
// Per-app MCP wiring for the cartesiantree connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const cartesiantreeTools = [
  // ── cartesiantree-tool.ts ─────────────────────────────────────────────────────
  {
    name: "cartesian_tree",
    description: "Build a Cartesian tree from an array (min-heap ordered with BST on indices).",
    inputSchema: {
      type: "object" as const,
      properties: {
        array: { type: "array", items: { type: "number" }, description: "Input array of numbers" },
      }, required: ["array"],
    },
  },
] as const;
