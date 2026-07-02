// wiring/compliancepass.ts
// Per-app MCP wiring for the compliancepass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: CompliancePass (public name for EnterprisePass readiness)

import { compliancepassRun, compliancepassStatus, compliancepassReportJson, compliancepassReportMd } from "../compliancepass-tool.js";

export const compliancepassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // compliancepass-tool.ts
  compliancepass_run:         (args) => compliancepassRun(args),
  compliancepass_status:      (args) => compliancepassStatus(args),
  compliancepass_report_json: (args) => compliancepassReportJson(args),
  compliancepass_report_md:   (args) => compliancepassReportMd(args),
};
