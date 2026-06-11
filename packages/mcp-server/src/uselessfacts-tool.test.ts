import { afterEach, describe, expect, it, vi } from "vitest";
import { uselessFactRandom, uselessFactToday } from "./uselessfacts-tool.js";

describe("uselessfacts connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await uselessFactRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await uselessFactToday({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("uselessFactRandom returns a fact with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ id: "abc123", text: "A group of flamingos is called a 'flamboyance'.", source: "test", source_url: "", language: "en" }),
    })));
    const r = await uselessFactRandom({}) as Record<string, unknown>;
    expect(r.text).toContain("flamingos");
    expect(r.unclick_meta).toBeDefined();
  });
});
