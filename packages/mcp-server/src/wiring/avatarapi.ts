// wiring/avatarapi.ts
// Per-app MCP wiring for the avatarapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { avatarUrl } from "../avatarapi-tool.js";

export const avatarapiTools = [
  // ── avatarapi-tool.ts ───────────────────────────────────────────────────────
  {
    name: "avatar_url",
    description: "Generate a text-based avatar image URL with initials.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Name for the avatar initials (default User)" },
        size: { type: "number", description: "Size in pixels (default 200)" },
        background: { type: "string", description: "Background hex color or 'random'" },
        color: { type: "string", description: "Text hex color (default fff)" },
        format: { type: "string", description: "Format: svg or png (default svg)" },
      },
    },
  },
] as const;

export const avatarapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // avatarapi-tool.ts
  avatar_url:              (args) => avatarUrl(args),
};
