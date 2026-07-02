// wiring/imgflip.ts
// Per-app MCP wiring for the imgflip connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { imgflipGetMemes } from "../imgflip-tool.js";

export const imgflipTools = [
  // ── imgflip-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "imgflip_get_memes",
    description: "Get the top 100 popular meme templates from Imgflip.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const imgflipHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // imgflip-tool.ts
  imgflip_get_memes:         (args) => imgflipGetMemes(args),};
