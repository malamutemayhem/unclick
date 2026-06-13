import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "./uxpass";

const originalFetch = globalThis.fetch;

beforeEach(() => {
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role";
});

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

function makeRes() {
  const out: { status?: number; body?: unknown } = {};
  const res = {
    status(code: number) {
      out.status = code;
      return res;
    },
    setHeader() {
      return res;
    },
    end(payload?: string) {
      out.body = payload ? JSON.parse(payload) : undefined;
    },
  } as unknown as VercelResponse;
  return { res, out };
}

function makeReq(query: Record<string, string>): VercelRequest {
  return {
    method: "GET",
    headers: { authorization: "Bearer jwt-token" },
    query,
    body: undefined,
  } as unknown as VercelRequest;
}

describe("uxpass list_runs", () => {
  it("returns the caller's recorded runs newest first", async () => {
    const runs = [
      {
        id: "run-a",
        target_url: "https://unclick.world/",
        status: "complete",
        ux_score: 100,
        started_at: "2026-06-11T01:00:00Z",
        completed_at: "2026-06-11T01:00:05Z",
        breakdown: { pass: 16, fail: 0 },
      },
    ];
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/auth/v1/user")) return mockJsonResponse(200, { id: "user-1" });
      if (url.includes("/rest/v1/uxpass_runs")) {
        expect(url).toContain("actor_user_id=eq.user-1");
        expect(url).toContain("order=started_at.desc");
        expect(url).toContain("limit=6");
        return mockJsonResponse(200, runs);
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
    globalThis.fetch = fetchMock as typeof fetch;

    const { res, out } = makeRes();
    await handler(makeReq({ action: "list_runs", limit: "6" }), res);

    expect(out.status).toBe(200);
    expect(out.body).toEqual({ runs });
  });

  it("clamps the limit and defaults to 20", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/auth/v1/user")) return mockJsonResponse(200, { id: "user-1" });
      expect(url).toContain("limit=100");
      return mockJsonResponse(200, []);
    });
    globalThis.fetch = fetchMock as typeof fetch;

    const { res, out } = makeRes();
    await handler(makeReq({ action: "list_runs", limit: "5000" }), res);

    expect(out.status).toBe(200);
    expect(out.body).toEqual({ runs: [] });
  });

  it("fails closed with an error instead of inventing an empty history", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/auth/v1/user")) return mockJsonResponse(200, { id: "user-1" });
      return mockJsonResponse(500, { error: "boom" });
    });
    globalThis.fetch = fetchMock as typeof fetch;

    const { res, out } = makeRes();
    await handler(makeReq({ action: "list_runs" }), res);

    expect(out.status).toBe(502);
    expect(out.body).toEqual({ error: "Could not read UXPass run history" });
  });
});
