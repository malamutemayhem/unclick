#!/usr/bin/env node
// PTV MCP. Standalone MCP server by UnClick.
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
  ptvSearch,
  ptvDepartures,
  ptvDisruptions,
  ptvStopsOnRoute,
  ptvRouteDirections,
} from "./ptv-tool.js";

const TOOLS = [
  {
    name: "ptv_search",
    description: "Search PTV stops, routes, or outlets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search_term: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["search_term"],
    },
  },
  {
    name: "ptv_departures",
    description: "Get PTV departures for a stop.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_type: { type: "number", description: "0=train,1=tram,2=bus,3=vline,4=night" },
        stop_id: { type: "number" },
        route_id: { type: "number" },
        max_results: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["route_type", "stop_id"],
    },
  },
  {
    name: "ptv_disruptions",
    description: "Get current PTV service disruptions.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_types: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "ptv_stops_on_route",
    description: "Get stops on a PTV route.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_id: { type: "number" },
        route_type: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["route_id", "route_type"],
    },
  },
  {
    name: "ptv_route_directions",
    description: "Get directions for a PTV route.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["route_id"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  ptv_search: (args) => ptvSearch(args),
  ptv_departures: (args) => ptvDepartures(args),
  ptv_disruptions: (args) => ptvDisruptions(args),
  ptv_stops_on_route: (args) => ptvStopsOnRoute(args),
  ptv_route_directions: (args) => ptvRouteDirections(args),
};

const server = new Server(
  { name: "io.github.malamutemayhem/ptv", version: "0.1.0" },
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
  process.stderr.write(`[ptv-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
