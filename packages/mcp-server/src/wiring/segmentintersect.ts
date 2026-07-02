// wiring/segmentintersect.ts
// Per-app MCP wiring for the segmentintersect connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const segmentintersectTools = [
  // ── segmentintersect-tool.ts ────────────────────────────────────────────────
  {
    name: "segment_intersection",
    description: "Find all pairwise intersections among a set of 2D line segments, returning intersection points.",
    inputSchema: {
      type: "object" as const,
      properties: {
        segments: { type: "array", items: { type: "object", properties: { p1: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] }, p2: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] } }, required: ["p1", "p2"] }, description: "Array of line segments (max 1000)" },
      }, required: ["segments"],
    },
  },
] as const;
