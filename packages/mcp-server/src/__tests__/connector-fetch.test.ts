import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { connectorFetch, unwrapOrError, type ConnectorFetchResult } from "../connector-fetch.js";

describe("connectorFetch", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  function mockFetch(status: number, body: unknown, headers?: Record<string, string>) {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      headers: new Headers({ "Content-Type": "application/json", ...headers }),
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(JSON.stringify(body)),
    } as unknown as Response);
  }

  it("returns success for 200 responses", async () => {
    mockFetch(200, { id: "cus_123" });
    const result = await connectorFetch({
      baseUrl: "https://api.example.com",
      path: "/customers",
      connectorName: "example",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toEqual({ id: "cus_123" });
  });

  it("appends query params for GET", async () => {
    mockFetch(200, {});
    await connectorFetch({
      baseUrl: "https://api.example.com",
      path: "/items",
      params: { limit: 10, cursor: "abc" },
      connectorName: "example",
    });
    const calledUrl = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(calledUrl).toContain("limit=10");
    expect(calledUrl).toContain("cursor=abc");
  });

  it("sends form-encoded body for POST", async () => {
    mockFetch(200, {});
    await connectorFetch({
      baseUrl: "https://api.example.com",
      method: "POST",
      path: "/items",
      params: { name: "test" },
      connectorName: "example",
      formEncoded: true,
    });
    const opts = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1];
    expect(opts.body).toBe("name=test");
  });

  it("sends JSON body when json option is set", async () => {
    mockFetch(200, {});
    await connectorFetch({
      baseUrl: "https://api.example.com",
      method: "POST",
      path: "/items",
      json: { name: "test" },
      connectorName: "example",
    });
    const opts = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1];
    expect(opts.body).toBe('{"name":"test"}');
  });

  it("returns rate limit error for 429", async () => {
    mockFetch(429, {}, { "Retry-After": "30" });
    const result = await connectorFetch({
      baseUrl: "https://api.example.com",
      path: "/items",
      connectorName: "example",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(429);
      expect(result.retry_after).toBe(30);
    }
  });

  it("returns auth error for 401", async () => {
    mockFetch(401, {});
    const result = await connectorFetch({
      baseUrl: "https://api.example.com",
      path: "/items",
      connectorName: "stripe",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(401);
      expect(result.error).toContain("auth failed");
    }
  });

  it("returns network error on fetch failure", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("ECONNREFUSED"));
    const result = await connectorFetch({
      baseUrl: "https://api.example.com",
      path: "/items",
      connectorName: "example",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("network error");
  });

  it("returns timeout error on abort", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(
      Object.assign(new Error("aborted"), { name: "AbortError" }),
    );
    const result = await connectorFetch({
      baseUrl: "https://api.example.com",
      path: "/items",
      connectorName: "example",
      timeoutMs: 100,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("timed out");
  });

  it("extracts error message from nested error object", async () => {
    mockFetch(400, { error: { message: "Invalid parameter" } });
    const result = await connectorFetch({
      baseUrl: "https://api.example.com",
      path: "/items",
      connectorName: "example",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("Invalid parameter");
  });

  it("skips undefined params", async () => {
    mockFetch(200, {});
    await connectorFetch({
      baseUrl: "https://api.example.com",
      path: "/items",
      params: { limit: 10, cursor: undefined },
      connectorName: "example",
    });
    const calledUrl = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(calledUrl).toContain("limit=10");
    expect(calledUrl).not.toContain("cursor");
  });
});

describe("unwrapOrError", () => {
  it("returns data on success", () => {
    const result: ConnectorFetchResult = {
      ok: true, status: 200, data: { id: 1 }, headers: new Headers(),
    };
    expect(unwrapOrError(result)).toEqual({ id: 1 });
  });

  it("returns error object on failure", () => {
    const result: ConnectorFetchResult = {
      ok: false, error: "Rate limit", status: 429, retry_after: 5,
    };
    expect(unwrapOrError(result)).toEqual({
      error: "Rate limit", status: 429, retry_after: 5,
    });
  });
});
