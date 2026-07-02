// wiring/pollardrho.ts
// Per-app MCP wiring for the pollardrho connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const pollardrhoTools = [
  // ── pollardrho-tool.ts ──────────────────────────────────────────────────────
  {
    name: "pollard_rho",
    description: "Factor an integer using Pollard's rho with Miller-Rabin primality testing.",
    inputSchema: {
      type: "object" as const,
      properties: {
        value: { type: "number", description: "Positive integer to factor" },
      }, required: ["value"],
    },
  },
] as const;
