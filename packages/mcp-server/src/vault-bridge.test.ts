import { afterEach, describe, expect, it, vi } from "vitest";

import { resetTenantSettingsCache } from "./memory/tenant-settings.js";

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

// ─── Login-connect: keyless/login hash fallback ───────────────────────────────
//
// A keyless/login MCP session carries only the account lane in
// UNCLICK_API_KEY_HASH (never the plaintext key; see api/mcp.ts). When the
// login-connect flag mirror is on, tryResolveFromUnClickApi falls back to that
// lane as the bearer so the credentials GET can resolve + decrypt the
// server-scheme row. The fallback fires ONLY when no plaintext key is present
// AND the flag is on; otherwise behaviour is byte-identical to plaintext-only.

const LANE_HASH =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

describe("vault bridge keyless/login hash fallback", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete process.env.UNCLICK_API_KEY;
    delete process.env.UNCLICK_API_KEY_HASH;
    delete process.env.UNCLICK_API_URL;
    delete process.env.UNCLICK_LOGIN_CONNECT_ENABLED;
    delete process.env.BACKSTAGEPASS_VAULT_ENABLED;
    resetTenantSettingsCache();
  });

  it("uses UNCLICK_API_KEY_HASH as the bearer when plaintext is absent and the flag is on", async () => {
    delete process.env.UNCLICK_API_KEY;
    process.env.UNCLICK_API_KEY_HASH = LANE_HASH;
    process.env.UNCLICK_API_URL = "https://unclick.test";
    process.env.UNCLICK_LOGIN_CONNECT_ENABLED = "1";
    process.env.BACKSTAGEPASS_VAULT_ENABLED = "1";
    mocks.keychainGetCredential.mockResolvedValue("");

    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      expect(String(input)).toBe("https://unclick.test/api/credentials?platform=vercel");
      const auth = (init?.headers as Record<string, string> | undefined)?.Authorization;
      expect(auth).toBe(`Bearer ${LANE_HASH}`);
      return jsonResponse({ api_key: "server-scheme-token" });
    });
    vi.stubGlobal("fetch", fetchMock);

    const { credentialResolvedFromUnClick, resolveCredentials } = await import("./vault-bridge.js");
    const result = await resolveCredentials("vercel", {});

    expect(result.api_key).toBe("server-scheme-token");
    expect(credentialResolvedFromUnClick(result)).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does NOT call the credentials API on a hash-only session when the flag is off", async () => {
    delete process.env.UNCLICK_API_KEY;
    process.env.UNCLICK_API_KEY_HASH = LANE_HASH;
    process.env.UNCLICK_API_URL = "https://unclick.test";
    delete process.env.UNCLICK_LOGIN_CONNECT_ENABLED;
    process.env.BACKSTAGEPASS_VAULT_ENABLED = "1";
    mocks.keychainGetCredential.mockResolvedValue("");

    const fetchMock = vi.fn(async () => jsonResponse({ api_key: "should-not-be-read" }));
    vi.stubGlobal("fetch", fetchMock);

    const { credentialResolvedFromUnClick, resolveCredentials } = await import("./vault-bridge.js");
    const result = await resolveCredentials("vercel", {});

    // Flag off -> the hash fallback never fires -> no credentials API call and
    // an actionable setup error is returned instead.
    expect(fetchMock).not.toHaveBeenCalled();
    expect(credentialResolvedFromUnClick(result)).toBe(false);
    expect(result).toHaveProperty("error");
  });

  it("still prefers the plaintext api key when one is present (hash fallback unused)", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_KEY_HASH = LANE_HASH;
    process.env.UNCLICK_API_URL = "https://unclick.test";
    process.env.UNCLICK_LOGIN_CONNECT_ENABLED = "1";
    process.env.BACKSTAGEPASS_VAULT_ENABLED = "1";
    mocks.keychainGetCredential.mockResolvedValue("");

    const fetchMock = vi.fn(async (_input: string | URL, init?: RequestInit) => {
      const auth = (init?.headers as Record<string, string> | undefined)?.Authorization;
      // Plaintext path is unchanged: the raw api key, never the lane hash.
      expect(auth).toBe("Bearer uc_test");
      return jsonResponse({ api_key: "plaintext-path-token" });
    });
    vi.stubGlobal("fetch", fetchMock);

    const { resolveCredentials } = await import("./vault-bridge.js");
    const result = await resolveCredentials("vercel", {});

    expect(result.api_key).toBe("plaintext-path-token");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
