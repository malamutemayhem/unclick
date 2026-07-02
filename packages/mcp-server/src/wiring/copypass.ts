// wiring/copypass.ts
// Per-app MCP wiring for the copypass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: CopyPass (copy quality QC, sister to SecurityPass)

import { copypassRun, copypassStatus } from "../copypass-tool.js";

export const copypassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // copypass-tool.ts
  copypass_run:            (args) => copypassRun(args),
  copypass_status:         (args) => copypassStatus(args),
};
