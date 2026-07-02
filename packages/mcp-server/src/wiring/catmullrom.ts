// wiring/catmullrom.ts
// Per-app MCP wiring for the catmullrom connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const catmullromTools = [
  // ── catmullrom-tool.ts ────────────────────────────────────────────────────
  {
    name: "catmull_rom",
    description: "Evaluate a Catmull-Rom spline through control points at given parameter values.",
    inputSchema: {
      type: "object" as const,
      properties: {
        points: { type: "array", items: { type: "array" }, description: "Control points as [x,y] pairs (min 4)" },
        t_values: { type: "array", items: { type: "number" }, description: "Parameter values 0-1 to evaluate" },
        alpha: { type: "number", description: "Alpha parameter (0=uniform, 0.5=centripetal, 1=chordal; default 0.5)" },
      }, required: ["points", "t_values"],
    },
  },
] as const;
