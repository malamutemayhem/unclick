#!/usr/bin/env node
// Trivia MCP. Standalone MCP server by UnClick.
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
  triviaQuestions,
  triviaCategories,
} from "./trivia-tool.js";

const TOOLS = [
  {
    name: "trivia_questions",
    description: "Get trivia questions from Open Trivia DB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        amount: { type: "number" },
        category: { type: "number" },
        difficulty: { type: "string", enum: ["easy", "medium", "hard"], description: "easy, medium, hard" },
        type: { type: "string", enum: ["multiple", "boolean"], description: "multiple, boolean" },
      },
    },
  },
  {
    name: "trivia_categories",
    description: "Get available trivia categories from Open Trivia DB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  trivia_questions: (args) => triviaQuestions(args as unknown as Parameters<typeof triviaQuestions>[0]),
  trivia_categories: (args) => triviaCategories(args as unknown as Parameters<typeof triviaCategories>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/trivia", version: "0.1.0" },
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
  process.stderr.write(`[trivia-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
