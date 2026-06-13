import { afterEach, describe, expect, it, vi } from "vitest";
import { shibeRandomImage } from "./shibe-tool.js";

describe("shibe connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await shibeRandomImage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await shibeRandomImage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates type parameter", async () => {
    const r = await shibeRandomImage({ type: "invalid" }) as Record<string, unknown>;
    expect(r.error).toMatch(/type must be/i);
  });

  it("returns image URLs with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => (["https://cdn.shibe.online/shibes/abc.jpg"]),
    })));
    const r = await shibeRandomImage({}) as Record<string, unknown>;
    expect(r.urls).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
