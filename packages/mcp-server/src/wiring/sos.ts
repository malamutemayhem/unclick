// wiring/sos.ts
// Per-app MCP wiring for the sos connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const sosTools = [
  // ── sos-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "sos_dp",
    description: "Sum over Subsets (SOS) dynamic programming / zeta transform on bitmasks.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Array of values indexed by bitmask (length must be power of 2)" },
        direction: { type: "string", description: "subset_sum or superset_sum (default: superset_sum)" },
      }, required: ["values"],
    },
  },
] as const;
