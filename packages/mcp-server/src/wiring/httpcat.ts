// wiring/httpcat.ts
// Per-app MCP wiring for the httpcat connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { httpCatImage } from "../httpcat-tool.js";

export const httpcatTools = [
  // ── httpcat-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "http_cat_image",
    description: "Get a cat image for any HTTP status code from http.cat (no network call).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        status_code: { type: "number" as const, description: "HTTP status code (e.g. 200, 404, 500)." },
      },
    },
  },
] as const;

export const httpcatHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // httpcat-tool.ts
  http_cat_image:            (args) => httpCatImage(args),};
