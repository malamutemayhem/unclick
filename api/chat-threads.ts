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
  invited_by_lane_hash?: string | null;
  joined_at?: string | null;
  last_read_at?: string | null;
}

type AccessRole = "owner" | "admin" | "member" | null;

function userDisplayName(
  user: { user_metadata?: Record<string, unknown> } | null | undefined,
): string | null {
  const meta = user?.user_metadata ?? {};
  for (const key of ["display_name", "full_name", "name"]) {
    const value = meta[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function userAvatarUrl(
  user: { user_metadata?: Record<string, unknown> } | null | undefined,
): string | null {
  const meta = user?.user_metadata ?? {};
  const photo = meta.avatar_photo;
  if (typeof photo === "string" && photo.startsWith("data:image/"))
    return photo;
  const avatar = meta.avatar_url;
  if (typeof avatar === "string" && /^https:\/\//i.test(avatar)) return avatar;
  return null;
}

interface MemberProfile {
  userId: string | null;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
}

async function fetchMemberProfiles(
  supabaseUrl: string,
  serviceKey: string,
  memberLanes: string[],
): Promise<Map<string, MemberProfile>> {
  const out = new Map<string, MemberProfile>();
  const safeLanes = Array.from(new Set(memberLanes.filter(Boolean))).map(
    (lane) => encodeURIComponent(lane),
  );
  if (safeLanes.length === 0) return out;

  const keyRes = await fetch(
    `${supabaseUrl}/rest/v1/api_keys?lane_hash=in.(${safeLanes.join(",")})` +
      `&is_active=eq.true&select=lane_hash,user_id&order=last_used_at.desc.nullslast&limit=1000`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!keyRes.ok) return out;
  const keyRows = (await keyRes.json().catch(() => [])) as Array<{
    lane_hash?: string | null;
    user_id?: string | null;
  }>;

  const userByLane = new Map<string, string>();
  for (const row of keyRows) {
    if (row.lane_hash && row.user_id && !userByLane.has(row.lane_hash)) {
      userByLane.set(row.lane_hash, row.user_id);
    }
  }

  const authByUser = new Map<
    string,
    { email?: string | null; user_metadata?: Record<string, unknown> }
  >();
  for (const userId of Array.from(new Set(userByLane.values()))) {
    const userRes = await fetch(
      `${supabaseUrl}/auth/v1/admin/users/${encodeURIComponent(userId)}`,
      {
        headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
      },
    );
    if (!userRes.ok) continue;
    const user = (await userRes.json().catch(() => null)) as {
      email?: string | null;
      user_metadata?: Record<string, unknown>;
    } | null;
    if (user) authByUser.set(userId, user);
  }

  for (const [laneHash, userId] of userByLane) {
    const user = authByUser.get(userId);
    out.set(laneHash, {
      userId,
      email: user?.email ?? null,
      displayName: userDisplayName(user),
      avatarUrl: userAvatarUrl(user),
    });
  }
  return out;
}

// Result of an access resolution: the caller's role on the thread plus the
// thread owner's lane. The owner lane is the canonical tenant key for the
// whole room, so every shared-stream write is stamped with it (not the
// calling member's lane). For a solo agent thread the owner lane equals the
// caller lane, so solo behavior is unchanged.
interface AccessResult {
  role: AccessRole;
  ownerLane: string | null;
}

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
  return Array.isArray(rows) ? (rows[0] ?? null) : null;
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
  return Array.isArray(rows) ? (rows[0] ?? null) : null;
}

// Resolve the caller's role on a thread: owner (owns the row or has an
// owner membership row), admin/member (active membership), or null. Always
// returns the thread owner's lane so writers can stamp the canonical tenant
// key. ownerLane is null only when the thread does not exist.
async function resolveAccessRole(
  rest: string,
  serviceKey: string,
  threadId: string,
  lane: string,
): Promise<AccessResult> {
  const owner = await fetchThreadOwner(rest, serviceKey, threadId);
  if (!owner) return { role: null, ownerLane: null };
  const ownerLane = owner.api_key_hash;
  if (ownerLane === lane) return { role: "owner", ownerLane };
  const member = await fetchActiveMember(rest, serviceKey, threadId, lane);
  if (!member) return { role: null, ownerLane };
  return { role: member.role, ownerLane };
}

// Fetch a specific target's membership row on a thread (any status), so
// remove_member can re-validate the target belongs to THIS thread and read
// the target's role before acting. Keyed on (thread_id, member_lane_hash).
async function fetchMemberByLane(
  rest: string,
  serviceKey: string,
  threadId: string,
  lane: string,
): Promise<MemberRow | null> {
  const r = await fetch(
    `${rest}/chat_room_members?thread_id=eq.${encodeURIComponent(threadId)}` +
      `&member_lane_hash=eq.${encodeURIComponent(lane)}` +
      `&select=id,thread_id,member_lane_hash,role,status&limit=1`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!r.ok) return null;
  const rows = (await r.json().catch(() => [])) as MemberRow[];
  return Array.isArray(rows) ? (rows[0] ?? null) : null;
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

  const lane = await resolveAccountLane(
    req.headers.authorization,
    supabaseUrl,
    serviceKey,
  );
  if (!lane)
    return res.status(401).json({ error: "Sign in to use chat sessions." });

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
    if (!ownedRes.ok)
      return res.status(502).json({ error: "Failed to list sessions." });
    const owned =
      ((await ownedRes.json().catch(() => [])) as ThreadRow[]) || [];

    // Threads where the caller is an active member (and not the owner).
    const memberRes = await fetch(
      `${rest}/chat_room_members?member_lane_hash=eq.${encodeURIComponent(lane)}` +
        `&status=eq.active&select=thread_id&limit=200`,
      { headers: sbHeaders(serviceKey) },
    );
    const memberRows = memberRes.ok
      ? ((await memberRes.json().catch(() => [])) as Array<{
          thread_id: string;
        }>)
      : [];
    const ownedIds = new Set(owned.map((t) => t.id));
    const joinedIds = Array.from(
      new Set(
        memberRows
          .map((m) => m.thread_id)
          .filter((id) => id && !ownedIds.has(id)),
      ),
    );

    let joined: ThreadRow[] = [];
    // Keep only well-formed UUIDs, then percent-encode each value on its own
    // before joining with commas. We must NOT wrap the whole comma list in a
    // single encodeURIComponent (that would escape the commas PostgREST needs
    // to split the in.() set) and we do not quote the values.
    const safeIds = joinedIds
      .filter((id) => /^[0-9a-fA-F-]{36}$/.test(id))
      .map((id) => encodeURIComponent(id));
    if (safeIds.length) {
      const inList = safeIds.join(",");
      const joinedRes = await fetch(
        `${rest}/chat_threads?id=in.(${inList})` +
          `&select=id,title,kind,metadata,created_at,updated_at&order=updated_at.desc&limit=200`,
        { headers: sbHeaders(serviceKey) },
      );
      joined = joinedRes.ok
        ? ((await joinedRes.json().catch(() => [])) as ThreadRow[])
        : [];
    }

    const rows = [...owned, ...joined];

    // Augment each thread with membership shape (shared / my_role /
    // member_count) using ONE batched query over chat_room_members for all
    // listed thread ids (no N+1). Solo agent threads have no membership rows,
    // so they default to shared=false, my_role='owner', member_count=1.
    const allIds = rows
      .map((t) => t.id)
      .filter((id) => /^[0-9a-fA-F-]{36}$/.test(id))
      .map((id) => encodeURIComponent(id));
    let memberAllRows: Array<{
      thread_id: string;
      member_lane_hash: string;
      role: AccessRole;
      status: string;
    }> = [];
    if (allIds.length) {
      const inList = allIds.join(",");
      const memberAllRes = await fetch(
        `${rest}/chat_room_members?thread_id=in.(${inList})` +
          `&status=eq.active&select=thread_id,member_lane_hash,role,status&limit=2000`,
        { headers: sbHeaders(serviceKey) },
      );
      memberAllRows = memberAllRes.ok
        ? ((await memberAllRes.json().catch(() => [])) as typeof memberAllRows)
        : [];
    }

    // Group active members per thread, and capture the caller's own role.
    const countByThread = new Map<string, number>();
    const myRoleByThread = new Map<string, AccessRole>();
    for (const m of memberAllRows) {
      countByThread.set(m.thread_id, (countByThread.get(m.thread_id) ?? 0) + 1);
      if (m.member_lane_hash === lane) myRoleByThread.set(m.thread_id, m.role);
    }

    const threads = rows
      .map((t) => {
        const activeCount = countByThread.get(t.id);
        const hasMembership = typeof activeCount === "number";
        // Solo agent thread (no membership rows): the caller owns it alone.
        if (!hasMembership) {
          return {
            id: t.id,
            title: t.title || "New chat",
            kind: t.kind || "agent",
            pinned: Boolean(
              t.metadata && (t.metadata as { pinned?: boolean }).pinned,
            ),
            created_at: t.created_at,
            updated_at: t.updated_at,
            shared: false,
            my_role: "owner" as const,
            member_count: 1,
          };
        }
        // Room: caller owns it if their lane is the thread row's lane (owned
        // set), otherwise read their membership role; default to 'member'.
        const ownsRow = ownedIds.has(t.id);
        const myRole: AccessRole = ownsRow
          ? "owner"
          : (myRoleByThread.get(t.id) ?? "member");
        return {
          id: t.id,
          title: t.title || "New chat",
          kind: t.kind || "agent",
          pinned: Boolean(
            t.metadata && (t.metadata as { pinned?: boolean }).pinned,
          ),
          created_at: t.created_at,
          updated_at: t.updated_at,
          shared: activeCount > 1,
          my_role: (myRole ?? "member") as "owner" | "admin" | "member",
          member_count: activeCount,
        };
      })
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
    if (!threadId)
      return res.status(400).json({ error: "thread_id is required." });
    const { role } = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (!role)
      return res.status(403).json({ error: "Not a member of this room." });
    const url =
      `${rest}/chat_thread_messages?thread_id=eq.${encodeURIComponent(threadId)}` +
      `&select=id,sender_id,sender_kind,seat_lane,model,content,status,created_at` +
      `&order=created_at.asc&limit=2000`;
    const r = await fetch(url, { headers: sbHeaders(serviceKey) });
    if (!r.ok)
      return res.status(502).json({ error: "Failed to load messages." });
    const messages = (await r.json().catch(() => [])) as unknown[];
    return res
      .status(200)
      .json({ messages: Array.isArray(messages) ? messages : [] });
  }

  // ── GET members ──────────────────────────────────────────────────
  if (req.method === "GET" && action === "members") {
    const threadId = String((req.query.thread_id ?? "") || "").trim();
    if (!threadId)
      return res.status(400).json({ error: "thread_id is required." });
    const { role } = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (!role)
      return res.status(403).json({ error: "Not a member of this room." });
    const r = await fetch(
      `${rest}/chat_room_members?thread_id=eq.${encodeURIComponent(threadId)}` +
        `&select=id,thread_id,member_lane_hash,role,status,invited_by_lane_hash,joined_at,last_read_at` +
        `&order=joined_at.asc&limit=200`,
      { headers: sbHeaders(serviceKey) },
    );
    if (!r.ok)
      return res.status(502).json({ error: "Failed to load members." });
    const members = (await r.json().catch(() => [])) as MemberRow[];
    if (!Array.isArray(members)) return res.status(200).json({ members: [] });
    const profiles = await fetchMemberProfiles(
      supabaseUrl,
      serviceKey,
      members.map((m) => m.member_lane_hash),
    );
    return res.status(200).json({
      members: members.map((member) => {
        const profile = profiles.get(member.member_lane_hash);
        return {
          ...member,
          user_id: profile?.userId ?? null,
          email: profile?.email ?? null,
          display_name: profile?.displayName ?? profile?.email ?? null,
          avatar_url: profile?.avatarUrl ?? null,
        };
      }),
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // ── POST create ────────────────────────────────────────────────
  if (action === "create") {
    const title =
      typeof body.title === "string" && body.title.trim()
        ? trimTitle(body.title)
        : "New chat";
    const kind =
      typeof body.kind === "string" && body.kind.trim()
        ? body.kind.trim()
        : "agent";
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
      // Log the upstream body server-side; never leak it to the client.
      const detail = (await r.text().catch(() => "")).slice(0, 200);
      console.error("chat-threads create failed:", r.status, detail);
      return res.status(r.status).json({ error: "Failed to create session." });
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

    return res
      .status(200)
      .json({
        id: row?.id,
        title: row?.title ?? title,
        created_at: row?.created_at,
      });
  }

  // ── POST append (persist a human turn; auto-title on first message) ──────────
  // Owner or active member may post into the shared stream.
  if (action === "append") {
    const threadId =
      typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    const content = typeof body.content === "string" ? body.content : "";
    const senderId =
      typeof body.sender_id === "string" && body.sender_id.trim()
        ? body.sender_id.trim()
        : "you";
    if (!threadId)
      return res.status(400).json({ error: "thread_id is required." });
    if (!content.trim())
      return res.status(400).json({ error: "content is required." });

    const { role, ownerLane } = await resolveAccessRole(
      rest,
      serviceKey,
      threadId,
      lane,
    );
    if (!role || !ownerLane)
      return res.status(403).json({ error: "Not a member of this room." });

    const now = new Date().toISOString();
    const insert = await fetch(`${rest}/chat_thread_messages`, {
      method: "POST",
      headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      body: JSON.stringify({
        // Messages are stamped with the room OWNER's lane (not the calling
        // member's) so the shared stream stays under one tenant key. This
        // keeps api/chat.ts history reads, which scope by the owner lane,
        // seeing member-authored turns. The caller is recorded in sender_id.
        // For a solo agent thread ownerLane === lane, so this is unchanged.
        api_key_hash: ownerLane,
        thread_id: threadId,
        sender_id: senderId,
        sender_kind: "human",
        content,
        status: "complete",
        created_at: now,
      }),
    });
    if (!insert.ok) {
      // Log the upstream body server-side; never leak it to the client.
      const detail = (await insert.text().catch(() => "")).slice(0, 200);
      console.error("chat-threads append failed:", insert.status, detail);
      return res
        .status(insert.status)
        .json({ error: "Failed to save message." });
    }

    // Touch updated_at, and auto-title from the first human turn if still
    // default. Scope by the owner lane of the thread so a member cannot
    // touch a row outside the room's canonical tenant key.
    const cur = await fetch(
      `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}` +
        `&api_key_hash=eq.${encodeURIComponent(ownerLane)}&select=title`,
      { headers: sbHeaders(serviceKey) },
    );
    const curRows = cur.ok
      ? ((await cur.json().catch(() => [])) as Array<{ title: string | null }>)
      : [];
    const patch: Record<string, unknown> = { updated_at: now };
    const existingTitle = curRows[0]?.title;
    if (!existingTitle || existingTitle === "New chat")
      patch.title = trimTitle(content);
    await fetch(
      `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}` +
        `&api_key_hash=eq.${encodeURIComponent(ownerLane)}`,
      {
        method: "PATCH",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
        body: JSON.stringify(patch),
      },
    ).catch(() => {});

    return res
      .status(200)
      .json({
        success: true,
        title: patch.title ?? existingTitle ?? "New chat",
      });
  }

  // ── POST update (rename / pin) ──────────────────────────────────────
  // Only owner or admin may rename a room.
  if (action === "update") {
    const threadId =
      typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    if (!threadId)
      return res.status(400).json({ error: "thread_id is required." });
    const { role, ownerLane } = await resolveAccessRole(
      rest,
      serviceKey,
      threadId,
      lane,
    );
    if (role !== "owner" && role !== "admin") {
      return res
        .status(403)
        .json({
          error: "Only the room owner or an admin can rename this thread.",
        });
    }
    if (!ownerLane)
      return res
        .status(403)
        .json({
          error: "Only the room owner or an admin can rename this thread.",
        });
    const patch: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (typeof body.title === "string" && body.title.trim())
      patch.title = trimTitle(body.title);
    if (typeof body.pinned === "boolean") {
      // Merge the pinned flag into metadata without clobbering other keys.
      const cur = await fetch(
        `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}` +
          `&api_key_hash=eq.${encodeURIComponent(ownerLane)}&select=metadata`,
        { headers: sbHeaders(serviceKey) },
      );
      const rows = cur.ok
        ? ((await cur.json().catch(() => [])) as Array<{
            metadata: Record<string, unknown> | null;
          }>)
        : [];
      patch.metadata = { ...(rows[0]?.metadata ?? {}), pinned: body.pinned };
    }
    // Scope the write by the thread's owner lane (its canonical tenant key).
    const r = await fetch(
      `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}` +
        `&api_key_hash=eq.${encodeURIComponent(ownerLane)}`,
      {
        method: "PATCH",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
        body: JSON.stringify(patch),
      },
    );
    if (!r.ok)
      return res.status(r.status).json({ error: "Failed to update session." });
    return res.status(200).json({ success: true });
  }

  // ── POST delete (thread + its messages) ───────────────────────────────
  // Only owner or admin may delete a room.
  if (action === "delete") {
    const threadId =
      typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    if (!threadId)
      return res.status(400).json({ error: "thread_id is required." });
    const { role, ownerLane } = await resolveAccessRole(
      rest,
      serviceKey,
      threadId,
      lane,
    );
    if (role !== "owner" && role !== "admin") {
      return res
        .status(403)
        .json({
          error: "Only the room owner or an admin can delete this thread.",
        });
    }
    if (!ownerLane)
      return res
        .status(403)
        .json({
          error: "Only the room owner or an admin can delete this thread.",
        });
    await fetch(
      `${rest}/chat_thread_messages?thread_id=eq.${encodeURIComponent(threadId)}`,
      {
        method: "DELETE",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      },
    ).catch(() => {});
    // Scope the delete by the thread's owner lane (its canonical tenant key).
    const r = await fetch(
      `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}` +
        `&api_key_hash=eq.${encodeURIComponent(ownerLane)}`,
      {
        method: "DELETE",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      },
    );
    if (!r.ok)
      return res.status(r.status).json({ error: "Failed to delete session." });
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
    const threadId =
      typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    const memberUserId =
      typeof body.member_user_id === "string" ? body.member_user_id.trim() : "";
    if (!threadId)
      return res.status(400).json({ error: "thread_id is required." });
    if (!memberUserId)
      return res.status(400).json({ error: "member_user_id is required." });

    const { role } = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (role !== "owner" && role !== "admin") {
      return res
        .status(403)
        .json({ error: "Only the room owner or an admin can add members." });
    }

    // (b) Circle gate: an accepted link must pair caller <-> target.
    const callerUserId = await resolveCallerUserId(
      req.headers.authorization,
      supabaseUrl,
      serviceKey,
    );
    if (!callerUserId) {
      return res.status(401).json({ error: "Could not resolve your account." });
    }
    const linkUrl =
      `${rest}/account_links?status=eq.accepted&limit=1&select=id` +
      `&or=(and(requester_user_id.eq.${encodeURIComponent(callerUserId)},recipient_user_id.eq.${encodeURIComponent(memberUserId)}),` +
      `and(requester_user_id.eq.${encodeURIComponent(memberUserId)},recipient_user_id.eq.${encodeURIComponent(callerUserId)}))`;
    const linkRes = await fetch(linkUrl, { headers: sbHeaders(serviceKey) });
    const linkRows = linkRes.ok
      ? ((await linkRes.json().catch(() => [])) as Array<{ id: string }>)
      : [];
    if (!linkRows.length) {
      return res.status(409).json({
        error: "no_circle_link",
        needs_handshake: true,
        circle_url: "/admin/circle",
      });
    }

    // (c) Resolve the target's stable lane from their api_keys.
    const targetLane = await laneForUserId(
      supabaseUrl,
      serviceKey,
      memberUserId,
    );
    if (!targetLane) {
      return res.status(409).json({ error: "target_not_provisioned" });
    }
    if (targetLane === lane) {
      return res
        .status(400)
        .json({ error: "That member is already in this room." });
    }

    // (d) Insert or re-activate the target's membership row.
    // By design, an externally added member is ALWAYS role 'member': the
    // upsert below can never set 'owner' or 'admin', so an add can never
    // elevate. Owner/admin are only ever set by create (the room creator) or
    // a future explicit promotion path. An accepted Circle link is the
    // sufficient gate here by design (the handshake is the permission); we
    // intentionally do NOT also require a shared_chat toggle (no hidden
    // toggles, per the PRD Section 6 decision).
    const memberRole: "member" = "member";
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
          role: memberRole,
          status: "active",
          invited_by_lane_hash: lane,
          joined_at: now,
          created_at: now,
        }),
      },
    );
    if (!upsert.ok) {
      // Log the upstream body server-side; never leak it to the client.
      const detail = (await upsert.text().catch(() => "")).slice(0, 200);
      console.error("chat-threads add_member failed:", upsert.status, detail);
      return res.status(upsert.status).json({ error: "Failed to add member." });
    }
    return res
      .status(200)
      .json({ success: true, member_lane_hash: targetLane });
  }

  // ── POST remove_member (owner/admin sets a member's status to 'left') ──
  if (action === "remove_member") {
    const threadId =
      typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    const memberUserId =
      typeof body.member_user_id === "string" ? body.member_user_id.trim() : "";
    const explicitLane =
      typeof body.member_lane_hash === "string"
        ? body.member_lane_hash.trim()
        : "";
    if (!threadId)
      return res.status(400).json({ error: "thread_id is required." });

    const { role } = await resolveAccessRole(rest, serviceKey, threadId, lane);
    if (role !== "owner" && role !== "admin") {
      return res
        .status(403)
        .json({ error: "Only the room owner or an admin can remove members." });
    }

    let targetLane = explicitLane;
    if (!targetLane && memberUserId) {
      targetLane =
        (await laneForUserId(supabaseUrl, serviceKey, memberUserId)) ?? "";
    }
    if (!targetLane) {
      return res
        .status(400)
        .json({ error: "member_user_id or member_lane_hash is required." });
    }

    // Re-validate the target against THIS thread before acting:
    //  - the target must hold an active membership row on this thread,
    //  - the room owner can never be removed (only the room is deleted),
    //  - an admin can only be removed by the owner, not by another admin.
    const target = await fetchMemberByLane(
      rest,
      serviceKey,
      threadId,
      targetLane,
    );
    if (!target || target.status !== "active") {
      return res.status(404).json({ error: "not_a_member" });
    }
    if (target.role === "owner") {
      return res.status(403).json({
        error: "cannot_remove_owner",
        detail: "The room owner can only delete the room, not be removed.",
      });
    }
    if (target.role === "admin" && role !== "owner") {
      return res.status(403).json({ error: "only_owner_removes_admin" });
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
    if (!r.ok)
      return res.status(r.status).json({ error: "Failed to remove member." });
    return res.status(200).json({ success: true });
  }

  // ── POST leave (the caller sets THEIR OWN membership row to 'left') ────
  // A shared-room member exits the room. The room OWNER cannot leave (they
  // must delete the room or transfer ownership), and a caller with no
  // membership row is not a member.
  if (action === "leave") {
    const threadId =
      typeof body.thread_id === "string" ? body.thread_id.trim() : "";
    if (!threadId)
      return res.status(400).json({ error: "thread_id is required." });

    const owner = await fetchThreadOwner(rest, serviceKey, threadId);
    if (!owner) return res.status(404).json({ error: "not_a_member" });
    if (owner.api_key_hash === lane) {
      return res.status(409).json({
        error: "owner_cannot_leave",
        detail: "Delete the room or transfer ownership instead.",
      });
    }

    const mine = await fetchMemberByLane(rest, serviceKey, threadId, lane);
    if (!mine || mine.status === "left") {
      return res.status(404).json({ error: "not_a_member" });
    }

    const r = await fetch(
      `${rest}/chat_room_members?thread_id=eq.${encodeURIComponent(threadId)}` +
        `&member_lane_hash=eq.${encodeURIComponent(lane)}`,
      {
        method: "PATCH",
        headers: { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
        body: JSON.stringify({ status: "left" }),
      },
    );
    if (!r.ok)
      return res.status(r.status).json({ error: "Failed to leave room." });
    return res.status(200).json({ success: true });
  }

  return res.status(400).json({ error: "Unknown action." });
}
