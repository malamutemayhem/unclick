// wiring/gmail.ts
// Per-app MCP wiring for the gmail connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { gmailSearch, gmailRead, gmailSend } from "../gmail-tool.js";

export const gmailHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gmail-tool.ts
  gmail_search:            (args) => gmailSearch(args),
  gmail_read:              (args) => gmailRead(args),
  gmail_send:              (args) => gmailSend(args),
};
