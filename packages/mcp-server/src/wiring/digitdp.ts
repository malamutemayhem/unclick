// wiring/digitdp.ts
// Per-app MCP wiring for the digitdp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const digitdpTools = [
  // ── digitdp-tool.ts ───────────────────────────────────────────────────────
  {
    name: "digit_dp",
    description: "Count integers from 1 to N whose digit sum equals a target value using digit DP.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Upper bound (positive integer, max 1e15)" },
        target_digit_sum: { type: "number", description: "Target digit sum (0-135)" },
      }, required: ["n", "target_digit_sum"],
    },
  },
] as const;
