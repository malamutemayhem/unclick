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
});
