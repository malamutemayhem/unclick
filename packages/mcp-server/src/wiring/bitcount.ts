// wiring/bitcount.ts
// Per-app MCP wiring for the bitcount connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bitcountTools = [
  // ── bitcount-tool.ts ────────────────────────────────────────────────────────
  {
    name: "bit_count",
    description: "Count set bits (popcount), total bits, and convert between decimal, binary, hex, and octal. Detects powers of two.",
    inputSchema: {
      type: "object" as const,
      properties: {
        value: { type: "string", description: "Integer or binary/hex string (e.g. 42, 0xFF, 0b1010)" },
      }, required: ["value"],
    },
  },
] as const;
