// wiring/figma.ts
// Per-app MCP wiring for the figma connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { figmaGetFile, figmaGetNode, figmaGetImages, figmaGetComments, figmaPostComment, figmaGetComponents, figmaGetTeamProjects } from "../figma-tool.js";

export const figmaTools = [
  // ── figma-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "figma_get_file",
    description: "Get a Figma file's structure and metadata - pages, frames, and component count.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string", description: "Alphanumeric file ID from the Figma URL" },
        depth: { type: "number", description: "How deep to traverse the node tree (default: full)" },
      },
      required: ["personal_access_token", "file_key"],
    },
  },
  {
    name: "figma_get_node",
    description: "Get a specific node by ID within a Figma file.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
        node_id: { type: "string", description: "Node ID (e.g. '1:2' or '1-2')" },
      },
      required: ["personal_access_token", "file_key", "node_id"],
    },
  },
  {
    name: "figma_get_images",
    description: "Export/render Figma nodes as images (PNG, JPG, SVG, or PDF).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
        node_ids: { description: "Comma-separated node IDs or array of node ID strings" },
        format: { type: "string", enum: ["png", "jpg", "svg", "pdf"], description: "png, jpg, svg, or pdf (default: png)" },
        scale: { type: "number", description: "Image scale factor 0.01-4 (default: 1, PNG/JPG only)" },
      },
      required: ["personal_access_token", "file_key", "node_ids"],
    },
  },
  {
    name: "figma_get_comments",
    description: "Get all comments on a Figma file.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
      },
      required: ["personal_access_token", "file_key"],
    },
  },
  {
    name: "figma_post_comment",
    description: "Add a comment to a Figma file, optionally pinned to canvas coordinates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
        message: { type: "string" },
        x: { type: "number", description: "Canvas X coordinate to pin the comment" },
        y: { type: "number", description: "Canvas Y coordinate to pin the comment" },
      },
      required: ["personal_access_token", "file_key", "message"],
    },
  },
  {
    name: "figma_get_components",
    description: "Get all published components in a Figma file.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
      },
      required: ["personal_access_token", "file_key"],
    },
  },
  {
    name: "figma_get_team_projects",
    description: "List all projects for a Figma team.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        team_id: { type: "string", description: "Team ID from your Figma team URL" },
      },
      required: ["personal_access_token", "team_id"],
    },
  },
] as const;

export const figmaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // figma-tool.ts
  figma_get_file:          (args) => figmaGetFile(args),
  figma_get_node:          (args) => figmaGetNode(args),
  figma_get_images:        (args) => figmaGetImages(args),
  figma_get_comments:      (args) => figmaGetComments(args),
  figma_post_comment:      (args) => figmaPostComment(args),
  figma_get_components:    (args) => figmaGetComponents(args),
  figma_get_team_projects: (args) => figmaGetTeamProjects(args),
};
