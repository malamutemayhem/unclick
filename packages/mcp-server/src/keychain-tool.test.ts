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
    process.env = { ...savedEnv };
  });

  it("reports OAuth credentials from user_credentials as connected", async () => {
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
      source?: string;
      platform?: string;
    };

    expect(result.platform).toBe("vercel");
    expect(result.connected).toBe(true);
    expect(result.source).toBe("user_credentials");
  });

  it("marks platform rows connected when only the OAuth store has a credential", async () => {
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/rest/v1/platform_connectors?")) {
        return jsonResponse([
          { id: "stripe", name: "Stripe", category: "Payments", auth_type: "api_key", sort_order: 1 },
          { id: "vercel", name: "Vercel", category: "Developer Tools", auth_type: "oauth2", sort_order: 2 },
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
        ]);
      }
      if (url.includes("/rest/v1/managed_app_connections?")) return jsonResponse([]);
      if (url.includes("/rest/v1/metering_events")) return jsonResponse(null, 201);
      throw new Error(`Unexpected fetch: ${url}`);
    }));

    const result = await keychainAction("keychain_list_platforms", { category: "Developer Tools" }) as {
      platforms?: Array<{ id: string; connected?: boolean; connected_source?: string | null }>;
    };

    const vercel = result.platforms?.find((platform) => platform.id === "vercel");
    const stripe = result.platforms?.find((platform) => platform.id === "stripe");

    expect(vercel?.connected).toBe(true);
    expect(vercel?.connected_source).toBe("user_credentials");
    expect(stripe?.connected).toBe(false);
  });
});
