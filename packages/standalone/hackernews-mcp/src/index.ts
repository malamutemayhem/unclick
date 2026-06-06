#!/usr/bin/env node
// Hacker News MCP. Standalone MCP server by UnClick.
// By UnClick. 180+ tools plus persistent agent memory in one install: https://unclick.world
//
// Generated from the UnClick connector by scripts/generate-standalone-mcp.mjs.
// Edit the connector in the UnClick monorepo, not here.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  hnTopStories,
  hnNewStories,
  hnBestStories,
  hnAskHn,
  hnShowHn,
  hnItem,
  hnUser,
} from "./hackernews-tool.js";

const TOOLS = [
  {
    name: "hn_top_stories",
    description: "Get the top stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_new_stories",
    description: "Get the newest stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_best_stories",
    description: "Get the best stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_ask_hn",
    description: "Get Ask HN posts from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_show_hn",
    description: "Get Show HN posts from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_item",
    description: "Get a specific Hacker News item by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "hn_user",
    description: "Get a Hacker News user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
      },
      required: ["username"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  hn_top_stories: (args) => hnTopStories(args as unknown as Parameters<typeof hnTopStories>[0]),
  hn_new_stories: (args) => hnNewStories(args as unknown as Parameters<typeof hnNewStories>[0]),
  hn_best_stories: (args) => hnBestStories(args as unknown as Parameters<typeof hnBestStories>[0]),
  hn_ask_hn: (args) => hnAskHn(args as unknown as Parameters<typeof hnAskHn>[0]),
  hn_show_hn: (args) => hnShowHn(args as unknown as Parameters<typeof hnShowHn>[0]),
  hn_item: (args) => hnItem(args as unknown as Parameters<typeof hnItem>[0]),
  hn_user: (args) => hnUser(args as unknown as Parameters<typeof hnUser>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/hackernews", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const handler = HANDLERS[req.params.name];
  if (!handler) {
    return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
  }
  try {
    const result = await handler((req.params.arguments ?? {}) as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text", text: message }], isError: true };
  }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`[hackernews-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
