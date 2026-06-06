import { afterEach, describe, expect, it, vi } from "vitest";
import { tmSearchEvents, tmGetEvent } from "./ticketmaster-tool.js";

// L2 resilience contract for the Ticketmaster connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("ticketmaster connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await tmSearchEvents({ api_key: "k", keyword: "rock" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await tmSearchEvents({ api_key: "k", keyword: "rock" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await tmGetEvent({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/id is required/i);
  });

  it("maps event searches into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ _embedded: { events: [{ id: "e1", name: "Show" }] }, page: { totalElements: 1, totalPages: 1, number: 0 } }),
    })));
    const result = await tmSearchEvents({ api_key: "k", keyword: "rock" }) as Record<string, unknown>;
    expect((result.events as unknown[]).length).toBe(1);
    expect(result.total_elements).toBe(1);
  });
});
