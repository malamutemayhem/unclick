// wiring/securitypass.ts
// Per-app MCP wiring for the securitypass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: SecurityPass (scope-gated security receipts)

import { securitypassDisclosureStatus, securitypassFindingDetail, securitypassRegisterPack, securitypassReport, securitypassRun, securitypassStatus, securitypassVerifyScope } from "../securitypass-tool.js";

export const securitypassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // securitypass-tool.ts
  securitypass_run:               (args) => securitypassRun(args),
  securitypass_status:            (args) => securitypassStatus(args),
  securitypass_report:            (args) => securitypassReport(args),
  securitypass_register_pack:     (args) => securitypassRegisterPack(args),
  securitypass_verify_scope:      (args) => securitypassVerifyScope(args),
  securitypass_disclosure_status: (args) => securitypassDisclosureStatus(args),
  securitypass_finding_detail:    (args) => securitypassFindingDetail(args),
};
