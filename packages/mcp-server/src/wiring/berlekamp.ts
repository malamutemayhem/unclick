// wiring/berlekamp.ts
// Per-app MCP wiring for the berlekamp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const berlekampTools = [
  // ── berlekamp-tool.ts ───────────────────────────────────────────────────────
  {
    name: "berlekamp_massey",
    description: "Find the shortest linear recurrence for a sequence using Berlekamp-Massey.",
    inputSchema: {
      type: "object" as const,
      properties: {
        sequence: { type: "array", items: { type: "number" }, description: "Input sequence of integers" },
      }, required: ["sequence"],
    },
  },
] as const;
