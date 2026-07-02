// wiring/sparsetable.ts
// Per-app MCP wiring for the sparsetable connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const sparsetableTools = [
  // ── sparsetable-tool.ts ─────────────────────────────────────────────────────
  {
    name: "sparse_table",
    description: "Build a sparse table for O(1) range minimum or maximum queries on a static array.",
    inputSchema: {
      type: "object" as const,
      properties: {
        array: { type: "array", items: { type: "number" }, description: "Array of numbers" },
        queries: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Range queries as [left, right] pairs (inclusive)" },
        mode: { type: "string", enum: ["min", "max"], description: "Query mode: 'min' or 'max' (default: min)" },
      }, required: ["array"],
    },
  },
] as const;
