import { afterEach, describe, expect, it, vi } from "vitest";
import { cataasRandomCat, cataasListTags } from "./cataas-tool.js";

describe("cataas connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await cataasRandomCat({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await cataasListTags({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns cat data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ _id: "abc123", tags: ["cute"], mimetype: "image/jpeg" }),
    })));
    const r = await cataasRandomCat({}) as Record<string, unknown>;
    expect(r.image_url).toContain("abc123");
    expect(r.unclick_meta).toBeDefined();
  });
});
