import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { keychainAction } from "./keychain-tool.js";

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
    expect(result.credential_saved).toBe(true);
    expect(result.last_tested_age_hours).toBeNull();
    expect(result.source).toBe("user_credentials");
    expect(result.message).toContain("has not been live-tested yet");
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
      last_tested_age_hours?: number | null;
      message?: string;
    };

    expect(result.connected).toBe(false);
    expect(result.connection_state).toBe("stale");
    expect(result.health).toBe("stale");
    expect(result.verified).toBe(false);
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
            last_tested_at: "2026-06-18T02:00:00.000Z",
            created_at: "2026-06-18T00:00:00.000Z",
            updated_at: "2026-06-18T02:00:00.000Z",
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
    expect(vercel?.credential_saved).toBe(true);
    expect(vercel?.connected_source).toBe("user_credentials");
    expect(github?.connected).toBe(true);
    expect(github?.connection_state).toBe("connected");
    expect(github?.health).toBe("healthy");
    expect(github?.verified).toBe(true);
    expect(stripe?.connected).toBe(false);
    expect(stripe?.connection_state).toBe("missing");
    expect(stripe?.health).toBe("missing");
    expect(result.unverified_platforms).toContain("vercel");
    expect(result.warnings?.[0]).toContain("Stored credentials need live proof");
  });
});
