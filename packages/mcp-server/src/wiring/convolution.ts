// wiring/convolution.ts
// Per-app MCP wiring for the convolution connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const convolutionTools = [
  // ── convolution-tool.ts ─────────────────────────────────────────────────────
  {
    name: "convolution",
    description: "Compute discrete convolution of a signal with a kernel. Supports full, same, and valid modes.",
    inputSchema: {
      type: "object" as const,
      properties: {
        signal: { type: "array", items: { type: "number" }, description: "Input signal array" },
        kernel: { type: "array", items: { type: "number" }, description: "Convolution kernel array" },
        mode: { type: "string", enum: ["full", "same", "valid"], description: "Output mode (default full)" },
      }, required: ["signal", "kernel"],
    },
  },
] as const;
