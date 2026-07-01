import { afterEach, describe, expect, it } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler, { isValidSlug } from "./app-human-checks";

const originalUrl = process.env.SUPABASE_URL;
const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

afterEach(() => {
  if (originalUrl === undefined) delete process.env.SUPABASE_URL;
  else process.env.SUPABASE_URL = originalUrl;
  if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
});

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

function mockReq(over: Partial<VercelRequest>): VercelRequest {
  return { method: "GET", headers: {}, query: {}, body: {}, ...over } as VercelRequest;
}

describe("app-human-checks slug validation", () => {
  it("accepts real catalog slugs", () => {
    for (const s of ["gmail", "google-drive", "onedrive", "higgsfield", "github", "abuseipdb"]) {
      expect(isValidSlug(s)).toBe(true);
    }
  });

  it("rejects empty, uppercase, spaced, or injection-shaped values", () => {
    for (const s of ["", " ", "Gmail", "a b", "drop;table", "-leading", "x".repeat(80), 42, null, undefined]) {
      expect(isValidSlug(s as unknown)).toBe(false);
    }
  });
});

describe("app-human-checks handler gating", () => {
  it("answers OPTIONS preflight with 204", async () => {
    const res = mockRes();
    await handler(mockReq({ method: "OPTIONS" }), res);
    expect(res.statusCode).toBe(204);
  });

  it("returns 500 when Supabase env is not configured", async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    const res = mockRes();
    await handler(mockReq({ method: "GET" }), res);
    expect(res.statusCode).toBe(500);
  });

  it("requires a bearer token before touching the database", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role";
    const res = mockRes();
    await handler(mockReq({ method: "GET", headers: {} }), res);
    expect(res.statusCode).toBe(401);
  });
});
