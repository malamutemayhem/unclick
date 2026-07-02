// wiring/placebear.ts
// Per-app MCP wiring for the placebear connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { placebearImage } from "../placebear-tool.js";

export const placebearTools = [
  // ── placebear-tool.ts ────────────────────────────────────────────────────────
  {
    name: "placebear_image",
    description: "Get a bear placeholder image URL at custom dimensions (no network call).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        width: { type: "number" as const, description: "Image width in pixels (default 300, max 2000)." },
        height: { type: "number" as const, description: "Image height in pixels (default 300, max 2000)." },
      },
    },
  },
] as const;

export const placebearHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // placebear-tool.ts
  placebear_image:           (args) => placebearImage(args),};
