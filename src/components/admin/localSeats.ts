// ============================================================
// Local seats (client helpers)
//
// A local seat answers from a model running on THIS computer via
// the local engine (Ollama). No API key, no subscription, no
// server round-trip for the answer itself: the browser talks to
// http://localhost:11434 directly, so the conversation content
// never leaves the machine.
//
// The reply is then persisted to the shared thread through
// /api/chat-threads?action=append (sender_kind "agent",
// seat_lane "local") so the room history survives reloads, the
// same way bridge turns do for subscription seats.
// ============================================================

import {
  LOCAL_ENGINE_URL,
  friendlyModelName,
  normalizeModelTag,
} from "@/components/admin/localModels";

export const LOCAL_SEAT_SLUG = "local";

// Minimal structural seat shape shared with ChatMemberRail's AiSeat, so this
// module never imports a React component.
export interface LocalSeatShape {
  id: string;
  slug: string;
  model: string;
  label: string;
  handle: string;
  active: boolean;
  lane?: "api" | "subscription" | "local";
  runtime?: string;
}

export function isLocalSeat(seat: { lane?: string }): boolean {
  return seat.lane === "local";
}

// Handles follow the chat's mention rule (letters, digits, dots). Built from
// the friendly name so "@EverydayHelper" reads better than "@llama3.23b".
export function makeLocalHandle(model: string, takenHandles: string[]): string {
  const base =
    friendlyModelName(model).replace(/[^A-Za-z0-9.]/g, "") || "LocalModel";
  if (!takenHandles.includes(base)) return base;
  let n = 2;
  while (takenHandles.includes(`${base}${n}`)) n += 1;
  return `${base}${n}`;
}

export function newLocalSeat(
  model: string,
  takenHandles: string[],
): LocalSeatShape {
  const tag = normalizeModelTag(model);
  return {
    id: crypto.randomUUID(),
    slug: LOCAL_SEAT_SLUG,
    model: tag,
    label: friendlyModelName(tag),
    handle: makeLocalHandle(tag, takenHandles),
    active: true,
    lane: "local",
  };
}

// ─── engine presence + installed models ──────────────────────

export interface InstalledLocalModel {
  name: string;
  sizeBytes: number;
}

// List the models installed on this computer. Null means the engine is not
// reachable from this browser (not running, or blocking this site).
export async function listInstalledLocalModels(
  url: string = LOCAL_ENGINE_URL,
  fetchFn: typeof fetch = fetch,
  timeoutMs = 3000,
): Promise<InstalledLocalModel[] | null> {
  try {
    const r = await fetchFn(`${url}/api/tags`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!r.ok) return null;
    const body = (await r.json()) as {
      models?: Array<{ name?: string; size?: number }>;
    };
    const rows = Array.isArray(body.models) ? body.models : [];
    return rows
      .filter((m): m is { name: string; size?: number } => Boolean(m.name))
      .map((m) => ({ name: m.name, sizeBytes: m.size ?? 0 }));
  } catch {
    return null;
  }
}

export async function pingLocalEngine(
  url: string = LOCAL_ENGINE_URL,
  fetchFn: typeof fetch = fetch,
): Promise<boolean> {
  return (await listInstalledLocalModels(url, fetchFn)) !== null;
}

// ─── transcript for the local engine ─────────────────────────

export interface LocalChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Fold the visible chat history plus the new human message into the shape
// the engine expects. Other seats' replies keep a small [name] prefix so the
// model can follow a room with several voices. Only the newest turns ride.
export function toLocalMessages(
  prior: Array<{ role: "user" | "assistant"; text: string; author?: string }>,
  newUserText: string,
  cap = 30,
): LocalChatMessage[] {
  const turns: LocalChatMessage[] = prior
    .filter((t) => t.text.trim())
    .map((t) => ({
      role: t.role,
      content:
        t.role === "assistant" && t.author ? `[${t.author}] ${t.text}` : t.text,
    }));
  if (newUserText.trim()) {
    turns.push({ role: "user", content: newUserText });
  }
  return turns.slice(-cap);
}

// ─── one chat turn on the local engine ───────────────────────

export interface LocalTurnOutcome {
  ok: boolean;
  content?: string;
  error?: string;
  // True when the engine could not be reached at all (vs a model error),
  // so the UI can show the "open the app" hint instead of a raw failure.
  offline?: boolean;
}

// Run one turn on the local engine, streaming NDJSON until done. Local
// generation on a modest machine can take a while, so the deadline is
// generous; the reply is returned whole once the stream ends.
export async function runLocalChatTurn(opts: {
  model: string;
  messages: LocalChatMessage[];
  url?: string;
  fetchFn?: typeof fetch;
  timeoutMs?: number;
}): Promise<LocalTurnOutcome> {
  const url = opts.url ?? LOCAL_ENGINE_URL;
  const fetchFn = opts.fetchFn ?? fetch;
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    opts.timeoutMs ?? 5 * 60 * 1000,
  );

  try {
    const res = await fetchFn(`${url}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: opts.model,
        messages: opts.messages,
        stream: true,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 200);
      return {
        ok: false,
        error:
          res.status === 404
            ? `The model "${opts.model}" is not installed on this computer anymore.`
            : detail || `The local engine answered with status ${res.status}.`,
      };
    }

    const reader = res.body?.getReader();
    if (!reader) {
      return { ok: false, error: "The local engine sent an empty reply." };
    }

    const decoder = new TextDecoder();
    let buffer = "";
    let content = "";
    let engineError: string | null = null;

    const consume = (line: string) => {
      if (!line.trim()) return;
      try {
        const msg = JSON.parse(line) as {
          message?: { content?: string };
          error?: string;
        };
        if (typeof msg.error === "string" && msg.error) engineError = msg.error;
        if (msg.message?.content) content += msg.message.content;
      } catch {
        // ignore malformed lines
      }
    };

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) consume(line);
    }
    consume(buffer);

    if (engineError) return { ok: false, error: engineError };
    if (!content.trim()) {
      return { ok: false, error: "The local model returned no text." };
    }
    return { ok: true, content };
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      return {
        ok: false,
        error:
          "The local model took too long to answer. A smaller model may suit this machine better.",
      };
    }
    return {
      ok: false,
      offline: true,
      error:
        "I could not reach the local engine on this computer. Open the Ollama app (or start it), then try again.",
    };
  } finally {
    clearTimeout(timer);
  }
}
