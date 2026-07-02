import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "./account-links";

// Chainable PostgREST stub: records every operation so tests can assert
// exactly which rows each action touched. Route answers come from the
// `respond` callback keyed on (table, op).
interface RecordedCall {
  table: string;
  op: string;
  payload?: unknown;
  filters: Array<{ method: string; args: unknown[] }>;
}

type Responder = (call: RecordedCall) => unknown;

function makeSupabaseMock(respond: Responder, calls: RecordedCall[]) {
  function builder(table: string) {
    const call: RecordedCall = { table, op: "select", filters: [] };
    const chain: Record<string, unknown> = {};
    const record =
      (method: string) =>
      (...args: unknown[]) => {
        call.filters.push({ method, args });
        return chain;
      };
    for (const method of ["or", "eq", "in", "not", "ilike", "order", "limit"]) {
      chain[method] = record(method);
    }
    chain.select = (...args: unknown[]) => {
      if (call.op === "select") call.op = "select";
      call.filters.push({ method: "select", args });
      return chain;
    };
    for (const op of ["update", "insert", "upsert"]) {
      chain[op] = (payload: unknown) => {
        call.op = op;
        call.payload = payload;
        return chain;
      };
    }
    chain.maybeSingle = async () => {
      calls.push(call);
      return { data: respond(call) ?? null, error: null };
    };
    chain.single = async () => {
      calls.push(call);
      return { data: respond(call) ?? null, error: null };
    };
    chain.then = (
      resolve: (value: { data: unknown; error: null }) => unknown,
    ) => {
      calls.push(call);
      return Promise.resolve({ data: respond(call) ?? null, error: null }).then(resolve);
    };
    return chain;
  }

  return {
    auth: {
      getUser: async () => ({
        data: { user: { id: "me", email: "owner@example.com" } },
        error: null,
      }),
      admin: { getUserById: async () => ({ data: { user: null }, error: null }) },
    },
    from: builder,
  };
}

const ACCEPTED_LINK = {
  id: "link-1",
  requester_user_id: "me",
  recipient_user_id: "them",
  recipient_email: "them@example.com",
  recipient_email_norm: "them@example.com",
  status: "accepted",
  created_at: "2026-06-19T00:00:00.000Z",
  accepted_at: "2026-06-19T00:01:00.000Z",
};

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

describe("account-links API safety gates", () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  beforeEach(() => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  });

  it("answers OPTIONS without touching account data", async () => {
    const res = createResponse();

    await handler({ method: "OPTIONS", headers: {} } as never, res as never);

    expect(res.statusCode).toBe(204);
    expect(res.ended).toBe(true);
  });

  it("requires a signed-in Supabase session", async () => {
    const res = createResponse();

    await handler(
      { method: "GET", query: { action: "list" }, headers: {} } as never,
      res as never,
    );

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Unauthorized" });
  });

  it("does not accept UnClick API keys as account session tokens", async () => {
    const res = createResponse();

    await handler(
      {
        method: "GET",
        query: { action: "list" },
        headers: { authorization: "Bearer uc_test_api_key" },
      } as never,
      res as never,
    );

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Unauthorized" });
  });
});

describe("account-links permission actions", () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let calls: RecordedCall[];

  function installMock(respond: Responder) {
    calls = [];
    const client = makeSupabaseMock(respond, calls);
    vi.doMock("@supabase/supabase-js", () => ({ createClient: () => client }));
  }

  beforeEach(() => {
    vi.resetModules();
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
  });

  afterEach(() => {
    vi.doUnmock("@supabase/supabase-js");
    vi.restoreAllMocks();
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  });

  async function run(action: string, body: Record<string, unknown>) {
    const { default: mockedHandler } = await import("./account-links");
    const res = createResponse();
    await mockedHandler(
      {
        method: "POST",
        query: { action },
        headers: { authorization: "Bearer session-jwt" },
        body,
      } as never,
      res as never,
    );
    return res;
  }

  it("set_permission direction both writes the caller's offer AND acceptance bits", async () => {
    installMock((call) => {
      if (call.table === "account_links" && call.op === "select") return ACCEPTED_LINK;
      return null;
    });

    const res = await run("set_permission", {
      link_id: "link-1",
      permission: "shared_memory",
      direction: "both",
      enabled: true,
    });

    expect(res.statusCode).toBe(200);
    const updates = calls.filter(
      (c) => c.table === "link_permissions" && c.op === "update",
    );
    expect(updates).toHaveLength(2);

    const giveUpdate = updates.find(
      (c) => (c.payload as { owner_enabled?: boolean }).owner_enabled !== undefined,
    );
    expect(giveUpdate).toBeTruthy();
    expect(giveUpdate!.filters).toEqual(
      expect.arrayContaining([
        { method: "eq", args: ["owner_user_id", "me"] },
        { method: "eq", args: ["grantee_user_id", "them"] },
        { method: "eq", args: ["permission", "shared_memory"] },
      ]),
    );

    const receiveUpdate = updates.find(
      (c) => (c.payload as { grantee_enabled?: boolean }).grantee_enabled !== undefined,
    );
    expect(receiveUpdate).toBeTruthy();
    expect(receiveUpdate!.filters).toEqual(
      expect.arrayContaining([
        { method: "eq", args: ["owner_user_id", "them"] },
        { method: "eq", args: ["grantee_user_id", "me"] },
      ]),
    );

    const audit = calls.find((c) => c.table === "link_access_audit" && c.op === "insert");
    expect(audit).toBeTruthy();
    expect((audit!.payload as { metadata: { direction: string } }).metadata).toEqual({
      direction: "both",
    });
  });

  it("set_permission rejects an unknown direction", async () => {
    installMock(() => null);

    const res = await run("set_permission", {
      link_id: "link-1",
      permission: "shared_memory",
      direction: "sideways",
      enabled: true,
    });

    expect(res.statusCode).toBe(400);
    expect(calls.filter((c) => c.op === "update")).toHaveLength(0);
  });

  it("set_permission_all bulk-writes the caller's side across accepted links", async () => {
    installMock((call) => {
      if (call.table === "account_links" && call.op === "select") return [ACCEPTED_LINK];
      return null;
    });

    const res = await run("set_permission_all", {
      permission: "shared_chat",
      enabled: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, affected_links: 1 });

    const updates = calls.filter(
      (c) => c.table === "link_permissions" && c.op === "update",
    );
    expect(updates).toHaveLength(2);
    expect(updates[0].filters).toEqual(
      expect.arrayContaining([
        { method: "eq", args: ["owner_user_id", "me"] },
        { method: "eq", args: ["permission", "shared_chat"] },
        { method: "in", args: ["link_id", ["link-1"]] },
      ]),
    );
    expect(updates[1].filters).toEqual(
      expect.arrayContaining([
        { method: "eq", args: ["grantee_user_id", "me"] },
        { method: "eq", args: ["permission", "shared_chat"] },
      ]),
    );

    const audit = calls.find((c) => c.table === "link_access_audit" && c.op === "insert");
    expect(audit).toBeTruthy();
    expect((audit!.payload as { action: string }).action).toBe("permission_enabled_all");
  });

  it("set_permission_all rejects an unknown permission", async () => {
    installMock(() => null);

    const res = await run("set_permission_all", {
      permission: "shared_everything",
      enabled: true,
    });

    expect(res.statusCode).toBe(400);
    expect(calls.filter((c) => c.op === "update")).toHaveLength(0);
  });
});
