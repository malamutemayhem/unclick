// wiring/fenwickrange.ts
// Per-app MCP wiring for the fenwickrange connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const fenwickrangeTools = [
  // ── fenwickrange-tool.ts ──────────────────────────────────────────────────
  {
    name: "fenwick_range",
    description: "Fenwick tree with range update and range query support using two BITs.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Initial array values" },
        operations: { type: "array", items: { type: "object" }, description: "Array of {type, left, right, value?} operations" },
      }, required: ["values", "operations"],
    },
  },
] as const;
