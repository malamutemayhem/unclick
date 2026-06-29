// wiring/onedrive.ts
// Per-app MCP wiring for the onedrive connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { onedriveList, onedriveSearch, onedriveRead } from "../onedrive-tool.js";

export const onedriveHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // onedrive-tool.ts
  onedrive_list:           (args) => onedriveList(args),
  onedrive_search:         (args) => onedriveSearch(args),
  onedrive_read:           (args) => onedriveRead(args),
};
