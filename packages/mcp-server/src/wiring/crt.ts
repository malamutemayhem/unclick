// wiring/crt.ts
// Per-app MCP wiring for the crt connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const crtTools = [
  // ── crt-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "chinese_remainder_theorem",
    description: "Solve a system of simultaneous congruences using the Chinese Remainder Theorem.",
    inputSchema: {
      type: "object" as const,
      properties: {
        remainders: { type: "array", items: { type: "number" }, description: "Remainders for each congruence" },
        moduli: { type: "array", items: { type: "number" }, description: "Moduli for each congruence" },
      }, required: ["remainders", "moduli"],
    },
  },
] as const;
