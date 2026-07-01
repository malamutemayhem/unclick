// ─── Chat tool-calling (read-first) ──────────────────────────────────────────
//
// Wires AI SDK tool-calling into the website chat seat. Two tool families with
// deliberately different auth paths, because the website authenticates chat with
// the logged-in SESSION (a Supabase JWT), not a raw uc_/agt_ key:
//
//   1. Memory tools (search_memory, save_memory) run DIRECTLY against the
//      caller's lane-scoped memory backend. The lane is resolved server-side
//      from the session, so these always work - no cached UnClick key required.
//
//   2. Connector tools (find_tools, tool_info, call_tool) reach the user's
//      connected apps (Gmail, Drive, Dropbox, OneDrive, ...). Connector creds
//      are zero-knowledge: decrypting them needs the user's raw uc_/agt_ key,
//      which a session JWT cannot stand in for. So these are brokered through an
//      internal HTTPS call to /api/mcp (a SEPARATE, env-isolated serverless
//      invocation) authenticated with the user's own key. When no valid
//      connector key is present they degrade gracefully with a clear pointer to
//      add it, rather than failing - memory and chat keep working.
//
// The chat process NEVER imports the mcp-server package for connector calls and
// NEVER mutates process.env.UNCLICK_API_KEY, so concurrent chat requests can
// never bleed one tenant's key into another (the global-env race).
//
// Read-first policy: write/send actions on connected apps are gated off.
// call_tool refuses any endpoint whose leaf action is not clearly a read.
// save_memory writes only to the user's OWN UnClick memory, never to a
// connected app.

import { tool, type Tool } from "ai";
import { z } from "zod";

// Cap on the tool result text we hand back to the model, so a large connector
// payload (or a big memory dump) cannot blow the context window.
const MAX_RESULT_CHARS = 6000;

// Per-call ceiling for the internal /api/mcp round trip.
const MCP_CALL_TIMEOUT_MS = 20_000;

interface McpContent {
  type?: string;
  text?: string;
}

interface JsonRpcToolResult {
  result?: { content?: McpContent[]; isError?: boolean };
  error?: { message?: string };
}

function capText(text: string): string {
  if (text.length <= MAX_RESULT_CHARS) return text;
  return `${text.slice(0, MAX_RESULT_CHARS - 1)}...`;
}

function parseSseJsonRpc(text: string): JsonRpcToolResult | null {
  const events: string[][] = [];
  let current: string[] = [];

  for (const line of text.split(/\r?\n/)) {
    if (line === "") {
      if (current.length > 0) {
        events.push(current);
        current = [];
      }
      continue;
    }
    if (line.startsWith("data:")) current.push(line.slice(5).trimStart());
  }
  if (current.length > 0) events.push(current);

  for (const event of events) {
    const data = event.join("\n").trim();
    if (!data || data === "[DONE]") continue;
    try {
      const parsed = JSON.parse(data) as JsonRpcToolResult;
      if (parsed?.result || parsed?.error) return parsed;
    } catch {
      // Skip non-JSON SSE data frames.
    }
  }
  return null;
}

function parseJsonRpcToolResult(text: string): JsonRpcToolResult | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as JsonRpcToolResult;
  } catch {
    return parseSseJsonRpc(trimmed);
  }
}

/**
 * Call a tool on the hosted UnClick MCP endpoint via an internal HTTPS request.
 *
 * `origin` MUST be derived from the trusted request host, never from user body
 * input. `bearer` is the caller's validated uc_/agt_ key, passed straight
 * through so the connector authenticates AS that user inside the isolated
 * /api/mcp invocation.
 *
 * Never throws, never logs the bearer or the raw response body. On any error or
 * timeout it returns a short "tool error: <reason>" string so the model can tell
 * the user a tool failed instead of fabricating a result.
 */
export async function internalMcpCall(
  origin: string,
  bearer: string,
  toolName: string,
  args: Record<string, unknown>,
): Promise<string> {
  if (!origin) return "tool error: no origin";
  if (!bearer) return "tool error: not authenticated";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MCP_CALL_TIMEOUT_MS);
  try {
    const r = await fetch(`${origin}/api/mcp`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearer}`,
        Accept: "application/json, text/event-stream",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: toolName, arguments: args },
      }),
      signal: controller.signal,
    });

    if (!r.ok) return `tool error: mcp responded ${r.status}`;

    const body = parseJsonRpcToolResult(await r.text());
    if (!body) return "tool error: invalid mcp response";
    if (body.error) {
      return `tool error: ${capText(body.error.message ?? "mcp error")}`;
    }

    const content = body.result?.content;
    const text = Array.isArray(content)
      ? content
          .filter((c) => c?.type === "text" && typeof c.text === "string")
          .map((c) => c.text as string)
          .join("\n\n")
          .trim()
      : "";

    if (!text) return "tool error: empty result";
    if (body.result?.isError) return `tool error: ${capText(text)}`;
    return capText(text);
  } catch (err) {
    const reason = err instanceof Error && err.name === "AbortError" ? "timeout" : "request failed";
    return `tool error: ${reason}`;
  } finally {
    clearTimeout(timer);
  }
}

// Leaf actions that READ. Read-first is conservative: anything not clearly a
// read is denied. Live connector IDs are not always dotted ("gmail.read");
// many arrive as snake-case tool IDs ("gmail_search", "dropbox_list_folder"),
// so we tokenise before deciding.
const READ_VERBS = new Set([
  "browse",
  "count",
  "describe",
  "fetch",
  "find",
  "get",
  "info",
  "list",
  "lookup",
  "query",
  "read",
  "search",
  "status",
  "view",
]);

// Actions that mutate, spend, send, or otherwise act on the world. These are
// explicitly NOT read even if the endpoint also contains a read-ish word.
const WRITE_VERBS = new Set([
  "add",
  "approve",
  "cancel",
  "charge",
  "comment",
  "complete",
  "copy",
  "create",
  "delete",
  "deploy",
  "generate",
  "invite",
  "merge",
  "modify",
  "move",
  "pay",
  "post",
  "promote",
  "push",
  "remove",
  "reply",
  "revoke",
  "rotate",
  "save",
  "send",
  "set",
  "share",
  "store",
  "update",
  "upload",
  "vote",
  "write",
]);

function endpointTokens(endpointId: string): string[] {
  return endpointId
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * True only when the endpoint's leaf action is clearly a read. The leaf is the
 * segment after the last "." (e.g. "google-drive.list" -> "list",
 * "memory.search_memory" -> "search_memory"); within it the verb is the first
 * underscore-separated token ("search_memory" -> "search").
 *
 * Ambiguous or write-looking actions return false (deny). Read-first mode.
 */
export function isReadOnlyEndpointId(endpointId: string): boolean {
  if (typeof endpointId !== "string" || !endpointId.trim()) return false;
  const tokens = endpointTokens(endpointId);
  if (tokens.some((token) => WRITE_VERBS.has(token))) return false;
  return tokens.some((token) => READ_VERBS.has(token));
}

const REFUSAL =
  "Write/send actions on connected apps are not enabled yet (read-first mode). I can only call read or list endpoints right now.";

// Returned by every connector tool when no valid connector key is available, so
// the seat tells the user how to unlock connectors instead of failing silently.
const NO_CONNECTOR_KEY =
  "Connected apps are not wired into this chat yet. Add your UnClick API key on the You page (/admin/you) and I can read your Gmail, Drive, Dropbox, and other connected apps here. Your saved memory still works without it.";

/**
 * Minimal memory surface the chat tools need. api/chat.ts adapts a lane-scoped
 * SupabaseBackend to this, keeping chat-tools.ts free of backend internals (and
 * trivially testable with a fake). Both methods run on the logged-in session
 * alone - no cached UnClick key required.
 */
export interface ChatMemory {
  search(query: string, maxResults: number): Promise<unknown>;
  save(fact: string, category: string): Promise<unknown>;
}

export interface BuildChatToolsOpts {
  // Trusted request origin, e.g. "https://unclick.world". Used only for the
  // internal /api/mcp connector round trip. Never from user body input.
  origin: string;
  // The user's validated uc_/agt_ key for connector access, or null when none
  // is present (or it failed same-lane validation). Null => connectors degrade
  // gracefully; memory tools are unaffected.
  connectorKey: string | null;
  // Direct, lane-scoped memory access for the logged-in account.
  memory: ChatMemory;
}

/**
 * Build the read-first tool surface for a chat seat. Each tool's execute returns
 * a string and never throws; on failure it returns a short error string so the
 * model surfaces the failure honestly instead of fabricating a result.
 */
export function buildChatTools({ origin, connectorKey, memory }: BuildChatToolsOpts): Record<string, Tool> {
  return {
    search_memory: tool({
      description:
        "Search the user's own UnClick memory (their stored facts, preferences, decisions, and prior session context). Use this before answering anything that might depend on what the user told you before.",
      inputSchema: z.object({
        query: z.string().describe("What to recall from the user's memory"),
        max_results: z.number().int().min(1).max(50).optional().describe("Max results (default 10)"),
      }),
      execute: async ({ query, max_results }) => {
        try {
          const results = await memory.search(query, max_results ?? 10);
          const text = typeof results === "string" ? results : JSON.stringify(results ?? null);
          if (!text || text === "null" || text === "[]" || text === "{}") {
            return "No matching memory found.";
          }
          return capText(text);
        } catch {
          return "tool error: search_memory failed";
        }
      },
    }),

    save_memory: tool({
      description:
        "Save a durable fact to the user's OWN UnClick memory so it is available in future sessions. Use when the user shares a preference, decision, or detail worth keeping. This writes only to their own memory, not to any external app.",
      inputSchema: z.object({
        fact: z.string().describe("A single atomic fact to remember"),
        category: z.string().optional().describe("Optional category, e.g. preference, decision, technical"),
      }),
      execute: async ({ fact, category }) => {
        const clean = fact.trim();
        if (!clean) return "tool error: nothing to save (empty fact)";
        try {
          await memory.save(clean, (category ?? "").trim() || "general");
          return `Saved to memory: "${capText(clean)}"`;
        } catch {
          return "tool error: save_memory failed";
        }
      },
    }),

    find_tools: tool({
      description:
        "Discover UnClick connector tools by keyword. Use this to find which connector covers a task (e.g. 'gmail', 'google drive', 'dropbox', 'onedrive') before calling tool_info or call_tool.",
      inputSchema: z.object({
        query: z.string().describe("Describe what you want to do, e.g. 'read my latest emails'"),
        category: z.string().optional().describe("Optional category filter"),
      }),
      execute: async ({ query, category }) => {
        if (!connectorKey) return NO_CONNECTOR_KEY;
        try {
          return await internalMcpCall(origin, connectorKey, "unclick_search", { query, category });
        } catch {
          return "tool error: find_tools failed";
        }
      },
    }),

    tool_info: tool({
      description:
        "Get the endpoint IDs and parameters for a specific UnClick connector tool. Pass the tool slug from find_tools (e.g. 'gmail', 'google-drive'). Use this to learn the exact endpoint_id and params before call_tool.",
      inputSchema: z.object({
        tool: z.string().describe("The connector tool slug, e.g. 'gmail' or 'dropbox'"),
      }),
      execute: async ({ tool: toolSlug }) => {
        if (!connectorKey) return NO_CONNECTOR_KEY;
        try {
          return await internalMcpCall(origin, connectorKey, "unclick_tool_info", { slug: toolSlug });
        } catch {
          return "tool error: tool_info failed";
        }
      },
    }),

    call_tool: tool({
      description:
        "Run a UnClick connector endpoint by its endpoint_id (from tool_info). Read-first mode: only READ/list/search/get/status endpoints are allowed right now (e.g. 'gmail.read', 'gmail_search', 'google-drive.list', 'dropbox_list_folder'). Write, send, generate, or mutate endpoints are refused.",
      inputSchema: z.object({
        endpoint_id: z.string().describe("The endpoint to call, e.g. 'gmail.read'"),
        params: z.record(z.unknown()).optional().describe("Parameters for the endpoint"),
      }),
      execute: async ({ endpoint_id, params }) => {
        // Read-first guarantee is unconditional: a write/send endpoint is
        // refused whether or not a connector key is present.
        if (!isReadOnlyEndpointId(endpoint_id)) return REFUSAL;
        if (!connectorKey) return NO_CONNECTOR_KEY;
        try {
          return await internalMcpCall(origin, connectorKey, "unclick_call", {
            endpoint_id,
            params: params ?? {},
          });
        } catch {
          return "tool error: call_tool failed";
        }
      },
    }),
  };
}
