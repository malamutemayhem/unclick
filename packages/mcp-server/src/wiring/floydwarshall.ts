// wiring/floydwarshall.ts
// Per-app MCP wiring for the floydwarshall connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const floydwarshallTools = [
  // ── floydwarshall-tool.ts ──────────────────────────────────────────────────────
  {
    name: "floyd_warshall",
    description: "Compute all-pairs shortest paths using Floyd-Warshall.",
    inputSchema: {
      type: "object" as const,
      properties: {
        edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" }, weight: { type: "number" } }, required: ["from", "to", "weight"] }, description: "Array of weighted edges" },
        directed: { type: "boolean", description: "Treat as directed graph (default true)" },
      }, required: ["edges"],
    },
  },
] as const;
