import { describe, expect, it } from "vitest";
import handler from "./arena";

// Minimal Vercel req/res stubs for exercising the static GET routes.
// (Supabase-backed branches are covered by leaving the env unset, which
// must fall back to the same envelope shape the client parses.)
function makeReq(method: string, url: string) {
  return { method, url, headers: {} } as never;
}

function makeRes() {
  const state: { statusCode: number; body: unknown; headers: Record<string, string> } = {
    statusCode: 200,
    body: null,
    headers: {},
  };
  const res = {
    get statusCode() {
      return state.statusCode;
    },
    set statusCode(code: number) {
      state.statusCode = code;
    },
    setHeader(key: string, value: string) {
      state.headers[key.toLowerCase()] = value;
    },
    end(payload?: string) {
      state.body = payload ? JSON.parse(payload) : null;
    },
    status(code: number) {
      state.statusCode = code;
      return res;
    },
    json(payload: unknown) {
      state.body = payload;
    },
  };
  return { res: res as never, state };
}

describe("arena /problems limit parsing", () => {
  it("returns the default page for a non-numeric limit instead of an empty list", async () => {
    const { res, state } = makeRes();
    await handler(makeReq("GET", "/v1/arena/problems?limit=abc"), res);
    const body = state.body as { data: unknown[] };
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("clamps a negative limit to at least one problem", async () => {
    const { res, state } = makeRes();
    await handler(makeReq("GET", "/v1/arena/problems?limit=-5"), res);
    const body = state.body as { data: unknown[] };
    expect(body.data.length).toBe(1);
  });

  it("honors an explicit in-range limit", async () => {
    const { res, state } = makeRes();
    await handler(makeReq("GET", "/v1/arena/problems?limit=3"), res);
    const body = state.body as { data: unknown[] };
    expect(body.data.length).toBe(3);
  });
});

describe("arena /leaderboard envelope", () => {
  it("keeps data a flat array the client can .length, even when storage is unconfigured", async () => {
    const prevUrl = process.env.VITE_SUPABASE_URL;
    const prevKey = process.env.VITE_SUPABASE_ANON_KEY;
    delete process.env.VITE_SUPABASE_URL;
    delete process.env.VITE_SUPABASE_ANON_KEY;
    try {
      const { res, state } = makeRes();
      await handler(makeReq("GET", "/v1/arena/leaderboard"), res);
      const body = state.body as { data: unknown };
      // The double-wrap regression made body.data an object, which broke
      // ArenaLeaderboard's `res.data.length` check permanently.
      expect(Array.isArray(body.data)).toBe(true);
    } finally {
      if (prevUrl !== undefined) process.env.VITE_SUPABASE_URL = prevUrl;
      if (prevKey !== undefined) process.env.VITE_SUPABASE_ANON_KEY = prevKey;
    }
  });
});
