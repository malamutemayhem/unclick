import { afterEach, describe, expect, it, vi } from "vitest";
import {
  isExpiring,
  needsRefresh,
  refreshOAuthCredential,
} from "./oauth-refresh.js";

const savedEnv = { ...process.env };

afterEach(() => {
  vi.unstubAllGlobals();
  process.env = { ...savedEnv };
});

describe("isExpiring", () => {
  it("treats a missing or unparseable expiry as expiring", () => {
    expect(isExpiring(undefined)).toBe(true);
    expect(isExpiring("")).toBe(true);
    expect(isExpiring("not-a-date")).toBe(true);
  });

  it("is false for a token comfortably in the future", () => {
    expect(isExpiring(new Date(Date.now() + 60 * 60_000).toISOString())).toBe(false);
  });

  it("is true within the skew window and for already-expired tokens", () => {
    expect(isExpiring(new Date(Date.now() + 30_000).toISOString())).toBe(true);
    expect(isExpiring(new Date(Date.now() - 60_000).toISOString())).toBe(true);
  });
});

describe("needsRefresh", () => {
  it("is false for platforms with no refresh config", () => {
    expect(needsRefresh("github", { refresh_token: "x", expires_at: "" })).toBe(false);
  });

  it("is false when there is no stored refresh token", () => {
    expect(needsRefresh("gmail", { access_token: "a" })).toBe(false);
  });

  it("is true when a refresh-capable token is expiring", () => {
    expect(needsRefresh("gmail", { refresh_token: "r", expires_at: new Date(Date.now() - 1000).toISOString() })).toBe(true);
  });

  it("is false for a fresh token but true when forced", () => {
    const fresh = { refresh_token: "r", expires_at: new Date(Date.now() + 60 * 60_000).toISOString() };
    expect(needsRefresh("gmail", fresh)).toBe(false);
    expect(needsRefresh("gmail", fresh, true)).toBe(true);
  });
});

describe("refreshOAuthCredential", () => {
  it("exchanges a Google refresh token and keeps the old refresh token when none is returned", async () => {
    process.env.GOOGLE_WORKSPACE_CLIENT_ID = "google-client";
    process.env.GOOGLE_WORKSPACE_CLIENT_SECRET = "google-secret";

    const fetchMock = vi.fn(async (url: string | URL, init?: RequestInit) => {
      expect(String(url)).toBe("https://oauth2.googleapis.com/token");
      const body = String(init?.body);
      expect(body).toContain("grant_type=refresh_token");
      expect(body).toContain("refresh_token=stored-refresh");
      expect(body).toContain("client_id=google-client");
      expect(body).toContain("client_secret=google-secret");
      return { ok: true, json: async () => ({ access_token: "fresh-access", expires_in: 3600 }) };
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await refreshOAuthCredential("gmail", {
      access_token: "stale-access",
      refresh_token: "stored-refresh",
      expires_at: new Date(Date.now() - 1000).toISOString(),
    });

    expect(result).not.toBeNull();
    expect(result?.access_token).toBe("fresh-access");
    expect(result?.refresh_token).toBe("stored-refresh"); // unchanged
    expect(Date.parse(result?.expires_at ?? "")).toBeGreaterThan(Date.now());
  });

  it("persists a rotated refresh token and keeps the api_key alias in sync", async () => {
    process.env.VERCEL_CLIENT_ID = "vercel-client";
    process.env.VERCEL_CLIENT_SECRET = "vercel-secret";

    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      json: async () => ({ access_token: "new-access", refresh_token: "rotated-refresh", expires_in: 3600 }),
    })));

    const result = await refreshOAuthCredential("vercel", {
      api_key: "old-access",
      access_token: "old-access",
      refresh_token: "old-refresh",
      expires_at: new Date(Date.now() - 1000).toISOString(),
    });

    expect(result?.access_token).toBe("new-access");
    expect(result?.api_key).toBe("new-access");
    expect(result?.refresh_token).toBe("rotated-refresh");
  });

  it("uses Basic auth for Supabase", async () => {
    process.env.SUPABASE_OAUTH_CLIENT_ID = "sb-client";
    process.env.SUPABASE_OAUTH_CLIENT_SECRET = "sb-secret";

    const fetchMock = vi.fn(async (_url: string | URL, init?: RequestInit) => {
      const auth = (init?.headers as Record<string, string>).Authorization;
      expect(auth).toBe(`Basic ${Buffer.from("sb-client:sb-secret", "utf8").toString("base64")}`);
      expect(String(init?.body)).not.toContain("client_secret=");
      return { ok: true, json: async () => ({ access_token: "sb-access", expires_in: 3600 }) };
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await refreshOAuthCredential("supabase", {
      access_token: "old",
      refresh_token: "sb-refresh",
      expires_at: "",
    });
    expect(result?.access_token).toBe("sb-access");
  });

  it("returns null (fall back to stored token) when the provider rejects the refresh", async () => {
    process.env.GOOGLE_WORKSPACE_CLIENT_ID = "google-client";
    process.env.GOOGLE_WORKSPACE_CLIENT_SECRET = "google-secret";

    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, json: async () => ({ error: "invalid_grant" }) })));

    const result = await refreshOAuthCredential("gmail", {
      access_token: "stale",
      refresh_token: "revoked",
      expires_at: new Date(Date.now() - 1000).toISOString(),
    });
    expect(result).toBeNull();
  });

  it("returns null when the provider's client env vars are not configured", async () => {
    delete process.env.GOOGLE_WORKSPACE_CLIENT_ID;
    delete process.env.GOOGLE_WORKSPACE_CLIENT_SECRET;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await refreshOAuthCredential("gmail", { refresh_token: "r" });
    expect(result).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("never throws on a network error", async () => {
    process.env.GOOGLE_WORKSPACE_CLIENT_ID = "google-client";
    process.env.GOOGLE_WORKSPACE_CLIENT_SECRET = "google-secret";
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network down"); }));

    const result = await refreshOAuthCredential("gmail", { refresh_token: "r", expires_at: "" });
    expect(result).toBeNull();
  });
});
