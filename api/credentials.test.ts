import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "./credentials";

function createResponse() {
  const response = {
    headers: {} as Record<string, string>,
    statusCode: 200,
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
      return body;
    },
    end() {
      this.ended = true;
      return this;
    },
  };

  return response;
}

describe("credentials API cache headers", () => {
  beforeEach(() => {
    vi.stubEnv("SUPABASE_URL", "https://supabase.test");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("forbids browser, CDN, and Vercel CDN caching before any response path returns", async () => {
    const res = createResponse();

    await handler({ method: "OPTIONS", headers: {} } as never, res as never);

    expect(res.statusCode).toBe(204);
    expect(res.ended).toBe(true);
    expect(res.headers["Cache-Control"]).toBe("private, no-store, max-age=0, must-revalidate");
    expect(res.headers["CDN-Cache-Control"]).toBe("no-store");
    expect(res.headers["Vercel-CDN-Cache-Control"]).toBe("no-store");
  });

  it("marks a saved credential tested without accepting a credential value", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => ({
      ok: true,
      status: 200,
      json: async () => [{ id: "cred_1" }],
    }));
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    const body = await handler({
      method: "PATCH",
      headers: { authorization: "Bearer uc_live_probe" },
      body: { platform: "gmail" },
    } as never, res as never);

    expect(res.statusCode).toBe(200);
    expect(body).toMatchObject({ success: true, platform: "gmail", label: null });
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/rest/v1/user_credentials?");
    expect(url).toContain("platform_slug=eq.gmail");
    expect(init.method).toBe("PATCH");
    expect(String(init.body)).toContain("last_tested_at");
    expect(String(init.body)).not.toMatch(/access_token|api_key|secret|password/i);
  });
});
