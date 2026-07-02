// wiring/urlhaus.ts
// Per-app MCP wiring for the urlhaus connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { urlhausLookupUrl, urlhausRecent } from "../urlhaus-tool.js";

export const urlhausTools = [
  // ── urlhaus-tool.ts ────────────────────────────────────────────────────────
  {
    name: "urlhaus_lookup_url",
    description: "Check if a URL is listed as a malware distribution site in the URLhaus database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        url: { type: "string", description: "The URL to look up" },
      },
      required: ["url"],
    },
  },
  {
    name: "urlhaus_recent",
    description: "Get recent malware URLs added to the URLhaus database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const urlhausHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // urlhaus-tool.ts
  urlhaus_lookup_url:      (args) => urlhausLookupUrl(args),
  urlhaus_recent:          (args) => urlhausRecent(args),
};
