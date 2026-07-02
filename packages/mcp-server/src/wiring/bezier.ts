// wiring/bezier.ts
// Per-app MCP wiring for the bezier connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bezierTools = [
  // ── bezier-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bezier_curve",
    description: "Compute a Bezier curve from control points with arc length and optional evaluation.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        control_points: { type: "array" as const, description: "Array of [x, y] control points (at least 2).", items: { type: "array" as const, items: { type: "number" as const } } },
        steps: { type: "number" as const, description: "Number of curve samples (default 50, max 1000)." },
        eval_at: { description: "t value(s) in [0,1] to evaluate at. Number or array of numbers." },
      }, required: ["control_points"],
    },
  },] as const;
