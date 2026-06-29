// wiring/babygiant.ts
// Per-app MCP wiring for the babygiant connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const babygiantTools = [
  // ── babygiant-tool.ts ───────────────────────────────────────────────────────
  {
    name: "baby_giant_step",
    description: "Solve the discrete logarithm problem (find x such that base^x = target mod modulus) using baby-step giant-step.",
    inputSchema: {
      type: "object" as const,
      properties: {
        base: { type: "number", description: "Base of the exponentiation" },
        target: { type: "number", description: "Target value" },
        modulus: { type: "number", description: "Modulus (max 1,000,000,000)" },
      }, required: ["base", "target", "modulus"],
    },
  },
] as const;
