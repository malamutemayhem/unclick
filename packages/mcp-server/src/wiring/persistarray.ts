// wiring/persistarray.ts
// Per-app MCP wiring for the persistarray connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const persistarrayTools = [
  // ── persistarray-tool.ts ─────────────────────────────────────────────────────
  {
    name: "persistent_array",
    description: "Persistent array with version-controlled get/set operations using a persistent segment tree.",
    inputSchema: {
      type: "object" as const,
      properties: {
        initial: { type: "array", items: { type: "number" }, description: "Initial array values" },
        operations: { type: "array", items: { type: "object" }, description: "Operations: {type:'get'|'set', version, index, value?}" },
      }, required: ["initial", "operations"],
    },
  },
] as const;
