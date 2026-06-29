// ============================================================
// Shared chat rooms: data model + membership API
//
// Drives the full handler with a stubbed fetch that routes PostgREST and
// Supabase Auth URLs. The caller authenticates with a uc_ api key so the
// lane and user id both resolve through api_keys (no JWT round trip).
// ============================================================

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "./chat-threads";
import { CIRCLE_PERMISSIONS } from "./lib/account-links-model";

interface CapturedResponse {
  headers: Record<string, string>;
  statusCode: number;
  body: unknown;
  ended: boolean;
  setHeader(name: string, value: string): CapturedResponse;
  status(code: number): CapturedResponse;
  json(body: unknown): unknown;
  end(): CapturedResponse;
}

function createResponse(): CapturedResponse {
  return {
    headers: {},
    statusCode: 200,
    body: null,
    ended: false,
    setHeader(name: string, value: string) {
      this.headers[name] = value;
      return this;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return body;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

type MockRes = { ok: boolean; status: number; json: () => Promise<unknown>; text: () => Promise<string> };
function jsonRes(data: unknown, ok = true, status = 200): MockRes {
  return { ok, status, json: async () => data, text: async () => JSON.stringify(data) };
}

const CALLER_KEY = "uc_caller_key";
const CALLER_LANE = "lane_caller";
const CALLER_USER = "user-caller";
const TARGET_USER = "user-target";
const TARGET_LANE = "lane_target";

// Valid UUID-shaped ids for list tests. The list action filters thread ids
// through a UUID regex before batching the membership query and the joined
// detail fetch, so list fixtures must use real UUIDs (not "room-1").
const SOLO_ID = "9feb0aef-0af2-4103-97f2-d0601c3bd0f3";
const ROOM_OWNED_ID = "832f53d4-aa3e-4da5-86c0-fe342a7eb0b3";
const ROOM_MEMBER_ID = "005edc00-a020-46f8-95a1-c0068b59dadc";

interface RouteConfig {
  // chat_threads owner lookup by id -> { api_key_hash }
  threadOwner?: string | null;
  // active membership lookup for the caller lane on the queried thread
  callerMembership?: { role: "owner" | "admin" | "member" } | null;
  // an accepted account_links row exists between caller and target
  acceptedLink?: boolean;
  // target lane resolution (null = not provisioned)
  targetLane?: string | null;
  // remove_member: the target's membership row on THIS thread (any status).
  // undefined => no row at all (404 not_a_member).
  targetMembership?: { role: "owner" | "admin" | "member"; status: "invited" | "active" | "left" } | null;
  // leave: the caller's own membership row on the thread (any status).
  // undefined => no row at all (404 not_a_member).
  callerOwnMembership?: { role: "owner" | "admin" | "member"; status: "invited" | "active" | "left" } | null;
  // list: owned thread rows (api_key_hash == caller lane)
  ownedThreads?: Array<{ id: string; title?: string; kind?: string; metadata?: Record<string, unknown> }>;
  // list: thread_ids the caller is an active member of (and the rows behind them)
  memberThreadIds?: string[];
  joinedThreads?: Array<{ id: string; title?: string; kind?: string; metadata?: Record<string, unknown> }>;
  // list: batched active membership rows over the listed thread ids
  batchedMembers?: Array<{ thread_id: string; member_lane_hash: string; role: "owner" | "admin" | "member" }>;
  // capture sink for inserts/patches
  calls: Array<{ url: string; method: string; body: unknown }>;
}

// A fetch stub that recognizes the auth + access lookups every action does
// and lets each test override the room-specific answers.
function stubFetch(cfg: RouteConfig) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: { method?: string; body?: string }) => {
      const method = init?.method ?? "GET";
      const parsedBody = init?.body ? JSON.parse(init.body) : undefined;
      if (method !== "GET") cfg.calls.push({ url, method, body: parsedBody });

      // resolveAccountLane: uc_ key -> lane
      if (url.includes("/api_keys?") && url.includes("key_hash=eq.") && url.includes("select=lane_hash&")) {
        return jsonRes([{ lane_hash: CALLER_LANE }]);
      }
      // resolveCallerUserId: uc_ key -> user_id
      if (url.includes("/api_keys?") && url.includes("key_hash=eq.") && url.includes("select=user_id")) {
        return jsonRes([{ user_id: CALLER_USER }]);
      }
      // laneForUserId(target): freshest active key
      if (url.includes("/api_keys?") && url.includes(`user_id=eq.${TARGET_USER}`)) {
        return jsonRes(cfg.targetLane === undefined ? [] : cfg.targetLane === null ? [] : [{ lane_hash: cfg.targetLane }]);
      }
      // list: owned threads (scoped by caller lane)
      if (
        url.includes("/chat_threads?") &&
        url.includes(`api_key_hash=eq.${CALLER_LANE}`) &&
        url.includes("order=updated_at.desc") &&
        method === "GET"
      ) {
        return jsonRes(
          (cfg.ownedThreads ?? []).map((t) => ({
            id: t.id,
            title: t.title ?? "Owned",
            kind: t.kind ?? "agent",
            metadata: t.metadata ?? {},
            created_at: "2026-06-29T00:00:00Z",
            updated_at: "2026-06-29T00:00:00Z",
          })),
        );
      }
      // list: joined thread details (id in.(...))
      if (url.includes("/chat_threads?") && url.includes("id=in.(") && method === "GET") {
        return jsonRes(
          (cfg.joinedThreads ?? []).map((t) => ({
            id: t.id,
            title: t.title ?? "Joined",
            kind: t.kind ?? "council",
            metadata: t.metadata ?? {},
            created_at: "2026-06-29T00:00:00Z",
            updated_at: "2026-06-29T00:00:00Z",
          })),
        );
      }
      // list: thread_ids the caller is an active member of
      if (
        url.includes("/chat_room_members?") &&
        url.includes(`member_lane_hash=eq.${CALLER_LANE}`) &&
        url.includes("status=eq.active") &&
        url.includes("select=thread_id&") &&
        method === "GET"
      ) {
        return jsonRes((cfg.memberThreadIds ?? []).map((id) => ({ thread_id: id })));
      }
      // list: batched active membership over the listed thread ids
      if (
        url.includes("/chat_room_members?") &&
        url.includes("thread_id=in.(") &&
        url.includes("status=eq.active") &&
        method === "GET"
      ) {
        return jsonRes(
          (cfg.batchedMembers ?? []).map((m) => ({
            thread_id: m.thread_id,
            member_lane_hash: m.member_lane_hash,
            role: m.role,
            status: "active",
          })),
        );
      }
      // leave: the caller's own membership row (member_lane_hash == caller lane,
      // any status). Distinct from the active-only access lookup below.
      if (
        url.includes("/chat_room_members?") &&
        url.includes(`member_lane_hash=eq.${CALLER_LANE}`) &&
        !url.includes("status=eq.active") &&
        method === "GET"
      ) {
        return jsonRes(
          cfg.callerOwnMembership
            ? [{ id: "m-self", thread_id: "thread-1", member_lane_hash: CALLER_LANE, role: cfg.callerOwnMembership.role, status: cfg.callerOwnMembership.status }]
            : [],
        );
      }
      // thread owner lookup
      if (url.includes("/chat_threads?") && url.includes("select=id,api_key_hash")) {
        if (cfg.threadOwner === undefined || cfg.threadOwner === null) return jsonRes([]);
        return jsonRes([{ id: "thread-1", api_key_hash: cfg.threadOwner }]);
      }
      // caller active membership lookup
      if (url.includes("/chat_room_members?") && url.includes("member_lane_hash=eq.") && url.includes("status=eq.active") && method === "GET") {
        return jsonRes(cfg.callerMembership ? [{ id: "m-1", thread_id: "thread-1", member_lane_hash: CALLER_LANE, role: cfg.callerMembership.role, status: "active" }] : []);
      }
      // target membership lookup (remove_member: fetchMemberByLane, no status filter)
      if (
        url.includes("/chat_room_members?") &&
        url.includes(`member_lane_hash=eq.${TARGET_LANE}`) &&
        !url.includes("status=eq.active") &&
        method === "GET"
      ) {
        return jsonRes(
          cfg.targetMembership
            ? [{ id: "m-target", thread_id: "thread-1", member_lane_hash: TARGET_LANE, role: cfg.targetMembership.role, status: cfg.targetMembership.status }]
            : [],
        );
      }
      // accepted Circle link lookup
      if (url.includes("/account_links?") && url.includes("status=eq.accepted")) {
        return jsonRes(cfg.acceptedLink ? [{ id: "link-1" }] : []);
      }
      // create thread -> representation
      if (url.endsWith("/chat_threads") && method === "POST") {
        return jsonRes([{ id: "thread-1", title: "New chat", created_at: "2026-06-29T00:00:00Z" }]);
      }
      // membership insert / upsert
      if (url.includes("/chat_room_members") && method === "POST") {
        return jsonRes(null, true, 201);
      }
      // messages read
      if (url.includes("/chat_thread_messages?") && method === "GET") {
        return jsonRes([{ id: "msg-1", sender_id: "you", sender_kind: "human", content: "hi" }]);
      }
      // generic write success
      if (method !== "GET") return jsonRes(null, true, 200);
      return jsonRes([]);
    }),
  );
}

describe("chat-threads shared rooms", () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  beforeEach(() => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  });

  const auth = { authorization: `Bearer ${CALLER_KEY}` };

  it("exposes shared_chat as a Circle permission", () => {
    expect(CIRCLE_PERMISSIONS).toContain("shared_chat");
  });

  it("creating a council room seeds an owner membership row", async () => {
    const cfg: RouteConfig = { calls: [] };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "create" }, headers: auth, body: { kind: "council", title: "Strategy" } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    const memberInsert = cfg.calls.find((c) => c.url.includes("/chat_room_members") && c.method === "POST");
    expect(memberInsert).toBeTruthy();
    expect(memberInsert!.body).toMatchObject({
      thread_id: "thread-1",
      member_lane_hash: CALLER_LANE,
      role: "owner",
      status: "active",
    });
  });

  it("creating a solo agent thread does NOT seed a membership row", async () => {
    const cfg: RouteConfig = { calls: [] };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "create" }, headers: auth, body: { kind: "agent" } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    expect(cfg.calls.find((c) => c.url.includes("/chat_room_members"))).toBeUndefined();
  });

  it("add_member returns needs_handshake when no accepted Circle link exists", async () => {
    const cfg: RouteConfig = { calls: [], threadOwner: CALLER_LANE, acceptedLink: false };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "add_member" }, headers: auth, body: { thread_id: "thread-1", member_user_id: TARGET_USER } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(409);
    expect(res.body).toMatchObject({ error: "no_circle_link", needs_handshake: true, circle_url: "/admin/circle" });
    // No membership row should be written when the handshake is missing.
    expect(cfg.calls.find((c) => c.url.includes("/chat_room_members") && c.method === "POST")).toBeUndefined();
  });

  it("add_member succeeds and inserts a member row when an accepted link exists", async () => {
    const cfg: RouteConfig = { calls: [], threadOwner: CALLER_LANE, acceptedLink: true, targetLane: TARGET_LANE };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "add_member" }, headers: auth, body: { thread_id: "thread-1", member_user_id: TARGET_USER } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ success: true, member_lane_hash: TARGET_LANE });
    const insert = cfg.calls.find((c) => c.url.includes("/chat_room_members") && c.method === "POST");
    expect(insert).toBeTruthy();
    expect(insert!.body).toMatchObject({
      thread_id: "thread-1",
      member_lane_hash: TARGET_LANE,
      role: "member",
      status: "active",
      invited_by_lane_hash: CALLER_LANE,
    });
  });

  it("add_member returns target_not_provisioned when the target has no api key", async () => {
    const cfg: RouteConfig = { calls: [], threadOwner: CALLER_LANE, acceptedLink: true, targetLane: null };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "add_member" }, headers: auth, body: { thread_id: "thread-1", member_user_id: TARGET_USER } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(409);
    expect(res.body).toMatchObject({ error: "target_not_provisioned" });
  });

  it("an active member can read room messages", async () => {
    const cfg: RouteConfig = { calls: [], threadOwner: "lane_someone_else", callerMembership: { role: "member" } };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "GET", query: { action: "messages", thread_id: "thread-1" }, headers: auth } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ messages: [{ id: "msg-1" }] });
  });

  it("a non-member is rejected from messages", async () => {
    const cfg: RouteConfig = { calls: [], threadOwner: "lane_someone_else", callerMembership: null };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "GET", query: { action: "messages", thread_id: "thread-1" }, headers: auth } as never,
      res as never,
    );

    expect(res.statusCode).toBe(403);
    expect(res.body).toMatchObject({ error: "Not a member of this room." });
  });

  it("the owner can always read room messages", async () => {
    const cfg: RouteConfig = { calls: [], threadOwner: CALLER_LANE };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "GET", query: { action: "messages", thread_id: "thread-1" }, headers: auth } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
  });

  it("remove_member returns 403 when the target is the room owner", async () => {
    // Caller is the owner; the target's membership row is also 'owner'.
    const cfg: RouteConfig = {
      calls: [],
      threadOwner: CALLER_LANE,
      targetMembership: { role: "owner", status: "active" },
    };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "remove_member" }, headers: auth, body: { thread_id: "thread-1", member_lane_hash: TARGET_LANE } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(403);
    expect(res.body).toMatchObject({ error: "cannot_remove_owner" });
    // No PATCH to 'left' should be issued for the owner.
    expect(cfg.calls.find((c) => c.method === "PATCH" && c.url.includes("/chat_room_members"))).toBeUndefined();
  });

  it("remove_member returns 404 when the target is not a member of the thread", async () => {
    const cfg: RouteConfig = {
      calls: [],
      threadOwner: CALLER_LANE,
      targetMembership: null,
    };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "remove_member" }, headers: auth, body: { thread_id: "thread-1", member_lane_hash: TARGET_LANE } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({ error: "not_a_member" });
    expect(cfg.calls.find((c) => c.method === "PATCH" && c.url.includes("/chat_room_members"))).toBeUndefined();
  });

  it("a non-member is rejected (403) from update", async () => {
    const cfg: RouteConfig = { calls: [], threadOwner: "lane_someone_else", callerMembership: null };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "update" }, headers: auth, body: { thread_id: "thread-1", title: "Hijack" } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(403);
    // No PATCH to chat_threads should be issued for a non-member.
    expect(cfg.calls.find((c) => c.method === "PATCH" && c.url.includes("/chat_threads"))).toBeUndefined();
  });

  it("a non-member is rejected (403) from delete", async () => {
    const cfg: RouteConfig = { calls: [], threadOwner: "lane_someone_else", callerMembership: null };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "delete" }, headers: auth, body: { thread_id: "thread-1" } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(403);
    // No DELETE should be issued for a non-member.
    expect(cfg.calls.find((c) => c.method === "DELETE")).toBeUndefined();
  });

  it("append by a member stamps the message with the owner's lane, not the member's", async () => {
    // The caller is an active member of a room owned by someone else. The
    // inserted message must carry the OWNER's lane as api_key_hash so the
    // shared stream stays unified under one tenant key.
    const cfg: RouteConfig = { calls: [], threadOwner: "lane_owner", callerMembership: { role: "member" } };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "append" }, headers: auth, body: { thread_id: "thread-1", content: "hello room" } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    const insert = cfg.calls.find((c) => c.url.includes("/chat_thread_messages") && c.method === "POST");
    expect(insert).toBeTruthy();
    expect(insert!.body).toMatchObject({ api_key_hash: "lane_owner", thread_id: "thread-1", sender_kind: "human" });
    expect((insert!.body as { api_key_hash: string }).api_key_hash).not.toBe(CALLER_LANE);
  });

  // ── list: shared / my_role / member_count augmentation ──────────────────
  it("list marks a solo agent thread as shared=false, my_role=owner, member_count=1", async () => {
    const cfg: RouteConfig = {
      calls: [],
      ownedThreads: [{ id: SOLO_ID, kind: "agent" }],
      memberThreadIds: [],
      batchedMembers: [], // a solo thread has no membership rows
    };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "GET", query: { action: "list" }, headers: auth } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    const threads = (res.body as { threads: Array<Record<string, unknown>> }).threads;
    const solo = threads.find((t) => t.id === SOLO_ID);
    expect(solo).toMatchObject({ shared: false, my_role: "owner", member_count: 1 });
  });

  it("list marks a shared room as shared=true with member_count>1 and the caller's role", async () => {
    // Caller OWNS the room row, and it has two active members (caller + other).
    const cfg: RouteConfig = {
      calls: [],
      ownedThreads: [{ id: ROOM_OWNED_ID, kind: "council" }],
      memberThreadIds: [],
      batchedMembers: [
        { thread_id: ROOM_OWNED_ID, member_lane_hash: CALLER_LANE, role: "owner" },
        { thread_id: ROOM_OWNED_ID, member_lane_hash: "lane_other", role: "member" },
      ],
    };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "GET", query: { action: "list" }, headers: auth } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    const threads = (res.body as { threads: Array<Record<string, unknown>> }).threads;
    const room = threads.find((t) => t.id === ROOM_OWNED_ID);
    expect(room).toMatchObject({ shared: true, my_role: "owner", member_count: 2 });
  });

  it("list reports the caller's membership role for a room owned by someone else", async () => {
    // Caller is an active MEMBER (not owner) of a 2-person room.
    const cfg: RouteConfig = {
      calls: [],
      ownedThreads: [],
      memberThreadIds: [ROOM_MEMBER_ID],
      joinedThreads: [{ id: ROOM_MEMBER_ID, kind: "council" }],
      batchedMembers: [
        { thread_id: ROOM_MEMBER_ID, member_lane_hash: "lane_owner", role: "owner" },
        { thread_id: ROOM_MEMBER_ID, member_lane_hash: CALLER_LANE, role: "member" },
      ],
    };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "GET", query: { action: "list" }, headers: auth } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    const threads = (res.body as { threads: Array<Record<string, unknown>> }).threads;
    const room = threads.find((t) => t.id === ROOM_MEMBER_ID);
    expect(room).toMatchObject({ shared: true, my_role: "member", member_count: 2 });
  });

  // ── leave ───────────────────────────────────────────────────────────────
  it("leave sets the caller's own membership to left", async () => {
    const cfg: RouteConfig = {
      calls: [],
      threadOwner: "lane_owner", // caller is NOT the owner
      callerOwnMembership: { role: "member", status: "active" },
    };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "leave" }, headers: auth, body: { thread_id: "thread-1" } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ success: true });
    const patch = cfg.calls.find((c) => c.method === "PATCH" && c.url.includes("/chat_room_members"));
    expect(patch).toBeTruthy();
    expect(patch!.url).toContain(`member_lane_hash=eq.${CALLER_LANE}`);
    expect(patch!.body).toMatchObject({ status: "left" });
  });

  it("leave returns 409 owner_cannot_leave when the caller owns the thread", async () => {
    const cfg: RouteConfig = {
      calls: [],
      threadOwner: CALLER_LANE, // caller IS the owner
      callerOwnMembership: { role: "owner", status: "active" },
    };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "leave" }, headers: auth, body: { thread_id: "thread-1" } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(409);
    expect(res.body).toMatchObject({ error: "owner_cannot_leave" });
    // No membership PATCH should be issued for the owner.
    expect(cfg.calls.find((c) => c.method === "PATCH" && c.url.includes("/chat_room_members"))).toBeUndefined();
  });

  it("leave returns 404 not_a_member when the caller has no membership row", async () => {
    const cfg: RouteConfig = {
      calls: [],
      threadOwner: "lane_owner", // caller is NOT the owner
      callerOwnMembership: null, // and has no membership row
    };
    stubFetch(cfg);
    const res = createResponse();
    await handler(
      { method: "POST", query: { action: "leave" }, headers: auth, body: { thread_id: "thread-1" } } as never,
      res as never,
    );

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({ error: "not_a_member" });
    expect(cfg.calls.find((c) => c.method === "PATCH" && c.url.includes("/chat_room_members"))).toBeUndefined();
  });
});
