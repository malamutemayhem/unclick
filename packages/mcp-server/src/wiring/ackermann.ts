// wiring/ackermann.ts
// Per-app MCP wiring for the ackermann connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const ackermannTools = [
  // ── ackermann-tool.ts ─────────────────────────────────────────────────────
  {
    name: "ackermann",
    description: "Compute the Ackermann function A(m, n).",
    inputSchema: {
      type: "object" as const,
      properties: {
        m: { type: "number", description: "Non-negative integer m (max 4)" },
        n: { type: "number", description: "Non-negative integer n" },
      }, required: ["m", "n"],
    },
  },
] as const;
