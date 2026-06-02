import { afterEach, describe, expect, it, vi } from "vitest";

import { hnItem } from "./hackernews-tool.js";

// Colocated Hacker News connector tests. Exercise the L2 (resilience) behaviour
// so the connector clears the depth-ladder hardening bar.

describe("hacker news connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) },
      text: async () => "rate limited",
    })));
    await expect(hnItem({ id: 123 })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(hnItem({ id: 123 })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(hnItem({ id: 123 })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    const result = await hnItem({}) as Record<string, unknown>;
    expect(result.error).toMatch(/id is required/i);
  });

  it("normalizes a returned item", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ id: 123, type: "story", title: "Hello", by: "pg", time: 1700000000 }),
    })));
    const result = await hnItem({ id: 123 }) as Record<string, unknown>;
    expect(result.id).toBe(123);
    expect(result.title).toBe("Hello");
  });
});
