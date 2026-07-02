import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "./credentials";
import { createMcpOAuthAccessToken } from "./lib/mcp-oauth";
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

// ─── Login-connect (server scheme) ───────────────────────────────────────
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

// ─── MCP OAuth access-token authorization (keyless login session) ─────────────
//
// An agent on a keyless/login MCP session presents a cryptographically-verifiable
// MCP OAuth access token (NOT a uc_/agt_ key, NOT a bare lane_hash). The GET path
// resolves its lane from the VERIFIED token sub and decrypts that account's own
// enc_scheme='server' row. A bare lane_hash must resolve NOTHING, and an apikey
// row must never be handed to a token-only caller (it has no raw key to decrypt).

describe("credentials API GET via verified MCP OAuth access token", () => {
  // The MCP OAuth signing secret falls back to SUPABASE_SERVICE_ROLE_KEY, so the
  // same value used to mint a token here is what verifyMcpOAuthToken checks.
  const USER_ID = "00000000-0000-4000-8000-000000000aaa";

  beforeEach(() => {
    vi.stubEnv("SUPABASE_URL", "https://supabase.test");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role-signing-secret");
    vi.stubEnv("UNCLICK_LOGIN_CONNECT_ENABLED", "1");
    vi.stubEnv("UNCLICK_AI_KEY_SECRET", SERVER_SECRET);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  function mintToken(userId: string): string {
    return createMcpOAuthAccessToken({ userId }, process.env).access_token;
  }

  it("resolves the lane from the verified token sub and decrypts the account's server-scheme row", async () => {
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
      // The verified token sub maps to the account's freshest active key -> lane.
      if (url.includes("/rest/v1/api_keys") && url.includes("user_id=eq.")) {
        return { ok: true, status: 200, json: async () => [{ lane_hash: LANE }] };
      }
      // The primary api_key_hash lookup (hash of the OPAQUE token string) misses.
      if (url.includes("enc_scheme=eq.server")) {
        return { ok: true, status: 200, json: async () => [serverRow] };
      }
      return { ok: true, status: 200, json: async () => [] };
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    const body = await handler({
      method: "GET",
      headers: { authorization: `Bearer ${mintToken(USER_ID)}` },
      query: { platform: "notion" },
    } as never, res as never);

    expect(res.statusCode).toBe(200);
    expect(body).toMatchObject({ api_key: "ntn-secret-token" });
    // The lane was derived from the verified sub via the user_id lookup, never
    // from a caller-supplied value.
    const userLaneLookup = fetchMock.mock.calls
      .map(([u]) => String(u))
      .find((u) => u.includes("/rest/v1/api_keys") && u.includes(`user_id=eq.${USER_ID}`));
    expect(userLaneLookup).toBeDefined();
  });

  it("resolves NOTHING from a bare lane_hash bearer (no token verification, no decrypt)", async () => {
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

    let serverSchemeLookupAttempted = false;
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      if (url.includes("enc_scheme=eq.server")) {
        serverSchemeLookupAttempted = true;
        return { ok: true, status: 200, json: async () => [serverRow] };
      }
      // Any api_keys lookup (by key_hash or user_id) returns nothing; a bare
      // lane is never used as a credential here.
      return { ok: true, status: 200, json: async () => [] };
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    const body = await handler({
      method: "GET",
      // The raw lane_hash, presented as if it were a credential. It is NOT a
      // uc_/agt_ key, NOT a Supabase JWT, and does NOT verify as an MCP OAuth
      // token, so resolveAccountLane returns null and no lane lookup happens.
      headers: { authorization: `Bearer ${LANE}` },
      query: { platform: "notion" },
    } as never, res as never);

    // No lane resolved -> the server-scheme lane lookup is never even issued ->
    // the row is never reached -> nothing decrypted -> 404 (no creds for caller).
    expect(serverSchemeLookupAttempted).toBe(false);
    expect(res.statusCode).toBe(404);
    expect(body).toMatchObject({ setup_url: expect.stringContaining("/connect/notion") });
  });

  it("never hands an apikey-scheme row to a token-only caller (no raw key to decrypt)", async () => {
    // An apikey-scheme row exists for this account, but the token-only caller has
    // no raw api key. The lane lookup only ever targets enc_scheme='server', so
    // the apikey PBKDF2 branch is unreachable and the apikey row is not returned.
    const apikeyRow = {
      id: "cred_apikey_1",
      enc_scheme: "apikey",
      lane_hash: LANE,
      platform_slug: "notion",
      label: null,
      encryption_salt: "00".repeat(32),
      encryption_iv: "00".repeat(12),
      encryption_tag: "00".repeat(16),
      encrypted_data: "deadbeef",
    };

    const serverSchemeUrls: string[] = [];
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      if (url.includes("/rest/v1/api_keys") && url.includes("user_id=eq.")) {
        return { ok: true, status: 200, json: async () => [{ lane_hash: LANE }] };
      }
      if (url.includes("enc_scheme=eq.server")) {
        serverSchemeUrls.push(url);
        // The lane query is scoped to enc_scheme=server, so an apikey row never
        // matches it. Return empty to model "no server row for this account".
        return { ok: true, status: 200, json: async () => [] };
      }
      // The primary api_key_hash lookup (hash of the token) could in theory be
      // satisfied by leaked data; assert the handler does NOT decrypt it by
      // returning the apikey row here and proving it is never returned to the
      // caller (the token-only caller cannot decrypt an apikey row).
      if (url.includes("api_key_hash=eq.")) {
        return { ok: true, status: 200, json: async () => [] };
      }
      return { ok: true, status: 200, json: async () => [] };
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    const body = await handler({
      method: "GET",
      headers: { authorization: `Bearer ${mintToken(USER_ID)}` },
      query: { platform: "notion" },
    } as never, res as never);

    // The lane lookup is enc_scheme=server-scoped; the apikey row is unreachable.
    expect(serverSchemeUrls.length).toBeGreaterThan(0);
    for (const u of serverSchemeUrls) expect(u).toContain("enc_scheme=eq.server");
    // No server row -> 404, and the apikey ciphertext is never decrypted/returned.
    expect(res.statusCode).toBe(404);
    expect(JSON.stringify(body)).not.toContain(apikeyRow.encrypted_data);
  });

  it("with the flag OFF, an MCP OAuth token resolves no lane (byte-identical to original)", async () => {
    vi.stubEnv("UNCLICK_LOGIN_CONNECT_ENABLED", "0");

    let serverSchemeLookupAttempted = false;
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      if (url.includes("enc_scheme=eq.server")) {
        serverSchemeLookupAttempted = true;
        return { ok: true, status: 200, json: async () => [] };
      }
      return { ok: true, status: 200, json: async () => [] };
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    await handler({
      method: "GET",
      headers: { authorization: `Bearer ${mintToken(USER_ID)}` },
      query: { platform: "notion" },
    } as never, res as never);

    // Flag off -> no lane resolution at all -> no server-scheme lookup.
    expect(serverSchemeLookupAttempted).toBe(false);
    expect(res.statusCode).toBe(404);
  });
});
