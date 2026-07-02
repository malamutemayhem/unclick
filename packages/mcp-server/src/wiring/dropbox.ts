// wiring/dropbox.ts
// Per-app MCP wiring for the dropbox connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { dropboxListFolder, dropboxSearch, dropboxGetAccount } from "../dropbox-tool.js";

export const dropboxHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dropbox-tool.ts
  dropbox_list_folder:     (args) => dropboxListFolder(args),
  dropbox_search:          (args) => dropboxSearch(args),
  dropbox_get_account:     (args) => dropboxGetAccount(args),
};
