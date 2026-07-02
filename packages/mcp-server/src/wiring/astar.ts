// wiring/astar.ts
// Per-app MCP wiring for the astar connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const astarTools = [
  // ── astar-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "astar_path",
    description: "Find the shortest path on a 2D grid using the A* algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        grid: { type: "array", items: { type: "array", items: { type: "number" } }, description: "2D grid (0 = passable, 1 = wall)" },
        start: { type: "array", items: { type: "number" }, description: "[row, col] start position" },
        end: { type: "array", items: { type: "number" }, description: "[row, col] end position" },
        diagonal: { type: "boolean", description: "Allow diagonal movement (default true)" },
      }, required: ["grid", "start", "end"],
    },
  },
] as const;
