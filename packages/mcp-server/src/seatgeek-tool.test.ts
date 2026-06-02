import { afterEach, describe, expect, it, vi } from "vitest";

import { seatgeekSearchPerformers } from "./seatgeek-tool.js";

describe("seatgeek connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await seatgeekSearchPerformers({ client_id: "k", query: "taylor" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await seatgeekSearchPerformers({ client_id: "k", query: "taylor" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when query is missing", async () => {
    const r = await seatgeekSearchPerformers({ client_id: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("maps performer search", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, text: async () => "", json: async () => ({ meta: { total: 1 }, performers: [{ name: "Taylor Swift" }] }) })));
    const r = await seatgeekSearchPerformers({ client_id: "k", query: "taylor" }) as Record<string, any>;
    expect(r.total).toBe(1);
    expect(r.performers[0].name).toBe("Taylor Swift");
  });
});
