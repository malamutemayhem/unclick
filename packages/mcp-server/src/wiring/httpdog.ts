// wiring/httpdog.ts
// Per-app MCP wiring for the httpdog connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { httpDogImage } from "../httpdog-tool.js";

export const httpdogTools = [
  // ── httpdog-tool.ts ───────────────────────────────────────────────────────
  {
    name: "http_dog_image",
    description: "Get a dog image URL for an HTTP status code (like httpcat but with dogs).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        status_code: { type: "number" as const, description: "HTTP status code (100-599)." },
      }, required: ["status_code"],
    },
  },
] as const;

export const httpdogHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // httpdog-tool.ts
  http_dog_image:            (args) => httpDogImage(args),};
