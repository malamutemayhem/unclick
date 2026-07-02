// wiring/convexhull.ts
// Per-app MCP wiring for the convexhull connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const convexhullTools = [
  // ── convexhull-tool.ts ──────────────────────────────────────────────────────
  {
    name: "convex_hull",
    description: "Compute the convex hull of 2D points with area and perimeter.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        points: { type: "array" as const, description: "Array of [x, y] coordinate pairs.", items: { type: "array" as const, items: { type: "number" as const } } },
      }, required: ["points"],
    },
  },] as const;
