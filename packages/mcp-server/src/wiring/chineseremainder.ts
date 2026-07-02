// wiring/chineseremainder.ts
// Per-app MCP wiring for the chineseremainder connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const chineseremainderTools = [
  // ── chineseremainder-tool.ts ──────────────────────────────────────────────
  {
    name: "chinese_remainder",
    description: "Solve simultaneous congruences using the generalised Chinese Remainder Theorem.",
    inputSchema: {
      type: "object" as const,
      properties: {
        remainders: { type: "array", items: { type: "number" }, description: "Array of remainders" },
        moduli: { type: "array", items: { type: "number" }, description: "Array of moduli (positive integers)" },
      }, required: ["remainders", "moduli"],
    },
  },
] as const;
