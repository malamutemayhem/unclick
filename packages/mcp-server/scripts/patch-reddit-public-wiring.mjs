#!/usr/bin/env node
// Keeps the generated Reddit wiring aligned with reddit-tool.ts until the large
// generated source is refreshed directly. This runs before build/test so the
// shipped MCP server advertises and validates public read-only Reddit tools.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const wiringPath = path.resolve(here, "../src/tool-wiring.ts");
let source = fs.readFileSync(wiringPath, "utf8");
source = source.replace(/\r\n/g, "\n");
const original = source;

function replaceOnce(find, replace, label) {
  if (source.includes(find)) {
    source = source.replace(find, replace);
    return;
  }
  if (source.includes(replace)) return;
  throw new Error(`Could not patch ${label}; expected generated text was not found.`);
}

replaceOnce(
  `import {
  redditRead, redditPost, redditComment,
  redditSearch, redditUser, redditVote, redditSubscribe,
} from "./reddit-tool.js";`,
  `import {
  redditRead, redditPost, redditComment,
  redditSearch, redditThread, redditUser, redditVote, redditSubscribe,
} from "./reddit-tool.js";`,
  "Reddit import"
);

const redditToolsStart = source.indexOf(`  {
    name: "reddit_read"`);
const mastodonToolStart = source.indexOf(`  {
    name: "mastodon_action"`, redditToolsStart);
const nextCommentStart = source.lastIndexOf(`

  // `, mastodonToolStart);
if (redditToolsStart === -1 || mastodonToolStart === -1 || nextCommentStart <= redditToolsStart) {
  throw new Error("Could not locate generated Reddit tool schema block.");
}

const redditToolBlock = `  {
    name: "reddit_read",
    description: "Read public posts from a Reddit subreddit. OAuth is optional for public reads.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Optional Reddit OAuth bearer token" },
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
    description: "Search public Reddit posts. OAuth is optional for public reads.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Optional Reddit OAuth bearer token" },
        query: { type: "string", description: "Search query" },
        q: { type: "string", description: "Search query alias" },
        subreddit: { type: "string", description: "Limit to a subreddit" },
        sort: { type: "string", description: "relevance, hot, top, new, or comments" },
        t: { type: "string", description: "hour, day, week, month, year, all" },
        limit: { type: "number", description: "Results to return" },
        after: { type: "string" },
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
        access_token: { type: "string", description: "Optional Reddit OAuth bearer token" },
        url: { type: "string", description: "Full Reddit thread URL" },
        subreddit: { type: "string", description: "Subreddit name when url is not supplied" },
        id: { type: "string", description: "Thread id when url is not supplied" },
        limit: { type: "number" },
        sort: { type: "string" },
      },
      required: [],
    },
  },
  {
    name: "reddit_user",
    description: "Get a public Reddit user profile and recent activity. OAuth is optional for public reads.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Optional Reddit OAuth bearer token" },
        username: { type: "string" },
        include_posts: { type: "boolean" },
        include_comments: { type: "boolean" },
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
        sr: { type: "string", description: "Subreddit name alias" },
        subreddit: { type: "string" },
        action: { type: "string", enum: ["sub", "unsub"], description: "sub or unsub" },
      },
      required: ["access_token", "action"],
    },
  },
`;

source = `${source.slice(0, redditToolsStart)}${redditToolBlock}${source.slice(nextCommentStart)}`;

replaceOnce(
  `  reddit_search:           (args) => redditSearch(args as unknown as Parameters<typeof redditSearch>[0]),
  reddit_user:             (args) => redditUser(args as unknown as Parameters<typeof redditUser>[0]),`,
  `  reddit_search:           (args) => redditSearch(args as unknown as Parameters<typeof redditSearch>[0]),
  reddit_thread:           (args) => redditThread(args as unknown as Parameters<typeof redditThread>[0]),
  reddit_user:             (args) => redditUser(args as unknown as Parameters<typeof redditUser>[0]),`,
  "Reddit thread handler"
);

replaceOnce(
  `  reddit_subscribe:        (args) => redditSubscribe(args as unknown as Parameters<typeof redditSubscribe>[0]),`,
  `  reddit_subscribe:        (args) => redditSubscribe({ ...args, subreddit: String(args.subreddit ?? args.sr ?? "") } as unknown as Parameters<typeof redditSubscribe>[0]),`,
  "Reddit subscribe alias handler"
);

if (source !== original) {
  fs.writeFileSync(wiringPath, source);
  console.log("Patched Reddit generated wiring for public read tools.");
} else {
  console.log("Reddit generated wiring already patched.");
}
