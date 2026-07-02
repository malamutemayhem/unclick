import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "./account-links";

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

describe("account-links API safety gates", () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  beforeEach(() => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  });

  it("answers OPTIONS without touching account data", async () => {
    const res = createResponse();

    await handler({ method: "OPTIONS", headers: {} } as never, res as never);

    expect(res.statusCode).toBe(204);
    expect(res.ended).toBe(true);
  });

  it("requires a signed-in Supabase session", async () => {
    const res = createResponse();

    await handler(
      { method: "GET", query: { action: "list" }, headers: {} } as never,
      res as never,
    );

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Unauthorized" });
  });

  it("does not accept UnClick API keys as account session tokens", async () => {
    const res = createResponse();

    await handler(
      {
        method: "GET",
        query: { action: "list" },
        headers: { authorization: "Bearer uc_test_api_key" },
      } as never,
      res as never,
    );

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Unauthorized" });
  });
});
