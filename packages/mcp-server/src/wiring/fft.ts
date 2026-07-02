// wiring/fft.ts
// Per-app MCP wiring for the fft connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const fftTools = [
  // ── fft-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "fft_transform",
    description: "Fast Fourier Transform (Cooley-Tukey radix-2) with optional inverse.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        signal: { type: "array" as const, description: "Array of real-valued samples.", items: { type: "number" as const } },
        inverse: { type: "boolean" as const, description: "Perform inverse FFT (default false)." },
      }, required: ["signal"],
    },
  },] as const;
