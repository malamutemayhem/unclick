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

interface RouteConfig {
  // chat_threads owner lookup by id -> { api_key_hash }
  threadOwner?: string | null;
  // active membership lookup for the caller lane on the queried thread
  callerMembership?: { role: "owner" | "admin" | "member" } | null;
  // an accepted account_links row exists between caller and target
  acceptedLink?: boolean;
  // target lane resolution (null = not provisioned)
  targetLane?: string | null;
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
      // thread owner lookup
      if (url.includes("/chat_threads?") && url.includes("select=id,api_key_hash")) {
        if (cfg.threadOwner === undefined || cfg.threadOwner === null) return jsonRes([]);
        return jsonRes([{ id: "thread-1", api_key_hash: cfg.threadOwner }]);
      }
      // caller active membership lookup
      if (url.includes("/chat_room_members?") && url.includes("member_lane_hash=eq.") && url.includes("status=eq.active") && method === "GET") {
        return jsonRes(cfg.callerMembership ? [{ id: "m-1", thread_id: "thread-1", member_lane_hash: CALLER_LANE, role: cfg.callerMembership.role, status: "active" }] : []);
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
});
