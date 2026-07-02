// wiring/slug.ts
// Per-app MCP wiring for the slug connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { slugify } from "../slug-tool.js";

export const slugTools = [
  // ── slug-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "text_slugify",
    description: "Convert text into a URL-safe slug.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to slugify." },
        separator: { type: "string" as const, description: "Separator character (default -)." },
      }, required: ["text"],
    },
  },
] as const;

export const slugHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // slug-tool.ts
  text_slugify:              (args) => slugify(args),
};
