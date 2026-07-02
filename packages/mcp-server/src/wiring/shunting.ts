// wiring/shunting.ts
// Per-app MCP wiring for the shunting connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const shuntingTools = [
  // ── shunting-tool.ts ──────────────────────────────────────────────────────
  {
    name: "shunting_yard",
    description: "Convert an infix math expression to postfix (RPN) and evaluate it.",
    inputSchema: {
      type: "object" as const,
      properties: {
        expression: { type: "string", description: "Infix math expression (e.g. '3 + 4 * 2')" },
      }, required: ["expression"],
    },
  },
] as const;
