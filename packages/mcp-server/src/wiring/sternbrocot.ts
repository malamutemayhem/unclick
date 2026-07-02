// wiring/sternbrocot.ts
// Per-app MCP wiring for the sternbrocot connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const sternbrocotTools = [
  // ── sternbrocot-tool.ts ──────────────────────────────────────────────────────
  {
    name: "stern_brocot_tree",
    description: "Find best rational approximation using the Stern-Brocot tree and continued fractions.",
    inputSchema: {
      type: "object" as const,
      properties: {
        target: { type: "number", description: "Positive number to approximate" },
        max_denominator: { type: "number", description: "Maximum denominator allowed (default 1000)" },
      }, required: ["target"],
    },
  },
] as const;
