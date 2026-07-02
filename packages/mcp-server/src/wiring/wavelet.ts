// wiring/wavelet.ts
// Per-app MCP wiring for the wavelet connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const waveletTools = [
  // ── wavelet-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "wavelet_tree",
    description: "Build a wavelet tree for an integer array and answer range kth-smallest queries.",
    inputSchema: {
      type: "object" as const,
      properties: {
        array: { type: "array", items: { type: "number" }, description: "Array of integers (max 100,000)" },
        queries: { type: "array", items: { type: "object", properties: { type: { type: "string" }, l: { type: "number" }, r: { type: "number" }, k: { type: "number" } }, required: ["type", "l", "r"] }, description: "Queries: {type:'kth', l, r, k} for kth smallest in [l, r)" },
      }, required: ["array"],
    },
  },
] as const;
