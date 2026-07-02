// wiring/rle2.ts
// Per-app MCP wiring for the rle2 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const rle2Tools = [
  // ── rle2-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "rle_encode_decode",
    description: "Run-length encode a numeric array into runs, or decode runs back to a numeric array.",
    inputSchema: {
      type: "object" as const,
      properties: {
        operation: { type: "string", enum: ["encode", "decode"], description: "Operation (default encode)" },
        data: { type: "array", items: { type: "number" }, description: "Numeric array to encode" },
        runs: { type: "array", items: { type: "object", properties: { value: { type: "number" }, count: { type: "integer" } } }, description: "Runs to decode" },
      }, required: ["operation"],
    },
  },
] as const;
