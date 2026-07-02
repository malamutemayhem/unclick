// wiring/coda.ts
// Per-app MCP wiring for the coda connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { codaListDocs, codaListTables, codaListRows } from "../coda-tool.js";

export const codaTools = [
  // ── coda-tool.ts ──────────────────────────────────────────────────────────────
  { name: "coda_list_docs", description: "List your Coda docs.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_token: { type: "string", description: "Coda API token" },
    query: { type: "string", description: "Filter docs by name" },
    limit: { type: "number", description: "Docs to return (max 100, default 25)" },
  }, required: ["api_token"] } },
  { name: "coda_list_tables", description: "List the tables in a Coda doc.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_token: { type: "string", description: "Coda API token" },
    doc_id: { type: "string", description: "Coda doc id" },
  }, required: ["api_token", "doc_id"] } },
  { name: "coda_list_rows", description: "List rows in a Coda table.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_token: { type: "string", description: "Coda API token" },
    doc_id: { type: "string", description: "Coda doc id" },
    table_id: { type: "string", description: "Coda table id or name" },
    limit: { type: "number", description: "Rows to return (max 200, default 25)" },
  }, required: ["api_token", "doc_id", "table_id"] } },
] as const;

export const codaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // coda-tool.ts
  coda_list_docs:          (args) => codaListDocs(args),
  coda_list_tables:        (args) => codaListTables(args),
  coda_list_rows:          (args) => codaListRows(args),
};
