import { afterEach, describe, expect, it, vi } from "vitest";
import { emojihubRandom, emojihubByCategory } from "./emojihub-tool.js";

describe("emojihub connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await emojihubRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await emojihubByCategory({ category: "smileys-and-people" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates category is required", async () => {
    const r = await emojihubByCategory({}) as Record<string, unknown>;
    expect(r.error).toMatch(/category is required/i);
  });

  it("returns emoji with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ name: "grinning face", category: "smileys and people", htmlCode: ["&#128512;"], unicode: ["U+1F600"] }),
    })));
    const r = await emojihubRandom({}) as Record<string, unknown>;
    expect(r.name).toBe("grinning face");
    expect(r.unclick_meta).toBeDefined();
  });
});
