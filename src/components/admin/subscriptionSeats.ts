// ============================================================
// Subscription seats (client helpers)
//
// A subscription seat answers on the user's OWN consumer plan instead
// of an API key. There is no provider API for Claude Pro/Max or
// ChatGPT Plus, so the turn is relayed to the official CLI that is
// already signed in on the user's machine:
//
//   claude-code -> Claude Code CLI  (Claude subscription)
//   codex-cli   -> Codex CLI        (ChatGPT subscription)
//
// The browser enqueues the turn on /api/chat-bridge; a local worker
// (npx @unclick/mcp-server seat-bridge) claims it, runs the CLI, and
// posts the reply, which the server persists into the thread with
// seat_lane = 'subscription'. These helpers keep that flow testable.
// ============================================================

export const CHAT_BRIDGE_ENDPOINT = "/api/chat-bridge";

export type SubscriptionRuntime = "claude-code" | "codex-cli";

export interface SubscriptionRuntimeOption {
  runtime: SubscriptionRuntime;
  label: string;
  cliName: string;
  planHint: string;
  defaultHandle: string;
}

export const SUBSCRIPTION_RUNTIMES: SubscriptionRuntimeOption[] = [
  {
    runtime: "claude-code",
    label: "Claude subscription",
    cliName: "Claude Code CLI",
    planHint: "Claude Pro / Max plan, signed in on your machine",
    defaultHandle: "claude-sub",
  },
  {
    runtime: "codex-cli",
    label: "ChatGPT subscription",
    cliName: "Codex CLI",
    planHint: "ChatGPT Plus / Pro plan, signed in on your machine",
    defaultHandle: "gpt-sub",
  },
];

// Minimal structural seat shape shared with ChatMemberRail's AiSeat, so this
// module never imports a React component.
export interface SubscriptionSeatShape {
  id: string;
  slug: string;
  model: string;
  label: string;
  handle: string;
  active: boolean;
  lane?: "api" | "subscription";
  runtime?: string;
}

export function isSubscriptionSeat(seat: { lane?: string }): boolean {
  return seat.lane === "subscription";
}

// Handles must satisfy the server's rule (^[a-z0-9][a-z0-9_-]{0,39}$) because
// the bridge worker registers under the same handle.
export function makeSubscriptionHandle(
  runtime: SubscriptionRuntime,
  takenHandles: string[],
): string {
  const base =
    SUBSCRIPTION_RUNTIMES.find((r) => r.runtime === runtime)?.defaultHandle ??
    "sub-seat";
  if (!takenHandles.includes(base)) return base;
  let n = 2;
  while (takenHandles.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

export function newSubscriptionSeat(
  runtime: SubscriptionRuntime,
  takenHandles: string[],
): SubscriptionSeatShape {
  const option = SUBSCRIPTION_RUNTIMES.find((r) => r.runtime === runtime);
  return {
    id: crypto.randomUUID(),
    slug: "subscription",
    model: runtime,
    label: option?.label ?? runtime,
    handle: makeSubscriptionHandle(runtime, takenHandles),
    active: true,
    lane: "subscription",
    runtime,
  };
}

// The one-liner the user runs on the machine where the CLI is signed in.
export function bridgeCommand(runtime: string, handle: string): string {
  return `npx @unclick/mcp-server seat-bridge --runtime ${runtime} --handle ${handle}`;
}

// ─── transcript for the bridge ───────────────────────────────

export interface BridgeTurn {
  role: "user" | "assistant" | "system";
  content: string;
  author?: string;
}

// Fold the visible chat history plus the new human message into the payload
// the bridge endpoint expects. Empty turns drop; only the newest turns ride.
export function toBridgeMessages(
  prior: Array<{ role: "user" | "assistant"; text: string; author?: string }>,
  newUserText: string,
  cap = 30,
): BridgeTurn[] {
  const turns: BridgeTurn[] = prior
    .filter((t) => t.text.trim())
    .map((t) => ({
      role: t.role,
      content: t.text,
      ...(t.author ? { author: t.author } : {}),
    }));
  if (newUserText.trim()) {
    turns.push({ role: "user", content: newUserText });
  }
  return turns.slice(-cap);
}

// ─── presence + job polling ──────────────────────────────────

export interface BridgeSeatPresence {
  handle: string;
  runtime: string;
  label: string | null;
  last_seen_at: string | null;
  online: boolean;
}

export async function fetchBridgeSeats(
  accessToken: string,
  fetchFn: typeof fetch = fetch,
): Promise<BridgeSeatPresence[] | null> {
  try {
    const r = await fetchFn(`${CHAT_BRIDGE_ENDPOINT}?action=seats`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!r.ok) return null;
    const body = (await r.json()) as { seats?: BridgeSeatPresence[] };
    return Array.isArray(body.seats) ? body.seats : [];
  } catch {
    return null;
  }
}

export interface BridgeJobOutcome {
  status: "done" | "error" | "timeout";
  content?: string;
  error?: string;
}

// Poll one enqueued job until it finishes. The server expires unclaimed jobs
// after 15 minutes; the browser gives up sooner and says so honestly.
export async function pollBridgeJob(opts: {
  jobId: string;
  headers: Record<string, string>;
  fetchFn?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
  intervalMs?: number;
  timeoutMs?: number;
}): Promise<BridgeJobOutcome> {
  const fetchFn = opts.fetchFn ?? fetch;
  const sleep =
    opts.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  const intervalMs = opts.intervalMs ?? 2_500;
  const timeoutMs = opts.timeoutMs ?? 6 * 60 * 1000;
  const startedAt = Date.now();

  for (;;) {
    if (Date.now() - startedAt >= timeoutMs) {
      return {
        status: "timeout",
        error:
          "No reply from the bridge in time. Check that the seat-bridge worker is running on your machine.",
      };
    }
    await sleep(intervalMs);
    try {
      const r = await fetchFn(
        `${CHAT_BRIDGE_ENDPOINT}?action=status&job_id=${encodeURIComponent(opts.jobId)}`,
        { headers: opts.headers },
      );
      if (!r.ok) continue; // transient read hiccups never kill the wait
      const body = (await r.json()) as {
        status?: string;
        result_content?: string | null;
        error?: string | null;
      };
      if (body.status === "done" && body.result_content) {
        return { status: "done", content: body.result_content };
      }
      if (body.status === "error") {
        return {
          status: "error",
          error: body.error ?? "The bridge reported a failure.",
        };
      }
    } catch {
      /* transient network error: keep polling until the timeout */
    }
  }
}
