// wiring/uxpass.ts
// Per-app MCP wiring for the uxpass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: UXPass (sister to TestPass, journey/usability QC)

import { uxpassRun, uxpassStatus, uxpassReportHtml, uxpassReportJson, uxpassReportMd, uxpassRegisterPack } from "../uxpass-tool.js";

export const uxpassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // uxpass-tool.ts
  uxpass_run:           (args) => uxpassRun(args),
  uxpass_status:        (args) => uxpassStatus(args),
  uxpass_report_html:   (args) => uxpassReportHtml(args),
  uxpass_report_json:   (args) => uxpassReportJson(args),
  uxpass_report_md:     (args) => uxpassReportMd(args),
  uxpass_register_pack: (args) => uxpassRegisterPack(args),
};
