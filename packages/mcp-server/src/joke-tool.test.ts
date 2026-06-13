import { afterEach, describe, expect, it, vi } from "vitest";
import { jokeRandom } from "./joke-tool.js";

describe("joke connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await jokeRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await jokeRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("maps a single joke", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ error: false, category: "Programming", type: "single", joke: "Why do programmers prefer dark mode?", id: 1 }),
    })));
    const r = await jokeRandom({}) as Record<string, any>;
    expect(r.type).toBe("single");
    expect(r.joke).toBe("Why do programmers prefer dark mode?");
  });

  it("maps a twopart joke", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ error: false, category: "Programming", type: "twopart", setup: "Why?", delivery: "Because.", id: 2 }),
    })));
    const r = await jokeRandom({}) as Record<string, any>;
    expect(r.type).toBe("twopart");
    expect(r.setup).toBe("Why?");
    expect(r.delivery).toBe("Because.");
  });
});
