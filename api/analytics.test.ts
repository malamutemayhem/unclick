import { afterEach, describe, expect, it, vi } from "vitest";

import handler, { buildNativeAnalyticsRow } from "./analytics";

const originalSupabaseUrl = process.env.SUPABASE_URL;
const originalServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function createResponse() {
  const response = {
    headers: {} as Record<string, string>,
    statusCode: 200,
    body: undefined as unknown,
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
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };

  return response;
}

function restoreAnalyticsEnv() {
  if (originalSupabaseUrl === undefined) {
    delete process.env.SUPABASE_URL;
  } else {
    process.env.SUPABASE_URL = originalSupabaseUrl;
  }

  if (originalServiceRoleKey === undefined) {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  } else {
    process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceRoleKey;
  }
}

describe("native analytics API", () => {
  afterEach(() => {
    restoreAnalyticsEnv();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("builds sanitized rows from browser analytics payloads", () => {
    const result = buildNativeAnalyticsRow({
      headers: { "user-agent": "vitest-agent" },
      body: {
        event: "signup_started",
        path: "/signup",
        title: "Signup",
        referrer: "https://unclick.world/",
        anonymousId: "anon-123",
        properties: {
          method: "magic_link",
          count: 1,
          active: true,
          empty: null,
          nested: { ignored: true },
          api_key: "hidden",
        },
      },
    } as never);

    expect(result).toMatchObject({
      ok: true,
      status: 202,
      row: {
        event: "signup_started",
        path: "/signup",
        title: "Signup",
        referrer: "https://unclick.world/",
        anonymous_id: "anon-123",
        user_agent: "vitest-agent",
        source: "browser",
        properties: {
          method: "magic_link",
          count: 1,
          active: true,
          empty: null,
        },
      },
    });
    expect(result.row?.properties).not.toHaveProperty("api_key");
    expect(result.row?.properties).not.toHaveProperty("nested");
  });

  it("rejects invalid event names before storage work", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    await handler(
      {
        method: "POST",
        headers: {},
        body: { event: "../bad event", properties: { page: "/signup" } },
      } as never,
      res as never,
    );

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "event is required and must use analytics-safe characters." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts valid events when storage is not configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    await handler(
      {
        method: "POST",
        headers: {},
        body: { event: "$pageview", path: "/tools", properties: { title: "Tools" } },
      } as never,
      res as never,
    );

    expect(res.statusCode).toBe(202);
    expect(res.body).toEqual({
      accepted: true,
      persisted: false,
      reason: "storage_not_configured",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("persists valid events to Supabase when storage is configured", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      text: vi.fn(),
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = createResponse();
    await handler(
      {
        method: "POST",
        headers: { "user-agent": "vitest-agent" },
        body: {
          event: "signup_started",
          path: "/signup",
          properties: { method: "google", token: "hidden" },
        },
      } as never,
      res as never,
    );

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ accepted: true, persisted: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/rest/v1/native_analytics_events",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          apikey: "service-role-test",
          Authorization: "Bearer service-role-test",
          Prefer: "return=minimal",
        }),
      }),
    );

    const request = fetchMock.mock.calls[0][1] as { body: string };
    expect(JSON.parse(request.body)).toMatchObject({
      event: "signup_started",
      path: "/signup",
      source: "browser",
      user_agent: "vitest-agent",
      properties: { method: "google" },
    });
  });

  it("fails soft when Supabase rejects the insert", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test";

    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        text: vi.fn().mockResolvedValue("table missing"),
      }),
    );

    const res = createResponse();
    await handler(
      {
        method: "POST",
        headers: {},
        body: { event: "signup_started", properties: { method: "magic_link" } },
      } as never,
      res as never,
    );

    expect(res.statusCode).toBe(202);
    expect(res.body).toEqual({
      accepted: true,
      persisted: false,
      reason: "storage_error",
      status: 404,
    });
  });
});
