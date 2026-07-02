// ─── Seat tool-mode policy ────────────────────────────────────────────────────
// Single source of truth for what a chat seat may do with UnClick tools in
// each tool mode:
//
//   read  - only clearly-read endpoints (list/search/get/status...)
//   build - reads plus non-destructive create/write/generate endpoints;
//           sends, deletes, payments, merges, deploys, and permission
//           changes stay blocked until the approval layer exists
//
// Two consumers, one policy:
//   1. api/lib/chat-tools.ts (the api seat lane's call_tool gate) imports
//      the classifiers from here so website seats and bridge seats can
//      never drift apart.
//   2. server.ts enforces it in the CallTool handler when the process is
//      spawned as a subscription seat's tool child (UNCLICK_SEAT_TOOL_MODE
//      env set by the seat-bridge worker). That makes the gate hold for
//      every CLI runtime, including ones with no client-side allowlists.
//
// The classification is deliberately name-based and conservative: anything
// ambiguous is denied. Memory and session ops are always allowed because
// they write to the user's OWN UnClick store, matching the api lane where
// memory tools are available in both modes.

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

// Actions still blocked even in Build mode. These need the next confirmation
// layer because they send externally, destroy state, spend money, ship code, or
// change permissions.
const HIGH_RISK_VERBS = new Set([
  "approve",
  "auth",
  "cancel",
  "charge",
  "comment",
  "delete",
  "deploy",
  "invite",
  "merge",
  "pay",
  "permission",
  "permissions",
  "post",
  "push",
  "remove",
  "reply",
  "revoke",
  "rotate",
  "scope",
  "scopes",
  "send",
  "set",
  "share",
  "token",
  "tokens",
  "vote",
]);

// Extra verbs Build mode can run after high-risk verbs are ruled out. This is
// intentionally broader than media generation so seats can begin doing real
// builder work, but not so broad that sends/deletes/deploys slip through.
const BUILD_VERBS = new Set([
  "add",
  "create",
  "generate",
  "save",
  "store",
  "upload",
  "write",
]);

// Some media endpoints are named "text_to_image" / "image_to_image", with no
// obvious verb token. Treat them as Build-mode actions, not read actions.
const BUILD_MEDIA_TOKENS = new Set([
  "audio",
  "image",
  "images",
  "media",
  "video",
  "videos",
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

export function isBuildModeEndpointId(endpointId: string): boolean {
  if (isReadOnlyEndpointId(endpointId)) return true;
  if (typeof endpointId !== "string" || !endpointId.trim()) return false;
  const tokens = endpointTokens(endpointId);
  if (tokens.some((token) => HIGH_RISK_VERBS.has(token))) return false;
  if (tokens.some((token) => BUILD_VERBS.has(token))) return true;
  return (
    tokens.includes("to") &&
    tokens.some((token) => BUILD_MEDIA_TOKENS.has(token))
  );
}

export const READ_MODE_REFUSAL =
  "Write/send actions on connected apps are not enabled yet (read-first mode). I can only call read or list endpoints right now.";

export const BUILD_MODE_REFUSAL =
  "That connector action is still blocked in Build mode. I can read/list/search and run non-destructive create/write/generate actions, but sends, deletes, payments, merges, deploys, permission changes, and other high-risk actions need the next approval layer.";

// ─── Subscription seat child gate ────────────────────────────

export type SeatToolMode = "read" | "build";

export function parseSeatToolMode(value: string | undefined): SeatToolMode | null {
  return value === "read" || value === "build" ? value : null;
}

// First-party ops a seat may always call: they read or write the user's OWN
// UnClick store (memory, sessions, identity), never a connected external app.
// Matches the api lane, where memory tools are available in both modes.
const SEAT_ALWAYS_ALLOWED = new Set([
  "load_memory",
  "get_startup_context",
  "search_memory",
  "save_fact",
  "add_fact",
  "save_session",
  "write_session_summary",
  "save_identity",
  "set_business_context",
  "check_signals",
  // Discovery meta-tools are read-only by construction.
  "unclick_search",
  "unclick_browse",
  "unclick_tool_info",
]);

export interface SeatToolDecision {
  allowed: boolean;
  refusal?: string;
}

/**
 * Decide whether a subscription seat child process may run this tool call.
 * `unclick_call` is judged by its endpoint_id; every other tool by its own
 * name (integration tool names ARE endpoint ids, e.g. "gmail_search").
 */
export function decideSeatToolCall(
  mode: SeatToolMode,
  toolName: string,
  endpointId?: string,
): SeatToolDecision {
  if (SEAT_ALWAYS_ALLOWED.has(toolName)) return { allowed: true };
  const target =
    toolName === "unclick_call" ? String(endpointId ?? "") : toolName;
  if (mode === "read") {
    return isReadOnlyEndpointId(target)
      ? { allowed: true }
      : { allowed: false, refusal: READ_MODE_REFUSAL };
  }
  return isBuildModeEndpointId(target)
    ? { allowed: true }
    : { allowed: false, refusal: BUILD_MODE_REFUSAL };
}
