// wiring/supercell.ts
// Per-app MCP wiring for the supercell connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { cocPlayer, cocClan, cocClanMembers, crPlayer, crTopPlayers, bsPlayer, bsClub } from "../supercell-tool.js";

export const supercellTools = [
  // ── supercell-tool.ts ────────────────────────────────────────────────────────
  {
    name: "coc_player",
    description: "Get a Clash of Clans player by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        playerTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["playerTag"],
    },
  },
  {
    name: "coc_clan",
    description: "Get a Clash of Clans clan by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        clanTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["clanTag"],
    },
  },
  {
    name: "coc_clan_members",
    description: "Get members of a Clash of Clans clan.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        clanTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["clanTag"],
    },
  },
  {
    name: "cr_player",
    description: "Get a Clash Royale player by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        playerTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["playerTag"],
    },
  },
  {
    name: "cr_top_players",
    description: "Get top Clash Royale players globally or by location.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        locationId: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "bs_player",
    description: "Get a Brawl Stars player by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        playerTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["playerTag"],
    },
  },
  {
    name: "bs_club",
    description: "Get a Brawl Stars club by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        clubTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["clubTag"],
    },
  },
] as const;

export const supercellHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // supercell-tool.ts
  coc_player:           (args) => cocPlayer(args),
  coc_clan:             (args) => cocClan(args),
  coc_clan_members:     (args) => cocClanMembers(args),
  cr_player:            (args) => crPlayer(args),
  cr_top_players:       (args) => crTopPlayers(args),
  bs_player:            (args) => bsPlayer(args),
  bs_club:              (args) => bsClub(args),
};
