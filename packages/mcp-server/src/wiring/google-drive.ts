// wiring/google-drive.ts
// Per-app MCP wiring for the google-drive connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { driveSearch, driveRead } from "../google-drive-tool.js";

export const googleDriveTools = [
  // ── google-drive-tool.ts ──────────────────────────────────────────────────────
  { name: "drive_search", description: "Search or list Google Drive files in the connected account.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Google Drive access token" },
    query: { type: "string", description: "File-name search text" },
    q: { type: "string", description: "Advanced Drive query string" },
    limit: { type: "number", description: "Files to return (max 100, default 20)" },
    page_token: { type: "string", description: "Drive page token from a previous response" },
  } } },
  { name: "drive_read", description: "Read Google Drive file metadata and a safe text preview when available.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Google Drive access token" },
    file_id: { type: "string", description: "Google Drive file id" },
  }, required: ["file_id"] } },
] as const;

export const googleDriveHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // google-drive-tool.ts
  drive_search:            (args) => driveSearch(args),
  drive_read:              (args) => driveRead(args),
};
