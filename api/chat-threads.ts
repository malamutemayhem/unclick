// ============================================================
// Chat threads (sessions) CRUD + shared-room membership
//
// Persistent chat sessions for the website chat. Reuses the existing
// chat_threads + chat_thread_messages tables (migration 20260624000000).
// Assistant turns are still written by api/chat.ts onFinish; this endpoint
// covers everything else the UI needs:
//
//   GET    ?action=list                       -> threads the caller owns OR is an active member of
//   POST   ?action=create   {title?, kind?}   -> create a thread (rooms get an owner membership row)
//   GET    ?action=messages&thread_id=...      -> load a thread's messages (members only)
//   POST   ?action=append   {thread_id, content, sender_id?}
//                                              -> persist a human turn (auto-titles)
//   POST   ?action=update   {thread_id, title?, pinned?}
//                                              -> rename / pin (owner/admin only)
//   POST   ?action=delete   {thread_id}        -> delete a thread + its messages (owner/admin only)
//   POST   ?action=add_member    {thread_id, member_user_id}
//                                              -> add a human to a room (REQUIRES an accepted Circle link)
//   POST   ?action=remove_member {thread_id, member_user_id?, member_lane_hash?}
//                                              -> owner/admin sets a member's status to 'left'
//   GET    ?action=members&thread_id=...       -> list the room's membership rows
//
// Tenancy: every row is scoped to the caller's stable account lane
// (lane_hash ?? key_hash) via resolveAccountLane - the same key api/chat.ts
// and memory-admin use. A logged-in session is enough; no raw key needed.
//
// Shared rooms: a thread is accessible if the caller OWNS it
// (api_key_hash == lane) OR an ACTIVE chat_room_members row exists for
// (thread_id, lane). Solo 'agent' threads stay owner-scoped (no membership
// row). Membership is keyed on lane_hash; Circle is the permission authority
// for ever adding a second human.
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  resolveAccountLane,
  resolveCallerUserId,
  laneForUserId,
} from "./lib/account-lane.js";

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

interface ThreadOwnerRow {
  id: string;
  api_key_hash: string;
}

interface MemberRow {
  id: string;
  thread_id: string;
  member_lane_hash: string;
  role: "owner" | "admin" | "member";
  status: "invited" | "active" | "left";
}

type AccessRole = "owner" | "admin" | "member" | null;

// ── access helpers ────────────────────────────────────────────────
// All reads/writes authorize by ownership-or-membership, not by the
// owner-scope filter (a member does not own the thread row).

async function fetchThreadOwner(
  rest: string,
  serviceKey: string,
  threadId: string,
): Promise<ThreadOwnerRow | null> {
  const r = await fetch(
    `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}&select=id,api_key_hash&limit=1`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!r.ok) return null;
  const rows = (await r.json().catch(() => [])) as ThreadOwnerRow[];
  return Array.isArray(rows) ? rows[0] ?? null : null;
}

async function fetchActiveMember(
  rest: string,
  serviceKey: string,
  threadId: string,
  lane: string,
): Promise<MemberRow | null> {
  const r = await fetch(
    `${rest}/chat_room_members?thread_id=eq.${encodeURIComponent(threadId)}` +
      `&member_lane_hash=eq.${encodeURIComponent(lane)}` +
      `&status=eq.active&select=id,thread_id,member_lane_hash,role,status&limit=1`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!r.ok) return null;
  const rows = (await r.json().catch(() => [])) as MemberRow[];
  return Array.isArray(rows) ? rows[0] ?? null : null;
}

// Resolve the caller's role on a thread: owner (owns the row or has an
// owner membership row), admin/member (active membership), or null.
async function resolveAccessRole(
  rest: string,
  serviceKey: string,
  threadId: string,
  lane: string,
): Promise<AccessRole> {
  const owner = await fetchThreadOwner(rest, serviceKey, threadId);
  if (!owner) return null;
  if (owner.api_key_hash === lane) return "owner";
  const member = await fetchActiveMember(rest, serviceKey, threadId, lane);
  if (!member) return null;
  return member.role;
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
  // Threads the caller OWNS (api_key_hash == lane) UNION threads where the
  // caller is an ACTIVE member. Never leaks threads the caller is neither
  // owner nor member of.
  if (req.method === "GET" && action === "list") {
    const ownedUrl =
      `${rest}/chat_threads?${scope}` +
      `&select=id,title,kind,metadata,created_at,updated_at` +
      `&order=updated_at.desc&limit=200`;
    const ownedRes = await fetch(ownedUrl, { headers: sbHeaders(serviceKey) });
    if (!ownedRes.ok) return res.status(502).json({ error: "Failed to list sessions." });
    const owned = ((await ownedRes.json().catch(() => [])) as ThreadRow[]) || [];

    // Threads where the caller is an active member (and not the owner).
    const memberRes = await fetch(
      `${rest}/chat_room_members?member_lane_hash=eq.${encodeURIComponent(lane)}` +
        `&status=eq.active&select=thread_id&limit=200`,
      { headers: sbHeaders(serviceKey) },
    );
    const memberRows = memberRes.ok
      ? ((await memberRes.json().catch(() => [])) as Array<{ thread_id: string }>)
      : [];
    const ownedIds = new Set(owned.map((t) => t.id));
    const joinedIds = Array.from(
      new Set(memberRows.map((m) => m.thread_id).filter((id) => id && !ownedIds.has(id))),
    );

    let joined: ThreadRow[] = [];
    if (joinedIds.length) {
      const inList = joinedIds.map((id) => `"${id}"`).join(",");
      const joinedRes = await fetch(
        `${rest}/chat_threads?id=in.(${encodeURIComponent(inList)})` +
          `&select=id,title,kind,metadata,created_at,updated_at&order=updated_at.desc&limit=200`,
        { headers: sbHeaders(serviceKey) },
      );
      joined = joinedRes.ok ? ((await joinedRes.json().catch(() => [])) as ThreadRow[]) : [];
    }

    const rows = [...owned, ...joined];
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
  // Shared stream: any owner or active member reads the same rows.
  if (req.method === "GET" && action === "messages") {
    const threadId = String((req.query.thread_id ?? "") || "").trim();
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    const role = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (!role) return res.status(403).json({ error: "Not a member of this room." });
    const url =
      `${rest}/chat_thread_messages?thread_id=eq.${encodeURIComponent(threadId)}` +
      `&select=id,sender_id,sender_kind,seat_lane,model,content,status,created_at` +
      `&order=created_at.asc&limit=2000`;
    const r = await fetch(url, { headers: sbHeaders(serviceKey) });
    if (!r.ok) return res.status(502).json({ error: "Failed to load messages." });
    const messages = (await r.json().catch(() => [])) as unknown[];
    return res.status(200).json({ messages: Array.isArray(messages) ? messages : [] });
  }

  // ── GET members ──────────────────────────────────────────────────
  if (req.method === "GET" && action === "members") {
    const threadId = String((req.query.thread_id ?? "") || "").trim();
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    const role = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (!role) return res.status(403).json({ error: "Not a member of this room." });
    const r = await fetch(
      `${rest}/chat_room_members?thread_id=eq.${encodeURIComponent(threadId)}` +
        `&select=id,thread_id,member_lane_hash,role,status,invited_by_lane_hash,joined_at,last_read_at` +
        `&order=joined_at.asc&limit=200`,
      { headers: sbHeaders(serviceKey) },
    );
    if (!r.ok) return res.status(502).json({ error: "Failed to load members." });
    const members = (await r.json().catch(() => [])) as unknown[];
    return res.status(200).json({ members: Array.isArray(members) ? members : [] });
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

    // Rooms (council / human) seed an owner membership row so the shared
    // stream is membership-aware from the start. Solo agent threads stay
    // owner-scoped with no membership row.
    if (row?.id && (kind === "council" || kind === "human")) {
      await fetch(`${rest}/chat_room_members`, {
        method: "POST",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
        body: JSON.stringify({
          thread_id: row.id,
          member_lane_hash: lane,
          role: "owner",
          status: "active",
          invited_by_lane_hash: lane,
          joined_at: now,
          created_at: now,
        }),
      }).catch(() => {});
    }

    return res.status(200).json({ id: row?.id, title: row?.title ?? title, created_at: row?.created_at });
  }

  // ── POST append (persist a human turn; auto-title on first message) ──────────
  // Owner or active member may post into the shared stream.
  if (action === "append") {
    const threadId = typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    const content = typeof body.content === "string" ? body.content : "";
    const senderId = typeof body.sender_id === "string" && body.sender_id.trim() ? body.sender_id.trim() : "you";
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    if (!content.trim()) return res.status(400).json({ error: "content is required." });

    const role = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (!role) return res.status(403).json({ error: "Not a member of this room." });

    const now = new Date().toISOString();
    const insert = await fetch(`${rest}/chat_thread_messages`, {
      method: "POST",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify({
        // Messages are stamped with the room owner's lane so the shared
        // stream stays under one tenant key (the room creator). The caller
        // is recorded in sender_id.
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

    // Touch updated_at, and auto-title from the first human turn if still
    // default. By thread id only (a member may not own the row).
    const cur = await fetch(
      `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}&select=title`,
      { headers: sbHeaders(serviceKey) },
    );
    const curRows = cur.ok ? ((await cur.json().catch(() => [])) as Array<{ title: string | null }>) : [];
    const patch: Record<string, unknown> = { updated_at: now };
    const existingTitle = curRows[0]?.title;
    if (!existingTitle || existingTitle === "New chat") patch.title = trimTitle(content);
    await fetch(`${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}`, {
      method: "PATCH",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify(patch),
    }).catch(() => {});

    return res.status(200).json({ success: true, title: patch.title ?? existingTitle ?? "New chat" });
  }

  // ── POST update (rename / pin) ──────────────────────────────────────
  // Only owner or admin may rename a room.
  if (action === "update") {
    const threadId = typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    const role = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (role !== "owner" && role !== "admin") {
      return res.status(403).json({ error: "Only the room owner or an admin can rename this thread." });
    }
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.title === "string" && body.title.trim()) patch.title = trimTitle(body.title);
    if (typeof body.pinned === "boolean") {
      // Merge the pinned flag into metadata without clobbering other keys.
      const cur = await fetch(
        `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}&select=metadata`,
        { headers: sbHeaders(serviceKey) },
      );
      const rows = cur.ok ? ((await cur.json().catch(() => [])) as Array<{ metadata: Record<string, unknown> | null }>) : [];
      patch.metadata = { ...(rows[0]?.metadata ?? {}), pinned: body.pinned };
    }
    const r = await fetch(`${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}`, {
      method: "PATCH",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify(patch),
    });
    if (!r.ok) return res.status(r.status).json({ error: "Failed to update session." });
    return res.status(200).json({ success: true });
  }

  // ── POST delete (thread + its messages) ───────────────────────────────
  // Only owner or admin may delete a room.
  if (action === "delete") {
    const threadId = typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    const role = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (role !== "owner" && role !== "admin") {
      return res.status(403).json({ error: "Only the room owner or an admin can delete this thread." });
    }
    await fetch(
      `${rest}/chat_thread_messages?thread_id=eq.${encodeURIComponent(threadId)}`,
      { method: "DELETE", headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" } },
    ).catch(() => {});
    const r = await fetch(`${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}`, {
      method: "DELETE",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
    });
    if (!r.ok) return res.status(r.status).json({ error: "Failed to delete session." });
    return res.status(200).json({ success: true });
  }

  // ── POST add_member (REQUIRES an accepted Circle link) ────────────────
  // (a) Caller must be owner or admin of the room.
  // (b) An account_links row with status='accepted' must pair the caller's
  //     user and the target user (the Circle handshake). If none, return 409
  //     so the UI can surface the handshake loudly.
  // (c) Resolve the target's lane from api_keys (freshest active key).
  // (d) Insert/activate the target's membership row.
  if (action === "add_member") {
    const threadId = typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    const memberUserId = typeof body.member_user_id === "string" ? body.member_user_id.trim() : "";
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });
    if (!memberUserId) return res.status(400).json({ error: "member_user_id is required." });

    const role = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (role !== "owner" && role !== "admin") {
      return res.status(403).json({ error: "Only the room owner or an admin can add members." });
    }

    // (b) Circle gate: an accepted link must pair caller <-> target.
    const callerUserId = await resolveCallerUserId(req.headers.authorization, supabaseUrl, serviceKey);
    if (!callerUserId) {
      return res.status(401).json({ error: "Could not resolve your account." });
    }
    const linkUrl =
      `${rest}/account_links?status=eq.accepted&limit=1&select=id` +
      `&or=(and(requester_user_id.eq.${encodeURIComponent(callerUserId)},recipient_user_id.eq.${encodeURIComponent(memberUserId)}),` +
      `and(requester_user_id.eq.${encodeURIComponent(memberUserId)},recipient_user_id.eq.${encodeURIComponent(callerUserId)}))`;
    const linkRes = await fetch(linkUrl, { headers: sbHeaders(serviceKey) });
    const linkRows = linkRes.ok ? ((await linkRes.json().catch(() => [])) as Array<{ id: string }>) : [];
    if (!linkRows.length) {
      return res.status(409).json({
        error: "no_circle_link",
        needs_handshake: true,
        circle_url: "/admin/circle",
      });
    }

    // (c) Resolve the target's stable lane from their api_keys.
    const targetLane = await laneForUserId(supabaseUrl, serviceKey, memberUserId);
    if (!targetLane) {
      return res.status(409).json({ error: "target_not_provisioned" });
    }
    if (targetLane === lane) {
      return res.status(400).json({ error: "That member is already in this room." });
    }

    // (d) Insert or re-activate the target's membership row.
    const now = new Date().toISOString();
    const upsert = await fetch(
      `${rest}/chat_room_members?on_conflict=thread_id,member_lane_hash`,
      {
        method: "POST",
        headers: {
          ...sbHeaders(serviceKey),
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({
          thread_id: threadId,
          member_lane_hash: targetLane,
          role: "member",
          status: "active",
          invited_by_lane_hash: lane,
          joined_at: now,
          created_at: now,
        }),
      },
    );
    if (!upsert.ok) {
      const detail = (await upsert.text().catch(() => "")).slice(0, 200);
      return res.status(upsert.status).json({ error: "Failed to add member.", detail });
    }
    return res.status(200).json({ success: true, member_lane_hash: targetLane });
  }

  // ── POST remove_member (owner/admin sets a member's status to 'left') ──
  if (action === "remove_member") {
    const threadId = typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    const memberUserId = typeof body.member_user_id === "string" ? body.member_user_id.trim() : "";
    const explicitLane = typeof body.member_lane_hash === "string" ? body.member_lane_hash.trim() : "";
    if (!threadId) return res.status(400).json({ error: "thread_id is required." });

    const role = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (role !== "owner" && role !== "admin") {
      return res.status(403).json({ error: "Only the room owner or an admin can remove members." });
    }

    let targetLane = explicitLane;
    if (!targetLane && memberUserId) {
      targetLane = (await laneForUserId(supabaseUrl, serviceKey, memberUserId)) ?? "";
    }
    if (!targetLane) {
      return res.status(400).json({ error: "member_user_id or member_lane_hash is required." });
    }

    const r = await fetch(
      `${rest}/chat_room_members?thread_id=eq.${encodeURIComponent(threadId)}` +
        `&member_lane_hash=eq.${encodeURIComponent(targetLane)}`,
      {
        method: "PATCH",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
        body: JSON.stringify({ status: "left" }),
      },
    );
    if (!r.ok) return res.status(r.status).json({ error: "Failed to remove member." });
    return res.status(200).json({ success: true });
  }

  return res.status(400).json({ error: "Unknown action." });
}
