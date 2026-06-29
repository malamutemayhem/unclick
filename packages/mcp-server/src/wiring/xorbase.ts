// wiring/xorbase.ts
// Per-app MCP wiring for the xorbase connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const xorbaseTools = [
  // ── xorbase-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "xor_basis",
    description: "Compute a linear basis over GF(2) (XOR basis) for a set of integers.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Array of non-negative integers" },
      }, required: ["values"],
    },
  },
] as const;
