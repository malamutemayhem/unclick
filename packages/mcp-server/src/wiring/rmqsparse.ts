// wiring/rmqsparse.ts
// Per-app MCP wiring for the rmqsparse connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const rmqsparseTools = [
  // ── rmqsparse-tool.ts ─────────────────────────────────────────────────────
  {
    name: "rmq_sparse",
    description: "Build a sparse table for O(1) range minimum/maximum queries.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Input array" },
        queries: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Array of [left, right] pairs" },
        mode: { type: "string", description: "\"min\" or \"max\" (default min)" },
      }, required: ["values", "queries"],
    },
  },
] as const;
