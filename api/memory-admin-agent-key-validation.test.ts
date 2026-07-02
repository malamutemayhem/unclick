import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveAgentApiKeyHash } from "./memory-admin";

// Regression pack for the 2026-06 "AI job board empty" lane-split incident.
//
// Cause: /api/memory-admin trusted ANY raw uc_* / agt_* api_key by hashing it
// directly, without confirming the hash belonged to a registered, active
// api_keys row. A stale/unregistered key therefore minted a parallel "orphan"
// tenant lane (Boardroom jobs + memory written under a hash the signed-in web
// app could never resolve to), so the live board looked empty while the data
// sat in a lane nobody read.
//
// resolveAgentApiKeyHash is the guardrail: the raw key must match an active
// api_keys row, or it is rejected (callers turn null into a 401). These tests
// pin that contract so the orphan-lane regression cannot quietly return.

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

function mockJsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("resolveAgentApiKeyHash (lane-split guardrail)", () => {
  it("accepts a registered, active raw api_key and scopes to its stored hash", async () => {
    const fetchMock = vi.fn(async () =>
      mockJsonResponse(200, [{ key_hash: "registered-hash", is_active: true }]),
    );
    globalThis.fetch = fetchMock as typeof fetch;

    const hash = await resolveAgentApiKeyHash(
      "https://example.supabase.co",
      "service-role",
      "uc_registered_key",
    );

    expect(hash).toBe("registered-hash");
    // Must verify the key against api_keys by hash, not trust it blindly.
    expect(String(fetchMock.mock.calls[0][0])).toContain("/rest/v1/api_keys?");
    expect(String(fetchMock.mock.calls[0][0])).toContain("key_hash=eq.");
  });

  it("treats legacy rows with no is_active flag as active", async () => {
    globalThis.fetch = vi.fn(async () =>
      mockJsonResponse(200, [{ key_hash: "legacy-hash" }]),
    ) as typeof fetch;

    expect(
      await resolveAgentApiKeyHash("https://example.supabase.co", "service-role", "uc_legacy"),
    ).toBe("legacy-hash");
  });

  it("REJECTS an unregistered raw key so it cannot fork an orphan tenant lane", async () => {
    // The incident itself: a uc_* key with no api_keys row. No row -> no lane.
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    globalThis.fetch = vi.fn(async () => mockJsonResponse(200, [])) as typeof fetch;

    expect(
      await resolveAgentApiKeyHash(
        "https://example.supabase.co",
        "service-role",
        "uc_unregistered_key",
      ),
    ).toBeNull();
    expect(warn).toHaveBeenCalledOnce();
  });

  it("rejects a revoked (is_active=false) raw key", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    globalThis.fetch = vi.fn(async () =>
      mockJsonResponse(200, [{ key_hash: "revoked-hash", is_active: false }]),
    ) as typeof fetch;

    expect(
      await resolveAgentApiKeyHash("https://example.supabase.co", "service-role", "agt_revoked_key"),
    ).toBeNull();
  });

  it("never leaks the raw token when logging a rejection", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    globalThis.fetch = vi.fn(async () => mockJsonResponse(200, [])) as typeof fetch;

    await resolveAgentApiKeyHash(
      "https://example.supabase.co",
      "service-role",
      "uc_super_secret_token_value",
    );

    for (const call of warn.mock.calls) {
      expect(JSON.stringify(call)).not.toContain("uc_super_secret_token_value");
    }
  });

  it("fails closed (null) when the api_keys lookup errors", async () => {
    globalThis.fetch = vi.fn(async () => mockJsonResponse(500, null)) as typeof fetch;

    expect(
      await resolveAgentApiKeyHash("https://example.supabase.co", "service-role", "uc_key"),
    ).toBeNull();
  });

  it("fails closed (null) when the api_keys lookup throws", async () => {
    globalThis.fetch = vi.fn(async () => {
      throw new Error("network down");
    }) as typeof fetch;

    expect(
      await resolveAgentApiKeyHash("https://example.supabase.co", "service-role", "uc_key"),
    ).toBeNull();
  });
});

// Account-stable lane: a key carries a `lane_hash` that does NOT change when
// the key is rotated in place, so memory tables (scoped by api_key_hash =
// lane_hash) survive rotation instead of stranding on the old key's hash.
describe("resolveAgentApiKeyHash (account-stable lane)", () => {
  it("scopes to the stable lane_hash when present, even after key rotation", async () => {
    // Rotated key: key_hash is the NEW hash, but lane_hash still points at the
    // account's original lane where the memory actually lives.
    globalThis.fetch = vi.fn(async () =>
      mockJsonResponse(200, [
        { key_hash: "new-rotated-hash", is_active: true, lane_hash: "original-lane" },
      ]),
    ) as typeof fetch;

    expect(
      await resolveAgentApiKeyHash("https://example.supabase.co", "service-role", "uc_rotated_key"),
    ).toBe("original-lane");
  });

  it("falls back to key_hash when lane_hash is absent (rows predating the backfill)", async () => {
    globalThis.fetch = vi.fn(async () =>
      mockJsonResponse(200, [{ key_hash: "registered-hash", is_active: true }]),
    ) as typeof fetch;

    expect(
      await resolveAgentApiKeyHash("https://example.supabase.co", "service-role", "uc_key"),
    ).toBe("registered-hash");
  });
});
