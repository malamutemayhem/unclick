// wiring/millerrabin.ts
// Per-app MCP wiring for the millerrabin connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const millerrabinTools = [
  // ── millerrabin-tool.ts ─────────────────────────────────────────────────────
  {
    name: "miller_rabin_test",
    description: "Test whether a number is prime using the deterministic Miller-Rabin primality test with multiple witnesses.",
    inputSchema: {
      type: "object" as const,
      properties: {
        number: { type: "number", description: "The number to test for primality (up to 10^18)" },
      }, required: ["number"],
    },
  },
] as const;
