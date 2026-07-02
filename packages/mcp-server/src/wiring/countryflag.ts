// wiring/countryflag.ts
// Per-app MCP wiring for the countryflag connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { countryFlagUrl } from "../countryflag-tool.js";

export const countryflagTools = [
  // ── countryflag-tool.ts ────────────────────────────────────────────────────
  {
    name: "country_flag_url",
    description: "Get a country flag image URL by ISO 2-letter code.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        country_code: { type: "string", description: "2-letter ISO country code (e.g. US, GB, AU)" },
        style: { type: "string", description: "flat (PNG) or svg (default flat)" },
        size: { type: "number", description: "Size: 16, 32, 48, or 64 (default 64)" },
      },
      required: ["country_code"],
    },
  },
] as const;

export const countryflagHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // countryflag-tool.ts
  country_flag_url:        (args) => countryFlagUrl(args),
};
