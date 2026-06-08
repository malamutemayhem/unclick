import { afterEach, describe, expect, it, vi } from "vitest";
import { agifyAge, genderizeName, nationalizeName } from "./agify-tool.js";

describe("agify connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await agifyAge({ name: "test" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await nationalizeName({ name: "test" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required name for agifyAge", async () => {
    const r = await agifyAge({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name is required/i);
  });

  it("validates required name for genderizeName", async () => {
    const r = await genderizeName({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name is required/i);
  });

  it("agifyAge returns age prediction with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 100, name: "michael", age: 70 }),
    })));
    const r = await agifyAge({ name: "michael" }) as Record<string, unknown>;
    expect(r.age).toBe(70);
    expect(r.unclick_meta).toBeDefined();
  });

  it("genderizeName returns gender prediction", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 200, name: "alice", gender: "female", probability: 0.99 }),
    })));
    const r = await genderizeName({ name: "alice" }) as Record<string, unknown>;
    expect(r.gender).toBe("female");
  });

  it("nationalizeName returns nationality prediction", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 50, name: "hiroshi", country: [{ country_id: "JP" }] }),
    })));
    const r = await nationalizeName({ name: "hiroshi" }) as Record<string, unknown>;
    expect(r.country).toBeDefined();
  });
});
