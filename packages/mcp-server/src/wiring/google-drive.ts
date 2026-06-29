// wiring/google-drive.ts
// Per-app MCP wiring for the google-drive connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { driveSearch, driveRead } from "../google-drive-tool.js";

export const googleDriveHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // google-drive-tool.ts
  drive_search:            (args) => driveSearch(args),
  drive_read:              (args) => driveRead(args),
};
