import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "./credentials";
import {
  decryptForAccount,
  encryptForAccount,
  type EncryptedCredential,
} from "./lib/chat-crypto";

function createResponse() {
  const response = {
    headers: {} as Record<string, string>,
    statusCode: 200,
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
      return body;
    },
    end() {
      this.ended = true;
      return this;
    },
  };

  return response;
}

describe("credentials API cache headers", () => {
  beforeEach(() => {
    vi.stubEnv("SUPABASE_URL", "https://supabase.test");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("forbids browser, CDN, and Vercel CDN caching before any response path returns", async () => {
    const res = createResponse();

    await handler({ method: "OPTIONS", headers: {} } as never, res as never);

    expect(res.statusCode).toBe(204);
    expect(res.ended).toBe(true);
    expect(res.headers["Cache-Control"]).toBe("private, no-store, max-age=0, must-revalidate");
    expect(res.headers["CDN-Cache-Control"]).toBe("no-store");
    expect(res.headers["Vercel-CDN-Cache-Control"]).toBe("no-store");
  });

  it("marks a saved credential tested without accepting a credential value", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => ({
      ok: true,
      status: 200,
      json: async () => [{ id: "cred_1" }],
    }));
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    const body = await handler({
      method: "PATCH",
      headers: { authorization: "Bearer uc_live_probe" },
      body: { platform: "gmail" },
    } as never, res as never);

    expect(res.statusCode).toBe(200);
    expect(body).toMatchObject({ success: true, platform: "gmail", label: null });
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/rest/v1/user_credentials?");
    expect(url).toContain("platform_slug=eq.gmail");
    expect(init.method).toBe("PATCH");
    expect(String(init.body)).toContain("last_tested_at");
    expect(String(init.body)).not.toMatch(/access_token|api_key|secret|password/i);
  });

  it("can stamp live proof while storing a server-verified OAuth credential", async () => {
    const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => ({
      ok: true,
      status: 200,
      json: async () => [{ id: "cred_1" }],
    }));
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    const body = await handler({
      method: "POST",
      headers: {},
      body: {
        platform: "supabase",
        api_key: "uc_live_probe",
        credentials: { access_token: "stored-secret" },
        mark_tested: true,
      },
    } as never, res as never);

    expect(res.statusCode).toBe(200);
    expect(body).toMatchObject({ success: true, platform: "supabase" });
    const [_url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const storedRow = JSON.parse(String(init.body)) as Record<string, unknown>;
    expect(storedRow).toMatchObject({
      platform_slug: "supabase",
      is_valid: true,
    });
    expect(storedRow.last_tested_at).toEqual(storedRow.updated_at);
    expect(String(init.body)).not.toContain("stored-secret");
  });
});

// ─── Login-connect (server scheme) ────────────────────────────────────────────
//
// With UNCLICK_LOGIN_CONNECT_ENABLED on and UNCLICK_AI_KEY_SECRET set, a session
// (or uc_/agt_ key) resolves an account lane and credentials are stored /
// read under enc_scheme='server' encrypted to that lane - no pasted api key.

const SERVER_SECRET = "test-ai-key-secret-do-not-change";
const LANE = "lane_hash_for_account_aaa";

describe("credentials API login-connect server scheme", () => {
  beforeEach(() => {
    vi.stubEnv("SUPABASE_URL", "https://supabase.test");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role");
    vi.stubEnv("UNCLICK_LOGIN_CONNECT_ENABLED", "1");
    vi.stubEnv("UNCLICK_AI_KEY_SECRET", SERVER_SECRET);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("POST without api_key stores a server-scheme row scoped to the resolved lane", async () => {
    // resolveAccountLane(uc_ key) -> GET api_keys?key_hash=... -> lane;
    // then POST upsert into user_credentials.
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      if (url.includes("/rest/v1/api_keys")) {
        return { ok: true, status: 200, json: async () => [{ lane_hash: LANE }] };
      }
      return { ok: true, status: 200, json: async () => [] };
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    const body = await handler({
      method: "POST",
      headers: { authorization: "Bearer uc_session_proxy_key" },
      body: {
        platform: "notion",
        credentials: { api_key: "ntn-secret-token" },
      },
    } as never, res as never);

    expect(res.statusCode).toBe(200);
    expect(body).toMatchObject({ success: true, platform: "notion" });

    const upsert = fetchMock.mock.calls.find(([u]) =>
      String(u).includes("/rest/v1/user_credentials?on_conflict="),
    ) as [string, RequestInit] | undefined;
    expect(upsert).toBeDefined();
    const row = JSON.parse(String(upsert![1].body)) as Record<string, string>;
    expect(row.enc_scheme).toBe("server");
    expect(row.lane_hash).toBe(LANE);
    expect(row.api_key_hash).toBe(LANE);
    expect(row.platform_slug).toBe("notion");
    // Plaintext credential must never appear in the stored row.
    expect(String(upsert![1].body)).not.toContain("ntn-secret-token");
    // Sanity: the stored ciphertext decrypts back to the original under the lane.
    const enc: EncryptedCredential = {
      encryption_iv: row.encryption_iv,
      encryption_tag: row.encryption_tag,
      encrypted_data: row.encrypted_data,
      encryption_salt: row.encryption_salt,
    };
    expect(JSON.parse(decryptForAccount(SERVER_SECRET, LANE, enc))).toEqual({
      api_key: "ntn-secret-token",
    });
  });

  it("GET decrypts a server-scheme row found by lane and never leaks the secret", async () => {
    const enc = encryptForAccount(SERVER_SECRET, LANE, JSON.stringify({ api_key: "ntn-secret-token" }));
    const serverRow = {
      id: "cred_server_1",
      enc_scheme: "server",
      lane_hash: LANE,
      platform_slug: "notion",
      label: null,
      encrypted_data: enc.encrypted_data,
      encryption_iv: enc.encryption_iv,
      encryption_tag: enc.encryption_tag,
      encryption_salt: enc.encryption_salt,
    };

    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      if (url.includes("/rest/v1/api_keys")) {
        return { ok: true, status: 200, json: async () => [{ lane_hash: LANE }] };
      }
      // Primary api_key_hash lookup returns nothing (session caller); the
      // lane_hash + enc_scheme=server fallback returns the server row.
      if (url.includes("enc_scheme=eq.server")) {
        return { ok: true, status: 200, json: async () => [serverRow] };
      }
      return { ok: true, status: 200, json: async () => [] };
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    const body = await handler({
      method: "GET",
      headers: { authorization: "Bearer uc_session_proxy_key" },
      query: { platform: "notion" },
    } as never, res as never);

    expect(res.statusCode).toBe(200);
    expect(body).toMatchObject({ api_key: "ntn-secret-token" });
    // The server secret must never appear in any outbound request.
    for (const [, init] of fetchMock.mock.calls as Array<[string, RequestInit | undefined]>) {
      if (init?.body) expect(String(init.body)).not.toContain(SERVER_SECRET);
    }
  });

  it("scopes the server-scheme lookup to the resolved lane AND enc_scheme=server", async () => {
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      if (url.includes("/rest/v1/api_keys")) {
        return { ok: true, status: 200, json: async () => [{ lane_hash: LANE }] };
      }
      return { ok: true, status: 200, json: async () => [] };
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    await handler({
      method: "GET",
      headers: { authorization: "Bearer uc_session_proxy_key" },
      query: { platform: "notion" },
    } as never, res as never);

    const laneLookup = fetchMock.mock.calls
      .map(([u]) => String(u))
      .find((u) => u.includes("enc_scheme=eq.server"));
    expect(laneLookup).toBeDefined();
    expect(laneLookup).toContain(`lane_hash=eq.${LANE}`);
    expect(laneLookup).toContain("enc_scheme=eq.server");
    expect(laneLookup).toContain("platform_slug=eq.notion");
  });
});
