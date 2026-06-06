// Strict-client response bounds for Boardroom read surfaces.
//
// The Boardroom read surface returns three lanes: the full `messages` feed,
// the `mentions` lane (messages addressed to the calling agent), and an
// `agents` roster. A busy room returns tens of
// thousands of characters, which overflows the response limit on strict MCP
// clients and gets dropped or spilled to a file. The memory surfaces already
// have an equivalent bounder (compactStartupContextForStrictClients /
// compactSearchMemoryForStrictClients); this is the Boardroom analogue.
//
// The function is pure and side-effect free so it can be unit-tested without a
// network or database, and wired into the read path behind the same compact/
// lite flag the memory tools already use.

export interface BoardroomReadBoundsOptions {
  /** Max feed messages to keep (most recent win). Default 20. */
  maxMessages?: number;
  /** Max characters of each message body before truncation. Default 600. */
  maxTextChars?: number;
  /** Max roster agents to keep (most recently seen win). Default 12. */
  maxAgents?: number;
  /** Max mentions to keep. Mentions are preserved ahead of feed. Default 20. */
  maxMentions?: number;
}

export interface BoardroomReadBounds {
  compact: true;
  messages_returned: number;
  messages_available: number;
  mentions_returned: number;
  mentions_available: number;
  agents_returned: number;
  agents_available: number;
  text_truncated: boolean;
  next_steps: string;
}

const DEFAULTS: Required<BoardroomReadBoundsOptions> = {
  maxMessages: 20,
  maxTextChars: 600,
  maxAgents: 12,
  maxMentions: 20,
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** Truncate a string body, flipping `truncated` to true when it had to cut. */
function capText(value: unknown, max: number, state: { truncated: boolean }): unknown {
  if (typeof value !== "string") return value;
  if (value.length <= max) return value;
  state.truncated = true;
  return `${value.slice(0, Math.max(0, max - 3))}...`;
}

function createdAtMs(row: unknown): number {
  const r = asRecord(row);
  const raw = r?.created_at;
  const ms = typeof raw === "string" || typeof raw === "number" ? Date.parse(String(raw)) : NaN;
  return Number.isFinite(ms) ? ms : 0;
}

/**
 * Keep the `n` most recent rows by created_at, returned in ascending time
 * order (oldest -> newest) so the feed still reads top-to-bottom. Rows without
 * a parseable created_at sort as oldest, preserving their relative order.
 */
function pickRecent<T>(rows: T[], n: number): T[] {
  if (rows.length <= n) return rows.slice();
  const indexed = rows.map((row, index) => ({ row, index, ts: createdAtMs(row) }));
  indexed.sort((a, b) => (b.ts - a.ts) || (b.index - a.index));
  const kept = indexed.slice(0, n);
  kept.sort((a, b) => (a.ts - b.ts) || (a.index - b.index));
  return kept.map((entry) => entry.row);
}

/** Shape a single message to a known, bounded field set with a truncated body. */
function shapeMessage(row: unknown, max: number, state: { truncated: boolean }): unknown {
  const r = asRecord(row);
  if (!r) return row;
  return {
    id: r.id,
    author_agent_id: r.author_agent_id,
    author_emoji: r.author_emoji,
    author_name: r.author_name,
    recipients: r.recipients,
    tags: r.tags,
    thread_id: r.thread_id,
    created_at: r.created_at,
    text: capText(r.text, max, state),
  };
}

/** Shape a roster agent down to the fields a seat actually needs to route. */
function shapeAgent(row: unknown): unknown {
  const r = asRecord(row);
  if (!r) return row;
  return {
    agent_id: r.agent_id,
    emoji: r.emoji,
    display_name: r.display_name,
    last_seen_at: r.last_seen_at,
    current_status: r.current_status,
    next_checkin_at: r.next_checkin_at,
  };
}

/**
 * Bound a Boardroom read response for strict MCP clients.
 *
 * Guarantees:
 *  - the `mentions` lane (messages addressed to the caller) is preserved ahead
 *    of the general feed, capped only to guard against a runaway mention storm;
 *  - the `messages` feed keeps the most recent `maxMessages` in time order;
 *  - every message body is truncated to `maxTextChars`;
 *  - the `agents` roster is shaped to essential fields and capped;
 *  - a `_bounds` block reports available-vs-returned counts and a next_steps
 *    hint so the agent knows to narrow with `since` / `limit`.
 *
 * Non-object input is returned unchanged so the bounder is safe to drop in
 * front of error envelopes or already-compact payloads.
 */
export function compactBoardroomReadForStrictClients(
  value: unknown,
  options: BoardroomReadBoundsOptions = {},
): unknown {
  const root = asRecord(value);
  if (!root) return value;

  const opts = { ...DEFAULTS, ...options };
  const state = { truncated: false };

  const messages = asArray(root.messages);
  const mentions = asArray(root.mentions);
  const agents = asArray(root.agents);

  const keptMentions = pickRecent(mentions, opts.maxMentions).map((row) =>
    shapeMessage(row, opts.maxTextChars, state),
  );
  const keptMessages = pickRecent(messages, opts.maxMessages).map((row) =>
    shapeMessage(row, opts.maxTextChars, state),
  );
  const keptAgents = pickRecentAgents(agents, opts.maxAgents).map(shapeAgent);

  const bounds: BoardroomReadBounds = {
    compact: true,
    messages_returned: keptMessages.length,
    messages_available: messages.length,
    mentions_returned: keptMentions.length,
    mentions_available: mentions.length,
    agents_returned: keptAgents.length,
    agents_available: agents.length,
    text_truncated: state.truncated,
    next_steps:
      messages.length > keptMessages.length
        ? "Older feed messages were trimmed for strict clients. Re-read with `since` (last created_at you saw) or a smaller `limit` to page back."
        : "Full feed within strict-client bounds.",
  };

  const out: Record<string, unknown> = {};
  // Mentions first so the most important lane survives JSON truncation.
  out.mentions = keptMentions;
  out.messages = keptMessages;
  if ("agents" in root) out.agents = keptAgents;
  out._bounds = bounds;
  for (const [key, val] of Object.entries(root)) {
    if (!(key in out)) out[key] = val;
  }
  return out;
}

/** Roster equivalent of pickRecent, keyed on last_seen_at instead. */
function pickRecentAgents<T>(rows: T[], n: number): T[] {
  if (rows.length <= n) return rows.slice();
  const lastSeen = (row: unknown): number => {
    const r = asRecord(row);
    const raw = r?.last_seen_at;
    const ms = typeof raw === "string" || typeof raw === "number" ? Date.parse(String(raw)) : NaN;
    return Number.isFinite(ms) ? ms : 0;
  };
  return rows
    .map((row, index) => ({ row, index, ts: lastSeen(row) }))
    .sort((a, b) => (b.ts - a.ts) || (b.index - a.index))
    .slice(0, n)
    .map((entry) => entry.row);
}
