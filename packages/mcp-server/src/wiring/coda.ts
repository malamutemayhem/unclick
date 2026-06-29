// wiring/coda.ts
// Per-app MCP wiring for the coda connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { codaListDocs, codaListTables, codaListRows } from "../coda-tool.js";

export const codaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // coda-tool.ts
  coda_list_docs:          (args) => codaListDocs(args),
  coda_list_tables:        (args) => codaListTables(args),
  coda_list_rows:          (args) => codaListRows(args),
};
