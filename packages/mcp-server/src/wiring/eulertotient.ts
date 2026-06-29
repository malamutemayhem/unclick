// wiring/eulertotient.ts
// Per-app MCP wiring for the eulertotient connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const eulertotientTools = [
  // ── eulertotient-tool.ts ─────────────────────────────────────────────────────
  {
    name: "euler_totient",
    description: "Compute Euler's totient function phi(n) - the count of integers up to n that are coprime with n.",
    inputSchema: {
      type: "object" as const,
      properties: {
        number: { type: "number", description: "Positive integer to compute totient for" },
      }, required: ["number"],
    },
  },
] as const;
