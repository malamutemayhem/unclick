// wiring/flowpass.ts
// Per-app MCP wiring for the flowpass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: FlowPass (journey completion QC, sister to UXPass)

import { flowpassDisagreementQueue, flowpassQuarantine, flowpassRecord, flowpassRegisterPack, flowpassReport, flowpassRun, flowpassStatus } from "../flowpass-tool.js";

export const flowpassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // flowpass-tool.ts
  flowpass_run:                (args) => flowpassRun(args),
  flowpass_status:             (args) => flowpassStatus(args),
  flowpass_report:             (args) => flowpassReport(args),
  flowpass_register_pack:      (args) => flowpassRegisterPack(args),
  flowpass_record:             (args) => flowpassRecord(args),
  flowpass_quarantine:         (args) => flowpassQuarantine(args),
  flowpass_disagreement_queue: (args) => flowpassDisagreementQueue(args),
};
