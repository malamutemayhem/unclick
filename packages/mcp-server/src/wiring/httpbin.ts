// wiring/httpbin.ts
// Per-app MCP wiring for the httpbin connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { httpbinGet, httpbinHeaders, httpbinIp, httpbinUserAgent, httpbinUuid } from "../httpbin-tool.js";

export const httpbinTools = [
  // ── httpbin-tool.ts ────────────────────────────────────────────────────────
  {
    name: "httpbin_get",
    description: "Test an HTTP GET request - see your headers, IP, and args echoed back.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "httpbin_headers",
    description: "Get your request headers as seen by httpbin.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "httpbin_ip",
    description: "Get your public IP address via httpbin.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "httpbin_user_agent",
    description: "Get your User-Agent string via httpbin.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "httpbin_uuid",
    description: "Generate a random UUID via httpbin.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const httpbinHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // httpbin-tool.ts
  httpbin_get:             (args) => httpbinGet(args),
  httpbin_headers:         (args) => httpbinHeaders(args),
  httpbin_ip:              (args) => httpbinIp(args),
  httpbin_user_agent:      (args) => httpbinUserAgent(args),
  httpbin_uuid:            (args) => httpbinUuid(args),
};
