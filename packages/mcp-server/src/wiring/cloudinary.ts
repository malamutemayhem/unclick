// wiring/cloudinary.ts
// Per-app MCP wiring for the cloudinary connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { cloudinaryListResources, cloudinaryGetUsage } from "../cloudinary-tool.js";

export const cloudinaryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cloudinary-tool.ts
  cloudinary_list_resources: (args) => cloudinaryListResources(args),
  cloudinary_get_usage:      (args) => cloudinaryGetUsage(args),
};
