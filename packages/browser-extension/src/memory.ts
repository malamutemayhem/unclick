// Save-to-memory: build the request that saves a fact into UnClick Memory.
// Pure builders only, no network here, so they are fully testable. The extension
// background worker performs the actual fetch with the user's API key.

export const DEFAULT_MCP_ENDPOINT = "https://unclick.world/api/mcp";

/** Matches the memory layer's fact length cap. */
export const FACT_MAX_LEN = 4000;

export type MemoryCategory =
  | "preference"
  | "decision"
  | "technical"
  | "contact"
  | "project"
  | "troubleshooting"
  | "general";

export interface SaveFactInput {
  fact: string;
  category?: MemoryCategory;
  sourceUrl?: string;
}

/** Trim, append the source, and cap to the fact length limit. */
export function composeFact(input: SaveFactInput): string {
  const base = (input.fact ?? "").trim();
  if (!base) throw new Error("fact is empty");
  const combined = input.sourceUrl
    ? `${base}\n\nSource: ${input.sourceUrl}`
    : base;
  return combined.length > FACT_MAX_LEN
    ? combined.slice(0, FACT_MAX_LEN)
    : combined;
}

export interface JsonRpcCall {
  jsonrpc: "2.0";
  id: number;
  method: "tools/call";
  params: {
    name: "save_fact";
    arguments: { fact: string; category: MemoryCategory };
  };
}

/** Build the MCP tools/call payload for save_fact. */
export function buildSaveFactRpc(input: SaveFactInput, id = 1): JsonRpcCall {
  return {
    jsonrpc: "2.0",
    id,
    method: "tools/call",
    params: {
      name: "save_fact",
      arguments: {
        fact: composeFact(input),
        category: input.category ?? "general",
      },
    },
  };
}

export interface McpRequest {
  url: string;
  method: "POST";
  headers: Record<string, string>;
  body: string;
}

/** Build the HTTP request for an MCP call. The API key is sent only in the Authorization header. */
export function buildMcpRequest(
  endpoint: string,
  apiKey: string,
  rpc: unknown,
): McpRequest {
  if (!endpoint) throw new Error("endpoint is required");
  if (!apiKey) throw new Error("apiKey is required");
  return {
    url: endpoint,
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(rpc),
  };
}
