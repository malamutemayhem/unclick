#!/usr/bin/env node
// Open Library MCP. Standalone MCP server by UnClick.
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
  openlibrarySearch,
  openlibraryGetBook,
  openlibraryGetEdition,
  openlibraryGetAuthor,
  openlibraryAuthorWorks,
  openlibraryTrending,
} from "./openlibrary-tool.js";

const TOOLS = [
  {
    name: "openlibrary_search",
    description: "Search books on Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        limit: { type: "number" },
        page: { type: "number" },
      },
      required: ["q"],
    },
  },
  {
    name: "openlibrary_get_book",
    description: "Get a book from Open Library by work ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        work_id: { type: "string", description: "e.g. OL45804W" },
      },
      required: ["work_id"],
    },
  },
  {
    name: "openlibrary_get_edition",
    description: "Get a book edition from Open Library by ISBN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        isbn: { type: "string" },
      },
      required: ["isbn"],
    },
  },
  {
    name: "openlibrary_get_author",
    description: "Get an author from Open Library by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        author_id: { type: "string", description: "e.g. OL23919A" },
      },
      required: ["author_id"],
    },
  },
  {
    name: "openlibrary_author_works",
    description: "Get works by an author from Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        author_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["author_id"],
    },
  },
  {
    name: "openlibrary_trending",
    description: "Get trending books from Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  openlibrary_search: (args) => openlibrarySearch(args as unknown as Parameters<typeof openlibrarySearch>[0]),
  openlibrary_get_book: (args) => openlibraryGetBook(args as unknown as Parameters<typeof openlibraryGetBook>[0]),
  openlibrary_get_edition: (args) => openlibraryGetEdition(args as unknown as Parameters<typeof openlibraryGetEdition>[0]),
  openlibrary_get_author: (args) => openlibraryGetAuthor(args as unknown as Parameters<typeof openlibraryGetAuthor>[0]),
  openlibrary_author_works: (args) => openlibraryAuthorWorks(args as unknown as Parameters<typeof openlibraryAuthorWorks>[0]),
  openlibrary_trending: (args) => openlibraryTrending(args as unknown as Parameters<typeof openlibraryTrending>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/openlibrary", version: "0.1.0" },
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
  process.stderr.write(`[openlibrary-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
