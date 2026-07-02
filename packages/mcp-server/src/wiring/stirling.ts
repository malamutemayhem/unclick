// wiring/stirling.ts
// Per-app MCP wiring for the stirling connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const stirlingTools = [
  // ── stirling-tool.ts ────────────────────────────────────────────────────────
  {
    name: "stirling_numbers",
    description: "Compute Stirling numbers of the first or second kind via DP.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "n (0-200)" },
        k: { type: "number", description: "k (0-n)" },
        kind: { type: "number", description: "1 or 2 (default 2)" },
      }, required: ["n", "k"],
    },
  },
] as const;
