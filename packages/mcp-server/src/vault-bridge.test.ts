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
