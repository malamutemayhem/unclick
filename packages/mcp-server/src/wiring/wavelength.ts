// wiring/wavelength.ts
// Per-app MCP wiring for the wavelength connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { wavelengthConvert } from "../wavelength-tool.js";

export const wavelengthTools = [
  // ── wavelength-tool.ts ────────────────────────────────────────────────────────
  {
    name: "wavelength_convert",
    description: "Convert between wavelength and frequency. Returns energy and EM spectrum band.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        wavelength_m: { type: "number" as const, description: "Wavelength in meters." },
        frequency_hz: { type: "number" as const, description: "Frequency in hertz." },
      },
    },
  },
] as const;

export const wavelengthHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wavelength-tool.ts
  wavelength_convert:        (args) => wavelengthConvert(args),
};
