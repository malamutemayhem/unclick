// ============================================================
// Chat threads (sessions) CRUD
//
// Persistent chat sessions for the website chat. Reuses the existing
// chat_threads + chat_thread_messages tables (migration 20260624000000).
// Assistant turns are still written by api/chat.ts onFinish; this endpoint
// covers everything else the UI needs:
//
//   GET    ?action=list                       -> list this account's threads
//   POST   ?action=create   {title?, kind?}   -> create a thread
//   GET    ?action=messages&thread_id=...      -> load a thread's messages
//   POST   ?action=append   {thread_id, content, sender_id?}
//                                              -> persist a human turn (auto-titles)
//   POST   ?action=update   {thread_id, title?, pinned?}
//                                              -> rename / pin (pinned in metadata)
//   POST   ?action=delete   {thread_id}        -> delete a thread + its messages
//
// Tenancy: every row is scoped to the caller's stable account lane
// (lane_hash ?? key_hash) via resolveAccountLane - the same key api/chat.ts
// and memory-admin use. A logged-in session is enough; no raw key needed.
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveAccountLane } from "./lib/account-lane.js";

function sbHeaders(serviceKey: string): Record<string, string> {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

function trimTitle(raw: string): string {
  const s = raw.replace(/\s+/g, " ").trim();
  if (!s) return "New chat";
  return s.length > 60 ? `${s.slice(0, 59)}...` : s;
}

interface ThreadRow {
  id: string;
  title: string | null;
  kind: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

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

  const lane = await resolveAccountLane(req.headers.authorization, supabaseUrl, serviceKey);
  if (!lane) return res.status(401).json({ error: "Sign in to use chat sessions." });

  const action = String((req.query.action ?? "") || "").trim();
  const rest = `${supabaseUrl}/rest/v1`;
  const scope = `api_key_hash=eq.${encodeURIComponent(lane)}`;

  // ── GET list ──────────────────────────────────────────────────────
  if (req.method === "GET" && action === "list") {
    const url =
      `${rest}/chat_threads?${scope}` +
      `&select=id,title,kind,metadata,created_at,updated_at` +
      `&order=updated_at.desc&limit=200`;
    const r = await fetch(url, { headers: sbHeaders(serviceKey) });
    if (!r.ok) return res.status(502).json({ error: "Failed to list sessions." });
    const rows = ((await r.json().catch(() => [])) as ThreadRow[]) || [];
    // Pinned first (metadata.pinned), then most-recently-updated.
    const threads = rows
      .map((t) => ({
        id: t.id,
        title: t.title || "New chat",
        kind: t.kind || "agent",
        pinned: Boolean(t.metadata && (t.metadata as { pinned?: boolean }).pinned),
        created_at: t.created_at,
        updated_at: t.updated_at,
      }))
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return a.updated_at < b.updated_at ? 1 : -1;
      });
    return res.status(200).json({ threads });
  }

  // ── GET messages ────────────────────────────────────────────────
  if (req.method === "GET" && action === "messages") {
    const threadId = String((req.query.thread_id ?? "") || "").trim();
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    const url =
      `${rest}/chat_thread_messages?${scope}` +
      `&thread_id=eq.${encodeURIComponent(threadId)}` +
      `&select=id,sender_id,sender_kind,seat_lane,model,content,status,created_at` +
      `&order=created_at.asc&limit=2000`;
    const r = await fetch(url, { headers: sbHeaders(serviceKey) });
    if (!r.ok) return res.status(502).json({ error: "Failed to load messages." });
    const messages = (await r.json().catch(() => [])) as unknown[];
    return res.status(200).json({ messages: Array.isArray(messages) ? messages : [] });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // ── POST create ────────────────────────────────────────────────
  if (action === "create") {
    const title = typeof body.title === "string" && body.title.trim() ? trimTitle(body.title) : "New chat";
    const kind = typeof body.kind === "string" && body.kind.trim() ? body.kind.trim() : "agent";
    const now = new Date().toISOString();
    const r = await fetch(`${rest}/chat_threads`, {
      method: "POST",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=representation" },
      body: JSON.stringify({
        api_key_hash: lane,
        kind,
        title,
        created_by: "web",
        participants: [],
        metadata: {},
        created_at: now,
        updated_at: now,
      }),
    });
    if (!r.ok) {
      const detail = (await r.text().catch(() => "")).slice(0, 200);
      return res.status(r.status).json({ error: "Failed to create session.", detail });
    }
    const rows = (await r.json().catch(() => [])) as ThreadRow[];
    const row = rows[0];
    return res.status(200).json({ id: row?.id, title: row?.title ?? title, created_at: row?.created_at });
  }

  // ── POST append (persist a human turn; auto-title on first message) ──────────
  if (action === "append") {
    const threadId = typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    const content = typeof body.content === "string" ? body.content : "";
    const senderId = typeof body.sender_id === "string" && body.sender_id.trim() ? body.sender_id.trim() : "you";
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    if (!content.trim()) return res.status(400).json({ error: "content is required." });

    const now = new Date().toISOString();
    const insert = await fetch(`${rest}/chat_thread_messages`, {
      method: "POST",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify({
        api_key_hash: lane,
        thread_id: threadId,
        sender_id: senderId,
        sender_kind: "human",
        content,
        status: "complete",
        created_at: now,
      }),
    });
    if (!insert.ok) {
      const detail = (await insert.text().catch(() => "")).slice(0, 200);
      return res.status(insert.status).json({ error: "Failed to save message.", detail });
    }

    // Touch updated_at, and auto-title from the first human turn if still default.
    const cur = await fetch(
      `${rest}/chat_threads?${scope}&id=eq.${encodeURIComponent(threadId)}&select=title`,
      { headers: sbHeaders(serviceKey) },
    );
    const curRows = cur.ok ? ((await cur.json().catch(() => [])) as Array<{ title: string | null }>) : [];
    const patch: Record<string, unknown> = { updated_at: now };
    const existingTitle = curRows[0]?.title;
    if (!existingTitle || existingTitle === "New chat") patch.title = trimTitle(content);
    await fetch(`${rest}/chat_threads?${scope}&id=eq.${encodeURIComponent(threadId)}`, {
      method: "PATCH",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify(patch),
    }).catch(() => {});

    return res.status(200).json({ success: true, title: patch.title ?? existingTitle ?? "New chat" });
  }

  // ── POST update (rename / pin) ──────────────────────────────────────
  if (action === "update") {
    const threadId = typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.title === "string" && body.title.trim()) patch.title = trimTitle(body.title);
    if (typeof body.pinned === "boolean") {
      // Merge the pinned flag into metadata without clobbering other keys.
      const cur = await fetch(
        `${rest}/chat_threads?${scope}&id=eq.${encodeURIComponent(threadId)}&select=metadata`,
        { headers: sbHeaders(serviceKey) },
      );
      const rows = cur.ok ? ((await cur.json().catch(() => [])) as Array<{ metadata: Record<string, unknown> | null }>) : [];
      patch.metadata = { ...(rows[0]?.metadata ?? {}), pinned: body.pinned };
    }
    const r = await fetch(`${rest}/chat_threads?${scope}&id=eq.${encodeURIComponent(threadId)}`, {
      method: "PATCH",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify(patch),
    });
    if (!r.ok) return res.status(r.status).json({ error: "Failed to update session." });
    return res.status(200).json({ success: true });
  }

  // ── POST delete (thread + its messages) ───────────────────────────────
  if (action === "delete") {
    const threadId = typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    await fetch(
      `${rest}/chat_thread_messages?${scope}&thread_id=eq.${encodeURIComponent(threadId)}`,
      { method: "DELETE", headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" } },
    ).catch(() => {});
    const r = await fetch(`${rest}/chat_threads?${scope}&id=eq.${encodeURIComponent(threadId)}`, {
      method: "DELETE",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
    });
    if (!r.ok) return res.status(r.status).json({ error: "Failed to delete session." });
    return res.status(200).json({ success: true });
  }

  return res.status(400).json({ error: "Unknown action." });
}
