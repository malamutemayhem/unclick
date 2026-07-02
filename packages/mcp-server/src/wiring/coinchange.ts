// wiring/coinchange.ts
// Per-app MCP wiring for the coinchange connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const coinchangeTools = [
  // ── coinchange-tool.ts ─────────────────────────────────────────────────────
  {
    name: "coin_change",
    description: "Compute minimum coins for a target amount and count distinct combinations.",
    inputSchema: {
      type: "object" as const,
      properties: {
        coins: { type: "array", items: { type: "number" }, description: "Coin denominations" },
        amount: { type: "number", description: "Target amount (max 1,000,000)" },
      }, required: ["coins", "amount"],
    },
  },
] as const;
