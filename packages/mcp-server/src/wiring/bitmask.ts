// wiring/bitmask.ts
// Per-app MCP wiring for the bitmask connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bitmaskTools = [
  // ── bitmask-tool.ts ───────────────────────────────────────────────────────
  {
    name: "bitmask_ops",
    description: "Bitmask operations: info, submasks, supersets, next permutation, enumerate set bits.",
    inputSchema: {
      type: "object" as const,
      properties: {
        mask: { type: "number", description: "Non-negative integer bitmask" },
        operation: { type: "string", description: "Operation: info, submasks, supersets, next_permutation, or enumerate" },
        universe: { type: "number", description: "Universe mask for supersets operation" },
      }, required: ["mask", "operation"],
    },
  },
] as const;
