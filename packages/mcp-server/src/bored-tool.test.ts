import { afterEach, describe, expect, it, vi } from "vitest";
import { boredRandom, boredByType, boredByParticipants } from "./bored-tool.js";

describe("bored connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await boredRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await boredByType({ type: "social" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required type param", async () => {
    const r = await boredByType({}) as Record<string, unknown>;
    expect(r.error).toMatch(/type is required/i);
  });

  it("validates required participants param", async () => {
    const r = await boredByParticipants({}) as Record<string, unknown>;
    expect(r.error).toMatch(/participants is required/i);
  });

  it("boredRandom returns activity with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ activity: "Learn a new recipe", type: "cooking", participants: 1 }),
    })));
    const r = await boredRandom({}) as Record<string, unknown>;
    expect(r.activity).toBe("Learn a new recipe");
    expect(r.unclick_meta).toBeDefined();
  });

  it("hits the App Brewery /random and /filter paths (old /api/activity is gone)", async () => {
    const fetchMock = vi.fn(async (_url: string, _init?: unknown) => ({
      ok: true, status: 200,
      json: async () => [{ activity: "Go hiking", type: "recreational" }],
    }));
    vi.stubGlobal("fetch", fetchMock);
    const r = await boredByType({ type: "recreational" }) as Record<string, unknown>;
    expect(fetchMock.mock.calls[0][0]).toBe("https://bored-api.appbrewery.com/filter?type=recreational");
    // /filter returns an array; the tool wraps it so unclick_meta has a home.
    expect(r.count).toBe(1);
    expect(Array.isArray(r.activities)).toBe(true);

    await boredRandom({});
    expect(fetchMock.mock.calls[1][0]).toBe("https://bored-api.appbrewery.com/random");
  });
});
