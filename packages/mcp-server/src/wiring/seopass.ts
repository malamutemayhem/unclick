// wiring/seopass.ts
// Per-app MCP wiring for the seopass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: SEOPass (search visibility QC, sister to UXPass)

import { seopassRun, seopassStatus, seopassRegisterPack, seopassLighthousePlan } from "../seopass-tool.js";

export const seopassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // seopass-tool.ts
  seopass_run:             (args) => seopassRun(args),
  seopass_status:          (args) => seopassStatus(args),
  seopass_register_pack:   (args) => seopassRegisterPack(args),
  seopass_lighthouse_plan: (args) => seopassLighthousePlan(args),
};
