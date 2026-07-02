// wiring/carbonintensity.ts
// Per-app MCP wiring for the carbonintensity connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { carbonIntensityCurrent, carbonIntensityForecast, carbonIntensityGeneration } from "../carbonintensity-tool.js";

export const carbonintensityHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // carbonintensity-tool.ts
  carbon_intensity_current:  (args) => carbonIntensityCurrent(args),
  carbon_intensity_forecast: (args) => carbonIntensityForecast(args),
  carbon_intensity_generation: (args) => carbonIntensityGeneration(args),};
