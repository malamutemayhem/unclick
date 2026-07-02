// ============================================================
// chatSync - pure helpers behind the chat room sync loop.
//
// The chat page keeps a shared room live the way classic chat clients do
// when a socket is unavailable: an incremental poll against
// /api/chat-threads?action=messages&after=<cursor>. These helpers are the
// deterministic core of that loop (cursor tracking, merge/dedupe, unread
// state, stall detection) so the polling effect in AdminChat.tsx stays a
// thin timer around tested logic.
//
// Dedupe matters because the same turn can arrive twice: once locally
// (the optimistic user turn, or the streamed assistant turn from useChat)
// and once from the database poll with a different row id. Rows are
// skipped when their id is already known OR an existing message of the
// same role carries identical text.
// ============================================================

import type { UIMessage } from "ai";

// Row shape returned by /api/chat-threads?action=messages.
export interface ThreadMessageRow {
  id: string;
  sender_id: string | null;
  sender_kind: string;
  model: string | null;
  content: string | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string | null;
}

// One seat's entry in a persisted council run receipt
// (chat_thread_messages.metadata.council, written by api/chat.ts).
export interface CouncilReceiptSeat {
  label: string;
  handle: string;
  slug: string;
  model: string;
  status: "answered" | "skipped" | "failed";
  ms: number | null;
  error: string | null;
  brief: string | null;
}

export function rowRole(row: ThreadMessageRow): "user" | "assistant" {
  return row.sender_kind === "human" ? "user" : "assistant";
}

export function rowToUiMessage(row: ThreadMessageRow): UIMessage {
  return {
    id: row.id,
    role: rowRole(row),
    parts: [{ type: "text", text: row.content ?? "" }],
  };
}

function messageTextOf(message: UIMessage): string {
  return message.parts
    .map((p) =>
      p.type === "text" ? (p as { type: "text"; text: string }).text : "",
    )
    .join("")
    .trim();
}

// The next poll cursor: the newest created_at across the given rows, or the
// previous cursor when no row carries a newer timestamp.
export function nextCursor(
  rows: ThreadMessageRow[],
  previous: string | null,
): string | null {
  let cursor = previous;
  for (const row of rows) {
    const at = row.created_at ?? null;
    if (!at || Number.isNaN(Date.parse(at))) continue;
    if (!cursor || Date.parse(at) > Date.parse(cursor)) cursor = at;
  }
  return cursor;
}

export interface MergeResult {
  messages: UIMessage[];
  // The polled rows that were genuinely new (not already shown locally).
  added: ThreadMessageRow[];
}

// Merge polled rows into the current message list without duplicating turns
// the client already shows. Appends in row order (the server returns
// created_at asc), which keeps the shared stream consistent for everyone.
export function mergeThreadRows(
  existing: UIMessage[],
  rows: ThreadMessageRow[],
): MergeResult {
  if (rows.length === 0) return { messages: existing, added: [] };

  const knownIds = new Set(existing.map((m) => m.id));
  const knownTexts = new Set(
    existing.map((m) => `${m.role}\n${messageTextOf(m)}`),
  );

  const added: ThreadMessageRow[] = [];
  for (const row of rows) {
    if (knownIds.has(row.id)) continue;
    const textKey = `${rowRole(row)}\n${(row.content ?? "").trim()}`;
    if (knownTexts.has(textKey)) continue;
    knownIds.add(row.id);
    knownTexts.add(textKey);
    added.push(row);
  }

  if (added.length === 0) return { messages: existing, added: [] };
  return {
    messages: [...existing, ...added.map(rowToUiMessage)],
    added,
  };
}

// Whether a thread should show an unread indicator in the sessions rail.
// Mirrors the read-cursor model used by mainstream chat clients: a shared
// room is unread when it changed after the caller's last_read_at stamp.
// Solo threads never show unread (only this client writes to them), and the
// currently open thread is considered read.
export function isThreadUnread(
  thread: {
    id: string;
    shared?: boolean;
    updated_at: string;
    my_last_read_at?: string | null;
  },
  activeThreadId: string | null,
): boolean {
  if (!thread.shared) return false;
  if (thread.id === activeThreadId) return false;
  const updated = Date.parse(thread.updated_at);
  if (Number.isNaN(updated)) return false;
  const lastRead = thread.my_last_read_at
    ? Date.parse(thread.my_last_read_at)
    : NaN;
  if (Number.isNaN(lastRead)) return true;
  return updated > lastRead;
}

// Parse a persisted council run receipt out of a message row's metadata.
// Returns [] for anything that is not a well-formed receipt.
export function councilReceiptFromMetadata(
  metadata: Record<string, unknown> | null | undefined,
): CouncilReceiptSeat[] {
  const raw = metadata?.council;
  if (!Array.isArray(raw)) return [];
  const out: CouncilReceiptSeat[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const seat = entry as Record<string, unknown>;
    const status = seat.status;
    if (status !== "answered" && status !== "skipped" && status !== "failed")
      continue;
    out.push({
      label: typeof seat.label === "string" ? seat.label : "",
      handle: typeof seat.handle === "string" ? seat.handle : "",
      slug: typeof seat.slug === "string" ? seat.slug : "",
      model: typeof seat.model === "string" ? seat.model : "",
      status,
      ms: typeof seat.ms === "number" ? seat.ms : null,
      error: typeof seat.error === "string" ? seat.error : null,
      brief: typeof seat.brief === "string" ? seat.brief : null,
    });
  }
  return out;
}

// True when a completed stream ended without a visible answer: the last
// message is an assistant turn with no text (a tool-call loop that ran out
// of steps, a provider that closed the stream early) or the assistant never
// produced a turn at all. Used to show an honest "stopped without a final
// answer" notice instead of silently dropping the turn.
export function streamEndedSilently(
  messages: UIMessage[],
  hadError: boolean,
): boolean {
  if (hadError) return false; // the error line already explains the outcome
  const last = messages[messages.length - 1];
  if (!last) return false;
  if (last.role === "user") return true;
  if (last.role !== "assistant") return false;
  return messageTextOf(last).length === 0;
}
