// wiring/instapaper.ts
// Per-app MCP wiring for the instapaper connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity

import { instapaperAction } from "../instapaper-tool.js";

export const instapaperTools = [
  // ── instapaper-tool.ts ───────────────────────────────────────────────────────
  {
    name: "instapaper_action",
    description: "Perform an Instapaper action: get_instapaper_bookmarks, add_instapaper_bookmark, archive_bookmark, delete_bookmark, get_instapaper_folders.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        username: { type: "string" },
        password: { type: "string" },
        bookmark_id: { type: "number" },
        url: { type: "string" },
        title: { type: "string" },
        folder_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["action"],
    },
  },
] as const;

export const instapaperHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // instapaper-tool.ts
  instapaper_action:       (args) => instapaperAction(String(args.action ?? ""), args),
};
