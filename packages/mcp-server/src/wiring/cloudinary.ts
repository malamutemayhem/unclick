// wiring/cloudinary.ts
// Per-app MCP wiring for the cloudinary connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { cloudinaryListResources, cloudinaryGetUsage } from "../cloudinary-tool.js";

export const cloudinaryTools = [
  // ── cloudinary-tool.ts ────────────────────────────────────────────────────────
  { name: "cloudinary_list_resources", description: "List Cloudinary media resources.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    cloud_name: { type: "string", description: "Cloudinary cloud name" },
    api_key: { type: "string", description: "Cloudinary API key" },
    api_secret: { type: "string", description: "Cloudinary API secret" },
    resource_type: { type: "string", description: "image (default), video, or raw" },
    prefix: { type: "string", description: "Filter by public_id prefix / folder" },
    limit: { type: "number", description: "Resources to return (max 100, default 25)" },
  }, required: ["cloud_name", "api_key", "api_secret"] } },
  { name: "cloudinary_get_usage", description: "Get Cloudinary usage and quota.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    cloud_name: { type: "string", description: "Cloudinary cloud name" },
    api_key: { type: "string", description: "Cloudinary API key" },
    api_secret: { type: "string", description: "Cloudinary API secret" },
  }, required: ["cloud_name", "api_key", "api_secret"] } },
] as const;

export const cloudinaryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cloudinary-tool.ts
  cloudinary_list_resources: (args) => cloudinaryListResources(args),
  cloudinary_get_usage:      (args) => cloudinaryGetUsage(args),
};
