import { afterEach, describe, expect, it, vi } from "vitest";
import { affirmationRandom } from "./affirmation-tool.js";

describe("affirmation connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await affirmationRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await affirmationRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("affirmationRandom returns an affirmation with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ affirmation: "You are worthy of love." }),
    })));
    const r = await affirmationRandom({}) as Record<string, unknown>;
    expect(r.affirmation).toBe("You are worthy of love.");
    expect(r.unclick_meta).toBeDefined();
  });
});
