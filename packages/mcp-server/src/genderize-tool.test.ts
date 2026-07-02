import { afterEach, describe, expect, it, vi } from "vitest";
import { genderizePredict } from "./genderize-tool.js";

describe("genderize connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await genderizePredict({ name: "Alice" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await genderizePredict({ name: "Bob" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns prediction with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 1000, name: "alice", gender: "female", probability: 0.95 }),
    })));
    const r = await genderizePredict({ name: "alice" }) as Record<string, unknown>;
    expect(r.prediction).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("requires name parameter", async () => {
    const r = await genderizePredict({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name/i);
  });
});
