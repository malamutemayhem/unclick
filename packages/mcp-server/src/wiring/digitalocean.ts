// wiring/digitalocean.ts
// Per-app MCP wiring for the digitalocean connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { doListDroplets, doListApps, doListDatabases, doAccount } from "../digitalocean-tool.js";

export const digitaloceanTools = [
  // ── digitalocean-tool.ts ──────────────────────────────────────────────────────
  {
    name: "do_list_droplets",
    description: "List DigitalOcean droplets (signals when any are powered off).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "DigitalOcean personal access token" },
        tag_name: { type: "string", description: "Filter droplets by tag" },
        limit: { type: "number", description: "Droplets to return (max 200, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "do_list_apps",
    description: "List DigitalOcean App Platform apps.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "DigitalOcean personal access token" },
        limit: { type: "number", description: "Apps to return (max 200, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "do_list_databases",
    description: "List DigitalOcean managed database clusters.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "DigitalOcean personal access token" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "do_account",
    description: "Get the DigitalOcean account profile and limits.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "DigitalOcean personal access token" },
      },
      required: ["access_token"],
    },
  },
] as const;

export const digitaloceanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // digitalocean-tool.ts
  do_list_droplets:        (args) => doListDroplets(args),
  do_list_apps:            (args) => doListApps(args),
  do_list_databases:       (args) => doListDatabases(args),
  do_account:              (args) => doAccount(args),
};
