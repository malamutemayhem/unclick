// wiring/spline.ts
// Per-app MCP wiring for the spline connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const splineTools = [
  // ── spline-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "spline_interpolate",
    description: "Natural cubic spline interpolation through data points, with optional evaluation.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        points: { type: "array" as const, description: "Array of [x, y] data points (at least 3, distinct x).", items: { type: "array" as const, items: { type: "number" as const } } },
        eval_at: { description: "X value(s) to evaluate the spline at. Number or array of numbers." },
      }, required: ["points"],
    },
  },
] as const;
