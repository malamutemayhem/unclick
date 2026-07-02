// wiring/fidelitycopy.ts
// Per-app MCP wiring for the fidelitycopy connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: FidelityCopy / FidelityPass (deterministic preserve-lane receipts)

import { fidelitycopyCopy, fidelitypassVerifyCopy } from "../fidelitycopy-tool.js";

export const fidelitycopyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // fidelitycopy-tool.ts
  fidelitycopy_copy:       (args) => fidelitycopyCopy(args),
  fidelitypass_verify_copy:(args) => fidelitypassVerifyCopy(args),
};
