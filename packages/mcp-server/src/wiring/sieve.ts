// wiring/sieve.ts
// Per-app MCP wiring for the sieve connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const sieveTools = [
  // ── sieve-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "sieve_of_eratosthenes",
    description: "Generate all prime numbers up to N using the Sieve of Eratosthenes algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Upper bound (inclusive), must be >= 2 and <= 10,000,000" },
      }, required: ["n"],
    },
  },
] as const;
