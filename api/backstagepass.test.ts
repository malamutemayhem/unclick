import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "./backstagepass";

interface CapturedResponse {
  headers: Record<string, string>;
  statusCode: number;
  body: unknown;
  ended: boolean;
  setHeader(name: string, value: string): CapturedResponse;
  status(code: number): CapturedResponse;
  json(body: unknown): unknown;
  end(): CapturedResponse;
}

function createResponse(): CapturedResponse {
  return {
    headers: {},
    statusCode: 200,
    body: null,
    ended: false,
    setHeader(name: string, value: string) {
      this.headers[name] = value;
      return this;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return body;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

describe("backstagepass API crash safety", () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  beforeEach(() => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  });

  it("returns a readable JSON error instead of crashing when an upstream fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      throw new Error("socket hang up");
    }));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = createResponse();
    await handler(
      {
        method: "GET",
        query: { action: "list" },
        headers: { authorization: "Bearer some-supabase-jwt" },
      } as never,
      res as never,
    );

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Temporary error loading your connections. Please retry." });
  });

  it("does not leak the internal exception message to the client", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      throw new Error("connect ECONNREFUSED 10.0.0.1:443 super-internal-detail");
    }));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = createResponse();
    await handler(
      {
        method: "GET",
        query: { action: "list" },
        headers: { authorization: "Bearer some-supabase-jwt" },
      } as never,
      res as never,
    );

    expect(JSON.stringify(res.body)).not.toContain("ECONNREFUSED");
    expect(JSON.stringify(res.body)).not.toContain("super-internal-detail");
  });

  it("still answers OPTIONS preflight without touching upstream services", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const res = createResponse();
    await handler({ method: "OPTIONS", headers: {} } as never, res as never);

    expect(res.statusCode).toBe(204);
    expect(res.ended).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
