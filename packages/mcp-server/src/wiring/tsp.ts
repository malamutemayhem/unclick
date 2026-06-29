// wiring/tsp.ts
// Per-app MCP wiring for the tsp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const tspTools = [
  // ── tsp-tool.ts ────────────────────────────────────────────────────────────────
  {
    name: "tsp_solve",
    description: "Find a short tour visiting all cities and returning to start (traveling salesman, nearest-neighbor heuristic).",
    inputSchema: {
      type: "object" as const,
      properties: {
        cities: { type: "array", items: { type: "object", properties: { name: { type: "string" }, x: { type: "number" }, y: { type: "number" } }, required: ["name", "x", "y"] }, description: "Array of {name, x, y} city locations" },
      }, required: ["cities"],
    },
  },
] as const;
