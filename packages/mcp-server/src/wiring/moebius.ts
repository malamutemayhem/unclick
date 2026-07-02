// wiring/moebius.ts
// Per-app MCP wiring for the moebius connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const moebiusTools = [
  // ── moebius-tool.ts ────────────────────────────────────────────────────────
  {
    name: "moebius_function",
    description: "Compute Moebius function values and Mertens function using linear sieve.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Positive integer upper bound (max 10,000,000)" },
      }, required: ["n"],
    },
  },
] as const;
