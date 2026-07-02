// wiring/waveletfn.ts
// Per-app MCP wiring for the waveletfn connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const waveletfnTools = [
  // ── waveletfn-tool.ts ──────────────────────────────────────────────────────
  {
    name: "haar_wavelet",
    description: "Haar wavelet transform (forward and inverse) on a power-of-2 length array.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Input values (length must be power of 2)" },
        inverse: { type: "boolean", description: "Inverse transform (default false)" },
      }, required: ["values"],
    },
  },
] as const;
