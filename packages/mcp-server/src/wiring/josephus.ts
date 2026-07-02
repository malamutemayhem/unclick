// wiring/josephus.ts
// Per-app MCP wiring for the josephus connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const josephusTools = [
  // ── josephus-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "josephus",
    description: "Solve the Josephus problem: find the survivor in a circle of n people eliminating every k-th.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Number of people in the circle" },
        k: { type: "number", description: "Every k-th person is eliminated" },
      }, required: ["n", "k"],
    },
  },
] as const;
