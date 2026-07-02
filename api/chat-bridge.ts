// ============================================================
// Chat subscription-lane bridge endpoint
//
// The subscription seat lane answers a chat turn on the user's OWN
// consumer plan (Claude Pro/Max via the Claude Code CLI, ChatGPT
// Plus/Pro via the Codex CLI). There is no provider API for those
// plans, so the server NEVER calls a provider here. Instead:
//
//   1. The browser enqueues the turn        POST ?action=enqueue
//   2. A local bridge worker on the user's
//      machine claims it and heartbeats     POST ?action=poll
//   3. The worker runs the signed-in CLI
//      headless and posts the reply         POST ?action=complete
//   4. The browser polls for the result     GET  ?action=status
//   5. The member rail shows presence       GET  ?action=seats
//
// The bridge worker ships inside @unclick/mcp-server
// (npx @unclick/mcp-server seat-bridge) and authenticates like any
// other worker with the account's uc_/agt_ key or session.
//
// Security invariants (do not weaken):
//  - No provider credential, OAuth token, or CLI session material
//    ever reaches this endpoint or its tables. Jobs carry composed
//    prompt text and the reply, nothing else.
//  - Every op resolves the caller to their stable account lane via
//    resolveAccountLane and scopes every row by that lane. A bridge
//    can only claim jobs on its own lane.
//  - When a thread_id is supplied, room access is re-checked with
//    resolveThreadPersistenceLane before any job is enqueued, and
//    the finished turn persists under the thread owner's lane,
//    matching api/chat.ts.
//  - This lane makes no provider call, so the api-lane spend gate
//    (decideChatProviderCall) is not consulted; there is no spend.
//  - CORS is pinned to https://unclick.world.
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveAccountLane } from "./lib/account-lane.js";
import { resolveThreadPersistenceLane } from "./lib/chat-room-access.js";
import { fetchMemoryBlock } from "./lib/chat-memory.js";
import { redactSensitive } from "./lib/orchestrator-context.js";

// ─── constants ───────────────────────────────────────────────

export const BRIDGE_RUNTIMES = ["claude-code", "codex-cli"] as const;
export type BridgeRuntime = (typeof BRIDGE_RUNTIMES)[number];

// A pending job older than this is expired instead of answered, so a
// bridge that comes online hours later does not replay a dead room.
export const PENDING_JOB_TTL_MS = 15 * 60 * 1000;

// A bridge that heartbeated within this window counts as online. The
// worker polls every ~5s, so 60s tolerates transient hiccups.
export const BRIDGE_ONLINE_WINDOW_MS = 60 * 1000;

const MAX_MESSAGES = 40;
const MAX_MESSAGE_CHARS = 8_000;
const MAX_TRANSCRIPT_CHARS = 24_000;
const HANDLE_RE = /^[a-z0-9][a-z0-9_-]{0,39}$/;

// ─── pure, testable helpers ──────────────────────────────────

export interface BridgeTranscriptMessage {
  role: "user" | "assistant" | "system";
  content: string;
  author?: string;
}

export interface EnqueueRequest {
  seat_handle: string;
  runtime: BridgeRuntime;
  thread_id?: string;
  messages: BridgeTranscriptMessage[];
}

export function isBridgeRuntime(value: unknown): value is BridgeRuntime {
  return (
    typeof value === "string" &&
    (BRIDGE_RUNTIMES as readonly string[]).includes(value)
  );
}

export function validateEnqueueRequest(
  body: unknown,
): { error: string } | EnqueueRequest {
  const b = (body ?? {}) as Record<string, unknown>;
  const handle = typeof b.seat_handle === "string" ? b.seat_handle.trim() : "";
  if (!HANDLE_RE.test(handle)) {
    return { error: "seat_handle must be 1-40 chars of a-z 0-9 - _" };
  }
  if (!isBridgeRuntime(b.runtime)) {
    return { error: "runtime must be claude-code or codex-cli" };
  }
  if (!Array.isArray(b.messages) || b.messages.length === 0) {
    return { error: "messages is required" };
  }
  const messages: BridgeTranscriptMessage[] = [];
  for (const raw of b.messages.slice(-MAX_MESSAGES)) {
    const m = (raw ?? {}) as Record<string, unknown>;
    const role =
      m.role === "user" || m.role === "assistant" || m.role === "system"
        ? m.role
        : null;
    const content = typeof m.content === "string" ? m.content.trim() : "";
    if (!role || !content) continue;
    messages.push({
      role,
      content: content.slice(0, MAX_MESSAGE_CHARS),
      author:
        typeof m.author === "string" && m.author.trim()
          ? m.author.trim().slice(0, 80)
          : undefined,
    });
  }
  if (messages.length === 0) {
    return { error: "messages contained no usable turns" };
  }
  const out: EnqueueRequest = {
    seat_handle: handle,
    runtime: b.runtime,
    messages,
  };
  if (typeof b.thread_id === "string" && b.thread_id.trim()) {
    out.thread_id = b.thread_id.trim();
  }
  return out;
}

// Render the room transcript into one prompt string for a headless CLI
// turn. Newest turns win when the cap trims: we keep the tail.
export function renderBridgePrompt(
  messages: BridgeTranscriptMessage[],
): string {
  const lines = messages.map((m) => {
    const who =
      m.role === "user"
        ? m.author
          ? `Human (${m.author})`
          : "Human"
        : m.role === "assistant"
          ? m.author
            ? `Seat (${m.author})`
            : "Seat"
          : "System note";
    return `${who}:\n${m.content}`;
  });
  let transcript = lines.join("\n\n");
  if (transcript.length > MAX_TRANSCRIPT_CHARS) {
    transcript = transcript.slice(transcript.length - MAX_TRANSCRIPT_CHARS);
  }
  return [
    "You are answering the newest human message in the chat room transcript below.",
    "Reply with your answer only: no preamble about being a CLI, no restating the transcript.",
    "",
    "--- transcript ---",
    transcript,
    "--- end transcript ---",
    "",
    "Your reply to the newest human message:",
  ].join("\n");
}

// The seat preamble mirrors the api lane's framing (see api/chat.ts) but
// is tuned for a headless CLI turn: the CLI already has its own tools on
// the user's machine, so the instruction is to answer, not to act.
export function composeBridgeSystem(opts: {
  runtime: BridgeRuntime;
  seatHandle: string;
  memoryBlock: string;
}): string {
  const runtimeLabel =
    opts.runtime === "claude-code"
      ? "the Claude Code CLI on the operator's Claude subscription"
      : "the Codex CLI on the operator's ChatGPT subscription";
  const parts = [
    `You are the AI seat "@${opts.seatHandle}" inside UnClick, the user's AI operating system. ` +
      `This turn runs through ${runtimeLabel}, on the user's own machine and plan. ` +
      "If asked whether you are connected to UnClick, the answer is yes: you are answering a turn from their UnClick chat room. " +
      "Answer the chat turn directly and conversationally in markdown. " +
      "Do not run commands, edit files, or take actions on the machine for this turn; it is a chat reply, not a coding task. " +
      "Never fabricate tool results or capabilities.",
  ];
  if (opts.memoryBlock) {
    parts.push(`The user's UnClick memory:\n\n${opts.memoryBlock}`);
  }
  return parts.join("\n\n");
}

export function isBridgeOnline(
  lastSeenIso: string | null | undefined,
  nowMs: number,
): boolean {
  if (!lastSeenIso) return false;
  const seen = Date.parse(lastSeenIso);
  if (Number.isNaN(seen)) return false;
  return nowMs - seen <= BRIDGE_ONLINE_WINDOW_MS;
}

// ─── supabase REST (service role) ────────────────────────────

function sbHeaders(serviceKey: string): Record<string, string> {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

interface SeatRow {
  id: string;
  runtime: string;
  handle: string;
  label: string | null;
  last_seen_at: string | null;
}

interface JobRow {
  id: string;
  api_key_hash: string;
  persist_lane: string | null;
  thread_id: string | null;
  seat_handle: string;
  runtime: string;
  status: string;
  system: string | null;
  prompt: string;
  result_content: string | null;
  error: string | null;
  created_at: string;
}

async function fetchSeat(
  rest: string,
  serviceKey: string,
  lane: string,
  handle: string,
): Promise<SeatRow | null> {
  const r = await fetch(
    `${rest}/chat_bridge_seats?api_key_hash=eq.${encodeURIComponent(lane)}` +
      `&handle=eq.${encodeURIComponent(handle)}` +
      `&select=id,runtime,handle,label,last_seen_at&limit=1`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!r.ok) return null;
  const rows = (await r.json().catch(() => [])) as SeatRow[];
  return rows[0] ?? null;
}

// Persist the finished subscription turn into the thread, mirroring the
// api lane's persistAssistantTurn (api/chat.ts). Best-effort: a persistence
// hiccup never fails the complete call; the job row still holds the result.
async function persistBridgeTurn(opts: {
  rest: string;
  serviceKey: string;
  lane: string;
  threadId: string;
  seatHandle: string;
  runtime: string;
  content: string;
}): Promise<void> {
  try {
    const safeContent = redactSensitive(opts.content);
    if (!safeContent.trim()) return;
    const saved = await fetch(`${opts.rest}/chat_thread_messages`, {
      method: "POST",
      headers: { ...sbHeaders(opts.serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify({
        api_key_hash: opts.lane,
        thread_id: opts.threadId,
        sender_id: opts.seatHandle,
        sender_kind: "agent",
        seat_lane: "subscription",
        model: opts.runtime,
        content: opts.content,
        status: "complete",
      }),
    });
    if (!saved.ok) return;
    await fetch(
      `${opts.rest}/chat_threads?id=eq.${encodeURIComponent(opts.threadId)}`,
      {
        method: "PATCH",
        headers: { ...sbHeaders(opts.serviceKey), Prefer: "return=minimal" },
        body: JSON.stringify({ updated_at: new Date().toISOString() }),
      },
    ).catch(() => {});
    await fetch(`${opts.rest}/mc_conversation_log`, {
      method: "POST",
      headers: { ...sbHeaders(opts.serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify({
        api_key_hash: opts.lane,
        session_id: `chat:${opts.threadId}`,
        role: "assistant",
        content: safeContent,
        has_code: /```/.test(opts.content),
      }),
    }).catch(() => {});
  } catch {
    // best effort
  }
}

// ─── handler ─────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Cache-Control", "private, no-store");
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: "Server not configured." });
  }

  const lane = await resolveAccountLane(
    req.headers.authorization,
    supabaseUrl,
    serviceKey,
  );
  if (!lane) {
    return res.status(401).json({ error: "Sign in to use the seat bridge." });
  }

  const action = String((req.query.action ?? "") || "").trim();
  const rest = `${supabaseUrl}/rest/v1`;
  const scope = `api_key_hash=eq.${encodeURIComponent(lane)}`;
  const nowIso = () => new Date().toISOString();

  // ── GET seats: registered bridges + presence (member rail) ──
  if (req.method === "GET" && action === "seats") {
    const r = await fetch(
      `${rest}/chat_bridge_seats?${scope}` +
        `&select=id,runtime,handle,label,last_seen_at&order=created_at.asc&limit=50`,
      { headers: sbHeaders(serviceKey) },
    );
    if (!r.ok) return res.status(502).json({ error: "Failed to list bridge seats." });
    const rows = (await r.json().catch(() => [])) as SeatRow[];
    const now = Date.now();
    return res.status(200).json({
      seats: rows.map((s) => ({
        handle: s.handle,
        runtime: s.runtime,
        label: s.label,
        last_seen_at: s.last_seen_at,
        online: isBridgeOnline(s.last_seen_at, now),
      })),
    });
  }

  // ── GET status: browser polls one job it enqueued ──
  if (req.method === "GET" && action === "status") {
    const jobId = String((req.query.job_id ?? "") || "").trim();
    if (!/^[0-9a-fA-F-]{36}$/.test(jobId)) {
      return res.status(400).json({ error: "job_id is required" });
    }
    const r = await fetch(
      `${rest}/chat_bridge_jobs?${scope}&id=eq.${encodeURIComponent(jobId)}` +
        `&select=id,status,result_content,error,thread_id,seat_handle,runtime&limit=1`,
      { headers: sbHeaders(serviceKey) },
    );
    if (!r.ok) return res.status(502).json({ error: "Failed to read job." });
    const rows = (await r.json().catch(() => [])) as JobRow[];
    const job = rows[0];
    if (!job) return res.status(404).json({ error: "Job not found." });
    return res.status(200).json({
      id: job.id,
      status: job.status,
      result_content: job.status === "done" ? job.result_content : null,
      error: job.error,
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST required" });
  }

  // ── POST enqueue: browser queues a subscription seat turn ──
  if (action === "enqueue") {
    const parsed = validateEnqueueRequest(req.body);
    if ("error" in parsed) return res.status(400).json({ error: parsed.error });

    let persistLane: string | null = null;
    if (parsed.thread_id) {
      persistLane = await resolveThreadPersistenceLane(
        supabaseUrl,
        serviceKey,
        parsed.thread_id,
        lane,
      );
      if (!persistLane) {
        return res.status(403).json({ error: "Not a member of this chat room." });
      }
    }

    // Ground the seat in the caller's UnClick memory (best-effort, like
    // the api lane).
    const memoryBlock = await fetchMemoryBlock(supabaseUrl, serviceKey, lane);
    const system = composeBridgeSystem({
      runtime: parsed.runtime,
      seatHandle: parsed.seat_handle,
      memoryBlock,
    });
    const prompt = renderBridgePrompt(parsed.messages);

    const insert = await fetch(`${rest}/chat_bridge_jobs`, {
      method: "POST",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=representation" },
      body: JSON.stringify({
        api_key_hash: lane,
        persist_lane: persistLane,
        thread_id: parsed.thread_id ?? null,
        seat_handle: parsed.seat_handle,
        runtime: parsed.runtime,
        status: "pending",
        system,
        prompt,
      }),
    });
    if (!insert.ok) {
      return res.status(502).json({ error: "Failed to enqueue the turn." });
    }
    const rows = (await insert.json().catch(() => [])) as JobRow[];
    const job = rows[0];
    if (!job) return res.status(502).json({ error: "Failed to enqueue the turn." });

    const seat = await fetchSeat(rest, serviceKey, lane, parsed.seat_handle);
    const now = Date.now();
    return res.status(200).json({
      job_id: job.id,
      bridge: {
        registered: Boolean(seat),
        online: isBridgeOnline(seat?.last_seen_at, now),
        last_seen_at: seat?.last_seen_at ?? null,
      },
    });
  }

  // ── POST poll: local bridge heartbeats and claims one job ──
  if (action === "poll") {
    const b = (req.body ?? {}) as Record<string, unknown>;
    const handle = typeof b.handle === "string" ? b.handle.trim() : "";
    if (!HANDLE_RE.test(handle)) {
      return res.status(400).json({ error: "handle must be 1-40 chars of a-z 0-9 - _" });
    }
    if (!isBridgeRuntime(b.runtime)) {
      return res.status(400).json({ error: "runtime must be claude-code or codex-cli" });
    }
    const label =
      typeof b.label === "string" && b.label.trim()
        ? b.label.trim().slice(0, 120)
        : null;

    // Heartbeat: upsert the seat row on (api_key_hash, handle).
    const upsert = await fetch(
      `${rest}/chat_bridge_seats?on_conflict=api_key_hash,handle`,
      {
        method: "POST",
        headers: {
          ...sbHeaders(serviceKey),
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({
          api_key_hash: lane,
          handle,
          runtime: b.runtime,
          label,
          last_seen_at: nowIso(),
          updated_at: nowIso(),
        }),
      },
    );
    if (!upsert.ok) {
      return res.status(502).json({ error: "Failed to register the bridge." });
    }

    // Expire pending jobs that outlived the TTL before claiming, so a
    // late bridge never answers a dead turn. Best-effort.
    const cutoffIso = new Date(Date.now() - PENDING_JOB_TTL_MS).toISOString();
    await fetch(
      `${rest}/chat_bridge_jobs?${scope}&status=eq.pending` +
        `&created_at=lt.${encodeURIComponent(cutoffIso)}`,
      {
        method: "PATCH",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
        body: JSON.stringify({
          status: "error",
          error: "expired before a bridge claimed it",
          completed_at: nowIso(),
        }),
      },
    ).catch(() => {});

    // Oldest live pending job for this seat.
    const pendingRes = await fetch(
      `${rest}/chat_bridge_jobs?${scope}&seat_handle=eq.${encodeURIComponent(handle)}` +
        `&status=eq.pending&order=created_at.asc` +
        `&select=id,system,prompt,thread_id,runtime&limit=1`,
      { headers: sbHeaders(serviceKey) },
    );
    if (!pendingRes.ok) {
      return res.status(502).json({ error: "Failed to read the queue." });
    }
    const pending = (await pendingRes.json().catch(() => [])) as JobRow[];
    const candidate = pending[0];
    if (!candidate) return res.status(200).json({ job: null });

    // Claim with a conditional update; an empty representation means
    // another worker won the race.
    const claim = await fetch(
      `${rest}/chat_bridge_jobs?id=eq.${encodeURIComponent(candidate.id)}` +
        `&${scope}&status=eq.pending`,
      {
        method: "PATCH",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=representation" },
        body: JSON.stringify({ status: "claimed", claimed_at: nowIso() }),
      },
    );
    if (!claim.ok) return res.status(200).json({ job: null });
    const claimed = (await claim.json().catch(() => [])) as JobRow[];
    if (!claimed[0]) return res.status(200).json({ job: null });

    return res.status(200).json({
      job: {
        id: claimed[0].id,
        system: claimed[0].system,
        prompt: claimed[0].prompt,
        thread_id: claimed[0].thread_id,
        runtime: claimed[0].runtime,
      },
    });
  }

  // ── POST complete: bridge posts the CLI's reply (or failure) ──
  if (action === "complete") {
    const b = (req.body ?? {}) as Record<string, unknown>;
    const jobId = typeof b.job_id === "string" ? b.job_id.trim() : "";
    if (!/^[0-9a-fA-F-]{36}$/.test(jobId)) {
      return res.status(400).json({ error: "job_id is required" });
    }
    const content =
      typeof b.content === "string" && b.content.trim() ? b.content.trim() : null;
    const errText =
      typeof b.error === "string" && b.error.trim()
        ? redactSensitive(b.error.trim()).slice(0, 500)
        : null;
    if (!content && !errText) {
      return res.status(400).json({ error: "content or error is required" });
    }

    const jobRes = await fetch(
      `${rest}/chat_bridge_jobs?${scope}&id=eq.${encodeURIComponent(jobId)}` +
        `&select=id,status,thread_id,seat_handle,runtime,persist_lane&limit=1`,
      { headers: sbHeaders(serviceKey) },
    );
    if (!jobRes.ok) return res.status(502).json({ error: "Failed to read job." });
    const jobs = (await jobRes.json().catch(() => [])) as JobRow[];
    const job = jobs[0];
    if (!job) return res.status(404).json({ error: "Job not found." });
    if (job.status === "done" || job.status === "error") {
      return res.status(409).json({ error: "Job already finished." });
    }

    const patch = await fetch(
      `${rest}/chat_bridge_jobs?id=eq.${encodeURIComponent(jobId)}&${scope}`,
      {
        method: "PATCH",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
        body: JSON.stringify(
          content
            ? {
                status: "done",
                result_content: content,
                completed_at: nowIso(),
              }
            : { status: "error", error: errText, completed_at: nowIso() },
        ),
      },
    );
    if (!patch.ok) {
      return res.status(502).json({ error: "Failed to finish the job." });
    }

    if (content && job.thread_id) {
      await persistBridgeTurn({
        rest,
        serviceKey,
        lane: job.persist_lane ?? lane,
        threadId: job.thread_id,
        seatHandle: job.seat_handle,
        runtime: job.runtime,
        content,
      });
    }

    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ error: `Unknown action "${action}".` });
}
