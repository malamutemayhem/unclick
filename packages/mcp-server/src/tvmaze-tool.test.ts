import { afterEach, describe, expect, it, vi } from "vitest";
import { tvmazeSearch, tvmazeShow, tvmazeSchedule } from "./tvmaze-tool.js";

describe("tvmaze connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await tvmazeSearch({ query: "breaking bad" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await tvmazeShow({ id: 1 }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns search results with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ score: 1, show: { id: 169, name: "Breaking Bad" } }]),
    })));
    const r = await tvmazeSearch({ query: "breaking bad" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns schedule with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: 1, name: "Pilot" }]),
    })));
    const r = await tvmazeSchedule({}) as Record<string, unknown>;
    expect(r.schedule).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
