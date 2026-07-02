// wiring/wordpress.ts
// Per-app MCP wiring for the wordpress connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { wordpressListPosts, wordpressGetPost, wordpressListPages } from "../wordpress-tool.js";

export const wordpressHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wordpress-tool.ts
  wordpress_list_posts:    (args) => wordpressListPosts(args),
  wordpress_get_post:      (args) => wordpressGetPost(args),
  wordpress_list_pages:    (args) => wordpressListPages(args),
};
