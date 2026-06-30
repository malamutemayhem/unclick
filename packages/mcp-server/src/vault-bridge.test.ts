import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  keychainGetCredential: vi.fn(),
}));

vi.mock("./keychain-tool.js", () => ({
  keychainGetCredential: mocks.keychainGetCredential,
}));

function jsonResponse(data: unknown, init: { status?: number } = {}): Response {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json" },
  });
}

describe("vault bridge credential resolution", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete process.env.UNCLICK_API_KEY;
    delete process.env.UNCLICK_API_URL;
    delete process.env.UNCLICK_MCP_SESSION_TOKEN;
    delete process.env.UNCLICK_API_KEY_HASH;
    delete process.env.UNCLICK_LOGIN_CONNECT_ENABLED;
  });

  it("prefers the saved web-login credential over a legacy single-key row for OAuth connectors", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://unclick.test";
    mocks.keychainGetCredential.mockResolvedValue("legacy-supabase-token");
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      expect(String(input)).toBe("https://unclick.test/api/credentials?platform=supabase");
      return jsonResponse({ access_token: "fresh-oauth-token" });
    }));

    const { credentialResolvedFromUnClick, resolveCredentials } = await import("./vault-bridge.js");
    const result = await resolveCredentials("supabase", {});

    expect(result.access_token).toBe("fresh-oauth-token");
    expect(credentialResolvedFromUnClick(result)).toBe(true);
    expect(mocks.keychainGetCredential).not.toHaveBeenCalled();
  });

  it("falls back to the legacy single-key row when an OAuth connector has no saved web login", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://unclick.test";
    mocks.keychainGetCredential.mockResolvedValue("legacy-supabase-token");
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ error: "not found" }, { status: 404 })));

    const { credentialResolvedFromUnClick, resolveCredentials } = await import("./vault-bridge.js");
    const result = await resolveCredentials("supabase", {});

    expect(result.access_token).toBe("legacy-supabase-token");
    expect(credentialResolvedFromUnClick(result)).toBe(false);
    expect(mocks.keychainGetCredential).toHaveBeenCalledWith("supabase");
  });
});

// ─── Keyless login session: MCP OAuth session-token fallback ─────────────────
//
// When there is NO plaintext UNCLICK_API_KEY but a verifiable MCP OAuth access
// token is present in UNCLICK_MCP_SESSION_TOKEN AND the login-connect flag is on,
// the credentials read is authorized with that token (Bearer <session token>).
// The bare lane hash (UNCLICK_API_KEY_HASH) is NEVER forwarded as a credential.

describe("vault bridge session-token fallback (keyless login)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete process.env.UNCLICK_API_KEY;
    delete process.env.UNCLICK_API_URL;
    delete process.env.UNCLICK_MCP_SESSION_TOKEN;
    delete process.env.UNCLICK_API_KEY_HASH;
    delete process.env.UNCLICK_LOGIN_CONNECT_ENABLED;
  });

  it("authorizes the credentials read with the session token when no plaintext key is present", async () => {
    delete process.env.UNCLICK_API_KEY;
    process.env.UNCLICK_API_URL = "https://unclick.test";
    process.env.UNCLICK_LOGIN_CONNECT_ENABLED = "1";
    process.env.UNCLICK_MCP_SESSION_TOKEN = "mcp.oauth.access.token";
    process.env.UNCLICK_API_KEY_HASH = "lane_hash_must_not_leak";
    mocks.keychainGetCredential.mockResolvedValue("");

    const seenAuth: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL, init?: RequestInit) => {
      const auth = (init?.headers as Record<string, string> | undefined)?.Authorization ?? "";
      seenAuth.push(auth);
      expect(String(input)).toBe("https://unclick.test/api/credentials?platform=supabase");
      return jsonResponse({ access_token: "session-resolved-token" });
    }));

    const { credentialResolvedFromUnClick, resolveCredentials } = await import("./vault-bridge.js");
    const result = await resolveCredentials("supabase", {});

    expect(result.access_token).toBe("session-resolved-token");
    expect(credentialResolvedFromUnClick(result)).toBe(true);
    // The session token authorized the read.
    expect(seenAuth).toContain("Bearer mcp.oauth.access.token");
    // The bare lane hash must never be sent as a credential.
    for (const auth of seenAuth) {
      expect(auth).not.toContain("lane_hash_must_not_leak");
    }
  });

  it("does NOT use the session token when the login-connect flag is off", async () => {
    delete process.env.UNCLICK_API_KEY;
    process.env.UNCLICK_API_URL = "https://unclick.test";
    // flag intentionally unset (default OFF)
    process.env.UNCLICK_MCP_SESSION_TOKEN = "mcp.oauth.access.token";
    mocks.keychainGetCredential.mockResolvedValue("");

    const fetchMock = vi.fn(async () => jsonResponse({ access_token: "should-not-be-used" }));
    vi.stubGlobal("fetch", fetchMock);

    const { credentialResolvedFromUnClick, resolveCredentials } = await import("./vault-bridge.js");
    const result = await resolveCredentials("supabase", {});

    // No plaintext key and flag off -> the UnClick API read is never attempted.
    expect(fetchMock).not.toHaveBeenCalled();
    expect(credentialResolvedFromUnClick(result)).toBe(false);
    expect("error" in result).toBe(true);
  });

  it("does NOT fall back to the session token when a plaintext key is present (plaintext wins)", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://unclick.test";
    process.env.UNCLICK_LOGIN_CONNECT_ENABLED = "1";
    process.env.UNCLICK_MCP_SESSION_TOKEN = "mcp.oauth.access.token";
    mocks.keychainGetCredential.mockResolvedValue("");

    const seenAuth: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_input: string | URL, init?: RequestInit) => {
      const auth = (init?.headers as Record<string, string> | undefined)?.Authorization ?? "";
      seenAuth.push(auth);
      return jsonResponse({ access_token: "plaintext-resolved-token" });
    }));

    const { resolveCredentials } = await import("./vault-bridge.js");
    const result = await resolveCredentials("supabase", {});

    expect(result.access_token).toBe("plaintext-resolved-token");
    // The plaintext api key authorized the read, not the session token.
    expect(seenAuth).toContain("Bearer uc_test");
    for (const auth of seenAuth) {
      expect(auth).not.toContain("mcp.oauth.access.token");
    }
  });
});

// ─── unclickCredentialsBearer: the bearer the key-gated meta-tools now use ────
//
// read_orchestrator_context, check_signals, and the Boardroom / AutoPilot-ledger
// tools route their Authorization through this so a keyless OAuth seat (bare
// https://unclick.world/api/mcp + magic-link login) works with no pasted key.
// Contract: plaintext key wins; else the MCP session token only when the
// login-connect flag is on; never the bare lane hash; null when truly offline.

describe("unclickCredentialsBearer", () => {
  afterEach(() => {
    delete process.env.UNCLICK_API_KEY;
    delete process.env.UNCLICK_MCP_SESSION_TOKEN;
    delete process.env.UNCLICK_API_KEY_HASH;
    delete process.env.UNCLICK_LOGIN_CONNECT_ENABLED;
  });

  it("returns the plaintext api key when present", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_MCP_SESSION_TOKEN = "mcp.session.token";
    process.env.UNCLICK_LOGIN_CONNECT_ENABLED = "1";
    const { unclickCredentialsBearer } = await import("./vault-bridge.js");
    expect(unclickCredentialsBearer()).toBe("uc_test");
  });

  it("returns the MCP session token when there is no key and login-connect is on", async () => {
    delete process.env.UNCLICK_API_KEY;
    process.env.UNCLICK_MCP_SESSION_TOKEN = "mcp.session.token";
    process.env.UNCLICK_LOGIN_CONNECT_ENABLED = "true";
    const { unclickCredentialsBearer } = await import("./vault-bridge.js");
    expect(unclickCredentialsBearer()).toBe("mcp.session.token");
  });

  it("returns null with a session token but the flag off (byte-identical to key-only)", async () => {
    delete process.env.UNCLICK_API_KEY;
    process.env.UNCLICK_MCP_SESSION_TOKEN = "mcp.session.token";
    // flag unset -> OFF
    const { unclickCredentialsBearer } = await import("./vault-bridge.js");
    expect(unclickCredentialsBearer()).toBeNull();
  });

  it("never returns the bare lane hash, and is null when fully offline", async () => {
    delete process.env.UNCLICK_API_KEY;
    delete process.env.UNCLICK_MCP_SESSION_TOKEN;
    process.env.UNCLICK_API_KEY_HASH = "lane_hash_must_not_leak";
    process.env.UNCLICK_LOGIN_CONNECT_ENABLED = "1";
    const { unclickCredentialsBearer } = await import("./vault-bridge.js");
    expect(unclickCredentialsBearer()).toBeNull();
  });
});
