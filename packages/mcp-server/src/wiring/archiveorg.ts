// wiring/archiveorg.ts
// Per-app MCP wiring for the archiveorg connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { archiveSearch, archiveMetadata } from "../archiveorg-tool.js";

export const archiveorgTools = [
  // ── archiveorg-tool.ts ─────────────────────────────────────────────────────
  {
    name: "archive_search",
    description: "Search the Internet Archive (archive.org) for items.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query" },
        mediatype: { type: "string", description: "Filter: texts, audio, movies, software, image, collection" },
        limit: { type: "number", description: "Results per page (max 20, default 10)" },
        page: { type: "number", description: "Page number (default 1)" },
      },
      required: ["query"],
    },
  },
  {
    name: "archive_metadata",
    description: "Get metadata for an Internet Archive item by identifier.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { identifier: { type: "string", description: "Archive.org item identifier" } },
      required: ["identifier"],
    },
  },
] as const;

export const archiveorgHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // archiveorg-tool.ts
  archive_search:          (args) => archiveSearch(args),
  archive_metadata:        (args) => archiveMetadata(args),
};
