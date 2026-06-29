// wiring/extgcd.ts
// Per-app MCP wiring for the extgcd connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const extgcdTools = [
  // ── extgcd-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "extended_gcd",
    description: "Compute the extended GCD of two integers, returning Bezout coefficients and optionally the modular inverse.",
    inputSchema: {
      type: "object" as const,
      properties: {
        a: { type: "number", description: "First integer" },
        b: { type: "number", description: "Second integer" },
      }, required: ["a", "b"],
    },
  },
] as const;
