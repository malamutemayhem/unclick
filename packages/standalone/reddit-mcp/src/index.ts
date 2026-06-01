#!/usr/bin/env node
// Reddit MCP. Standalone MCP server by UnClick.
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
  redditRead,
  redditPost,
  redditComment,
  redditSearch,
  redditThread,
  redditUser,
  redditVote,
  redditSubscribe,
} from "./reddit-tool.js";

const TOOLS = [
  {
    name: "reddit_read",
    description: "Read posts from a Reddit subreddit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        subreddit: { type: "string" },
        sort: { type: "string", enum: ["hot", "new", "top", "rising"], description: "hot, new, top, rising" },
        limit: { type: "number" },
        after: { type: "string" },
        t: { type: "string", enum: ["hour", "day", "week", "month", "year", "all"], description: "hour, day, week, month, year, all" },
      },
      required: ["subreddit"],
    },
  },
  {
    name: "reddit_post",
    description: "Create a Reddit post.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        subreddit: { type: "string" },
        title: { type: "string" },
        kind: { type: "string", enum: ["self", "link"], description: "self, link" },
        text: { type: "string" },
        url: { type: "string" },
        nsfw: { type: "boolean" },
        spoiler: { type: "boolean" },
      },
      required: ["access_token", "subreddit", "title", "kind"],
    },
  },
  {
    name: "reddit_comment",
    description: "Post a comment on Reddit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        parent_id: { type: "string" },
        text: { type: "string" },
      },
      required: ["access_token", "parent_id", "text"],
    },
  },
  {
    name: "reddit_search",
    description: "Search Reddit posts.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        query: { type: "string" },
        q: { type: "string" },
        subreddit: { type: "string" },
        sort: { type: "string" },
        limit: { type: "number" },
      },
      required: [],
    },
  },
  {
    name: "reddit_thread",
    description: "Read a public Reddit thread, including the post and comments.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        url: { type: "string" },
        subreddit: { type: "string" },
        id: { type: "string" },
        limit: { type: "number" },
        sort: { type: "string" },
      },
      required: [],
    },
  },
  {
    name: "reddit_user",
    description: "Get a Reddit user profile and posts.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        username: { type: "string" },
        type: { type: "string", description: "overview, submitted, comments" },
        limit: { type: "number" },
      },
      required: ["username"],
    },
  },
  {
    name: "reddit_vote",
    description: "Vote on a Reddit post or comment.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        id: { type: "string" },
        dir: { type: "number", description: "1=upvote, 0=neutral, -1=downvote" },
      },
      required: ["access_token", "id", "dir"],
    },
  },
  {
    name: "reddit_subscribe",
    description: "Subscribe to or unsubscribe from a Reddit subreddit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        sr: { type: "string" },
        action: { type: "string", enum: ["sub", "unsub"], description: "sub or unsub" },
      },
      required: ["access_token", "sr", "action"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  reddit_read: (args) => redditRead(args as unknown as Parameters<typeof redditRead>[0]),
  reddit_post: (args) => redditPost(args as unknown as Parameters<typeof redditPost>[0]),
  reddit_comment: (args) => redditComment(args as unknown as Parameters<typeof redditComment>[0]),
  reddit_search: (args) => redditSearch(args as unknown as Parameters<typeof redditSearch>[0]),
  reddit_thread: (args) => redditThread(args as unknown as Parameters<typeof redditThread>[0]),
  reddit_user: (args) => redditUser(args as unknown as Parameters<typeof redditUser>[0]),
  reddit_vote: (args) => redditVote(args as unknown as Parameters<typeof redditVote>[0]),
  reddit_subscribe: (args) => redditSubscribe(args as unknown as Parameters<typeof redditSubscribe>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/reddit", version: "0.1.0" },
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
  process.stderr.write(`[reddit-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
