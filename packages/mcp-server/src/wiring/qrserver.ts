// wiring/qrserver.ts
// Per-app MCP wiring for the qrserver connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { qrserverGenerate } from "../qrserver-tool.js";

export const qrserverTools = [
  // ── qrserver-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "qrserver_generate",
    description: "Generate a QR code image URL for any text or URL.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        data: { type: "string" as const, description: "Text or URL to encode in the QR code." },
        size: { type: "string" as const, description: "Image dimensions as WxH (default '200x200')." },
        format: { type: "string" as const, description: "Image format: png, svg, jpg (default 'png')." },
        color: { type: "string" as const, description: "QR code color as hex without # (e.g. '000000')." },
        bgcolor: { type: "string" as const, description: "Background color as hex without # (e.g. 'ffffff')." },
      }, required: ["data"],
    },
  },
] as const;

export const qrserverHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // qrserver-tool.ts
  qrserver_generate:         (args) => qrserverGenerate(args),};
