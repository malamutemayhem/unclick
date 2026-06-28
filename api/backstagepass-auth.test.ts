import { afterEach, describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "./backstagepass";

// Regression guard for the API-key-rotation "Not signed in" bug.
//
// resolveTenant() looks up the signed-in user's api_keys row by user_id.
// The api_keys table has no UNIQUE(user_id) constraint, so a check-then-
// insert race can leave more than one row per user. If the lookup picks a
// row nondeterministically (no order) it can land on a stale/duplicate row
// with a null key_hash and return null -> the endpoint answers 401
// "Not signed in.", and the failure survives a hard refresh because the
// query is equally arbitrary next time. The fix: filter to active keys and
// order deterministically (freshest first) so the resolver always lands on
// the live key. This test asserts that ordering is present.

const originalFetch = globalThis.fetch;
const originalUrl = process.env.SUPABASE_URL;
const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalUrl === undefined) delete process.env.SUPABASE_URL;
  else process.env.SUPABASE_URL = originalUrl;
  if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  vi.restoreAllMocks();
});

function mockJsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

function mockRes(): VercelResponse & { statusCode: number; body: unknown } {
  const r = {
    statusCode: 0,
    body: null as unknown,
    setHeader() { return r; },
    status(code: number) { r.statusCode = code; return r; },
    json(payload: unknown) { r.body = payload; return r; },
    end() { return r; },
  };
  return r as unknown as VercelResponse & { statusCode: number; body: unknown };
}

describe("backstagepass resolveTenant api_keys lookup", () => {
  it("scopes the api_keys lookup to active keys and orders deterministically", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role";

    const calls: string[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      calls.push(url);
      if (url.includes("/auth/v1/user")) {
        return mockJsonResponse(200, { id: "user-abc", email: "owner@example.com" });
      }
      if (url.includes("/rest/v1/api_keys")) {
        return mockJsonResponse(200, [{ key_hash: "hash-123" }]);
      }
      // user_credentials list + connector map both tolerate an empty array.
      return mockJsonResponse(200, []);
    }) as typeof fetch;

    const req = {
      method: "GET",
      query: { action: "list" },
      headers: { authorization: "Bearer session.jwt.token" },
      body: {},
    } as unknown as VercelRequest;

    const res = mockRes();
    await handler(req, res);

    const apiKeysCall = calls.find((u) => u.includes("/rest/v1/api_keys?"));
    expect(apiKeysCall, "expected an api_keys lookup to be issued").toBeTruthy();
    expect(apiKeysCall).toContain("is_active=eq.true");
    expect(apiKeysCall).toContain("order=last_used_at.desc.nullslast");

    // A resolvable tenant must not 401 "Not signed in.".
    expect(res.statusCode).toBe(200);
  });
});
