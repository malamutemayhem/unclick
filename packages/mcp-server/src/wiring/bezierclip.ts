// wiring/bezierclip.ts
// Per-app MCP wiring for the bezierclip connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bezierclipTools = [
  // ── bezierclip-tool.ts ─────────────────────────────────────────────────────
  {
    name: "bezier_clip",
    description: "Extract a Bezier sub-curve for a parameter range using de Casteljau subdivision.",
    inputSchema: {
      type: "object" as const,
      properties: {
        control_points: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Array of [x,y] control points" },
        t_start: { type: "number", description: "Start parameter (0-1)" },
        t_end: { type: "number", description: "End parameter (0-1)" },
      }, required: ["control_points", "t_start", "t_end"],
    },
  },
] as const;
