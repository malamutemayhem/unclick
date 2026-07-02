// wiring/ghost.ts
// Per-app MCP wiring for the ghost connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { ghostListPosts, ghostListPages, ghostListTags } from "../ghost-tool.js";

export const ghostHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ghost-tool.ts
  ghost_list_posts:        (args) => ghostListPosts(args),
  ghost_list_pages:        (args) => ghostListPages(args),
  ghost_list_tags:         (args) => ghostListTags(args),
};
