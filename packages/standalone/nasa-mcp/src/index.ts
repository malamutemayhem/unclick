#!/usr/bin/env node
// NASA MCP. Standalone MCP server by UnClick.
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
  nasaApod,
  nasaAsteroids,
  nasaMarsPhotos,
  nasaEarthImagery,
  nasaEpic,
} from "./nasa-tool.js";

const TOOLS = [
  {
    name: "nasa_apod",
    description: "Get NASA Astronomy Picture of the Day.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_asteroids",
    description: "Get NASA Near Earth Object (asteroid) data.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        start_date: { type: "string" },
        end_date: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_mars_photos",
    description: "Get NASA Mars rover photos.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        rover: { type: "string", enum: ["curiosity", "opportunity", "spirit", "perseverance"], description: "curiosity, opportunity, spirit" },
        sol: { type: "number" },
        earth_date: { type: "string" },
        camera: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_earth_imagery",
    description: "Get NASA Earth satellite imagery.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lat: { type: "number" },
        lon: { type: "number" },
        date: { type: "string" },
        dim: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["lat", "lon"],
    },
  },
  {
    name: "nasa_epic",
    description: "Get NASA EPIC Earth imagery.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        api_key: { type: "string" },
      },
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  nasa_apod: (args) => nasaApod(args as unknown as Parameters<typeof nasaApod>[0]),
  nasa_asteroids: (args) => nasaAsteroids(args as unknown as Parameters<typeof nasaAsteroids>[0]),
  nasa_mars_photos: (args) => nasaMarsPhotos(args as unknown as Parameters<typeof nasaMarsPhotos>[0]),
  nasa_earth_imagery: (args) => nasaEarthImagery(args as unknown as Parameters<typeof nasaEarthImagery>[0]),
  nasa_epic: (args) => nasaEpic(args as unknown as Parameters<typeof nasaEpic>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/nasa", version: "0.1.0" },
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
  process.stderr.write(`[nasa-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
