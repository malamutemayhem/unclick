import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";

import { keychainAction, keychainGetCredential } from "./keychain-tool.js";

const savedEnv = { ...process.env };

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("keychain connection status", () => {
  beforeEach(() => {
    process.env = {
      ...savedEnv,
      UNCLICK_API_KEY: "uc_test_key_for_status_parity",
      UNCLICK_API_KEY_HASH: "",
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "service-role",
    };
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
    process.env = { ...savedEnv };
  });

  it("reports stored OAuth credentials without probe evidence as untested", async () => {
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/rest/v1/platform_credentials?")) return jsonResponse([]);
      if (url.includes("/rest/v1/user_credentials?")) {
        return jsonResponse([
          {
            platform_slug: "vercel",
            label: null,
            is_valid: true,
            last_tested_at: null,
            created_at: "2026-06-18T00:00:00.000Z",
            updated_at: "2026-06-18T01:00:00.000Z",
          },
        ]);
      }
      if (url.includes("/rest/v1/managed_app_connections?")) return jsonResponse([]);
      if (url.includes("/rest/v1/metering_events")) return jsonResponse(null, 201);
      throw new Error(`Unexpected fetch: ${url}`);
    }));

    const result = await keychainAction("keychain_status", { platform: "vercel" }) as {
      connected?: boolean;
      connection_state?: string;
      health?: string;
      verified?: boolean;
      stale?: boolean;
      needs_recheck?: boolean;
      credential_saved?: boolean;
      last_tested_age_hours?: number | null;
      source?: string;
      platform?: string;
      message?: string;
    };

    expect(result.platform).toBe("vercel");
    expect(result.connected).toBe(false);
    expect(result.connection_state).toBe("untested");
    expect(result.health).toBe("untested");
    expect(result.verified).toBe(false);
    // An untested credential keeps its own health but still needs a live check.
    expect(result.stale).toBe(false);
    expect(result.needs_recheck).toBe(true);
    expect(result.credential_saved).toBe(true);
    expect(result.last_tested_age_hours).toBeNull();
    expect(result.source).toBe("user_credentials");
    expect(result.message).toContain("has not been live-tested yet");
  });

  it("reports a freshly tested credential as healthy and not needing a recheck", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-22T12:00:00.000Z"));
    const expectedHash = createHash("sha256")
      .update("uc_test_key_for_status_parity")
      .digest("hex");
    delete process.env.UNCLICK_API_KEY;
    process.env.UNCLICK_API_KEY_HASH = expectedHash;

    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/rest/v1/platform_credentials?")) {
        expect(url).toContain(`key_hash=eq.${expectedHash}`);
        return jsonResponse([]);
      }
      if (url.includes("/rest/v1/user_credentials?")) {
        expect(url).toContain(`api_key_hash=eq.${expectedHash}`);
        return jsonResponse([
          {
            platform_slug: "gmail",
            label: null,
            is_valid: true,
            // Tested ~16h before "now", comfortably inside the recheck horizon.
            last_tested_at: "2026-06-21T20:00:00.000Z",
            created_at: "2026-06-21T19:00:00.000Z",
            updated_at: "2026-06-21T20:00:00.000Z",
          },
        ]);
      }
      if (url.includes("/rest/v1/managed_app_connections?")) {
        expect(url).toContain(`api_key_hash=eq.${expectedHash}`);
        return jsonResponse([]);
      }
      if (url.includes("/rest/v1/metering_events")) return jsonResponse(null, 201);
      throw new Error(`Unexpected fetch: ${url}`);
    }));

    const result = await keychainAction("keychain_status", { platform: "gmail" }) as {
      error?: string;
      connected?: boolean;
      platform?: string;
      source?: string;
      verified?: boolean;
      stale?: boolean;
      needs_recheck?: boolean;
    };

    expect(result.error).toBeUndefined();
    expect(result.platform).toBe("gmail");
    expect(result.connected).toBe(true);
    expect(result.verified).toBe(true);
    expect(result.stale).toBe(false);
    expect(result.needs_recheck).toBe(false);
    expect(result.source).toBe("user_credentials");

    await expect(keychainGetCredential("gmail")).resolves.toBeNull();
  });

  it("flags connected-but-old proof as stale and needing a recheck", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-22T12:00:00.000Z"));

    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/rest/v1/platform_credentials?")) return jsonResponse([]);
      if (url.includes("/rest/v1/user_credentials?")) {
        return jsonResponse([
          {
            platform_slug: "gmail",
            label: null,
            is_valid: true,
            // Tested 7 days ago: stored proof exists but is well past the 72h horizon.
            last_tested_at: "2026-06-15T12:00:00.000Z",
            created_at: "2026-06-01T00:00:00.000Z",
            updated_at: "2026-06-15T12:00:00.000Z",
          },
        ]);
      }
      if (url.includes("/rest/v1/managed_app_connections?")) return jsonResponse([]);
      if (url.includes("/rest/v1/metering_events")) return jsonResponse(null, 201);
      throw new Error(`Unexpected fetch: ${url}`);
    }));

    const result = await keychainAction("keychain_status", { platform: "gmail" }) as {
      connected?: boolean;
      connection_state?: string;
      health?: string;
      verified?: boolean;
      stale?: boolean;
      needs_recheck?: boolean;
      message?: string;
    };

    // Stored proof still backs `connected`, but the badge no longer claims healthy.
    expect(result.connected).toBe(true);
    expect(result.connection_state).toBe("connected");
    expect(result.health).toBe("stale");
    expect(result.verified).toBe(false);
    expect(result.stale).toBe(true);
    expect(result.needs_recheck).toBe(true);
    expect(result.message).toContain("old");
  });

  it("treats stale probe evidence as needing a fresh check", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-21T12:00:00.000Z"));
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/rest/v1/platform_credentials?")) return jsonResponse([]);
      if (url.includes("/rest/v1/user_credentials?")) {
        return jsonResponse([
          {
            platform_slug: "dropbox",
            label: null,
            is_valid: true,
            last_tested_at: "2026-05-01T12:00:00.000Z",
            created_at: "2026-05-01T00:00:00.000Z",
            updated_at: "2026-05-01T12:00:00.000Z",
          },
        ]);
      }
      if (url.includes("/rest/v1/managed_app_connections?")) return jsonResponse([]);
      if (url.includes("/rest/v1/metering_events")) return jsonResponse(null, 201);
      throw new Error(`Unexpected fetch: ${url}`);
    }));

    const result = await keychainAction("keychain_status", { platform: "dropbox" }) as {
      connected?: boolean;
      connection_state?: string;
      health?: string;
      verified?: boolean;
      stale?: boolean;
      needs_recheck?: boolean;
      last_tested_age_hours?: number | null;
      message?: string;
    };

    expect(result.connected).toBe(false);
    expect(result.connection_state).toBe("stale");
    expect(result.health).toBe("stale");
    expect(result.verified).toBe(false);
    expect(result.stale).toBe(true);
    expect(result.needs_recheck).toBe(true);
    expect(result.last_tested_age_hours).toBe(1224);
    expect(result.message).toContain("old connection proof");
  });

  it("does not mark OAuth-store rows connected until proof exists", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-21T12:00:00.000Z"));
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/rest/v1/platform_connectors?")) {
        return jsonResponse([
          { id: "stripe", name: "Stripe", category: "Payments", auth_type: "api_key", sort_order: 1 },
          { id: "vercel", name: "Vercel", category: "Developer Tools", auth_type: "oauth2", sort_order: 2 },
          { id: "github", name: "GitHub", category: "Developer Tools", auth_type: "oauth2", sort_order: 3 },
        ]);
      }
      if (url.includes("/rest/v1/platform_credentials?")) return jsonResponse([]);
      if (url.includes("/rest/v1/user_credentials?")) {
        return jsonResponse([
          {
            platform_slug: "vercel",
            label: null,
            is_valid: true,
            last_tested_at: null,
            created_at: "2026-06-18T00:00:00.000Z",
            updated_at: "2026-06-18T01:00:00.000Z",
          },
          {
            platform_slug: "github",
            label: null,
            is_valid: true,
            // Tested 12h before "now": fresh enough to stay healthy/verified.
            last_tested_at: "2026-06-21T00:00:00.000Z",
            created_at: "2026-06-18T00:00:00.000Z",
            updated_at: "2026-06-21T00:00:00.000Z",
          },
        ]);
      }
      if (url.includes("/rest/v1/managed_app_connections?")) return jsonResponse([]);
      if (url.includes("/rest/v1/metering_events")) return jsonResponse(null, 201);
      throw new Error(`Unexpected fetch: ${url}`);
    }));

    const result = await keychainAction("keychain_list_platforms", { category: "Developer Tools" }) as {
      platforms?: Array<{
        id: string;
        connected?: boolean;
        connection_state?: string;
        health?: string;
        verified?: boolean;
        stale?: boolean;
        needs_recheck?: boolean;
        credential_saved?: boolean;
        connected_source?: string | null;
      }>;
      warnings?: string[];
      unverified_platforms?: string[];
    };

    const vercel = result.platforms?.find((platform) => platform.id === "vercel");
    const github = result.platforms?.find((platform) => platform.id === "github");
    const stripe = result.platforms?.find((platform) => platform.id === "stripe");

    expect(vercel?.connected).toBe(false);
    expect(vercel?.connection_state).toBe("untested");
    expect(vercel?.health).toBe("untested");
    expect(vercel?.verified).toBe(false);
    expect(vercel?.needs_recheck).toBe(true);
    expect(vercel?.credential_saved).toBe(true);
    expect(vercel?.connected_source).toBe("user_credentials");
    expect(github?.connected).toBe(true);
    expect(github?.connection_state).toBe("connected");
    expect(github?.health).toBe("healthy");
    expect(github?.verified).toBe(true);
    expect(github?.stale).toBe(false);
    expect(github?.needs_recheck).toBe(false);
    expect(stripe?.connected).toBe(false);
    expect(stripe?.connection_state).toBe("missing");
    expect(stripe?.health).toBe("missing");
    expect(stripe?.needs_recheck).toBe(false);
    expect(result.unverified_platforms).toContain("vercel");
    expect(result.warnings?.[0]).toContain("Stored credentials need live proof");
  });
});
