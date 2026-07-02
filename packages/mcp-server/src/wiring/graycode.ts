// wiring/graycode.ts
// Per-app MCP wiring for the graycode connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const graycodeTools = [
  // ── graycode-tool.ts ───────────────────────────────────────────────────────
  {
    name: "gray_code",
    description: "Convert between binary and Gray code, or generate n-bit Gray code sequences.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Bit width (1-20)" },
        value: { type: "number", description: "Optional value to convert (omit for full sequence)" },
        to_gray: { type: "boolean", description: "If true convert binary to Gray; if false convert Gray to binary (default true)" },
      }, required: ["n"],
    },
  },
] as const;
