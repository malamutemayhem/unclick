// wiring/geopass.ts
// Per-app MCP wiring for the geopass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: GEOPass (AI answer-engine readiness QC, sister to SEOPass)

import { geopassRun, geopassStatus } from "../geopass-tool.js";

export const geopassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // geopass-tool.ts
  geopass_run:             (args) => geopassRun(args),
  geopass_status:          (args) => geopassStatus(args),
};
