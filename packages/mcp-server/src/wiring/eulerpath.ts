// wiring/eulerpath.ts
// Per-app MCP wiring for the eulerpath connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const eulerpathTools = [
  // ── eulerpath-tool.ts ────────────────────────────────────────────────────────
  {
    name: "euler_path",
    description: "Check whether a graph has an Eulerian path or circuit. Reports degree analysis and start/end vertices.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertices: { type: "number", description: "Number of vertices (0-indexed)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [u, v] pairs" },
        directed: { type: "boolean", description: "Whether the graph is directed (default: false)" },
      }, required: ["vertices", "edges"],
    },
  },
] as const;
