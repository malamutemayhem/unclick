// wiring/convexhull3d.ts
// Per-app MCP wiring for the convexhull3d connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const convexhull3dTools = [
  // ── convexhull3d-tool.ts ───────────────────────────────────────────────────
  {
    name: "convex_hull_3d",
    description: "Compute the 3D convex hull of a point set, returning triangular faces.",
    inputSchema: {
      type: "object" as const,
      properties: {
        points: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Array of [x,y,z] points (at least 4)" },
      }, required: ["points"],
    },
  },
] as const;
