import { afterEach, describe, expect, it, vi } from "vitest";
import { randomFoxImage } from "./randomfox-tool.js";

describe("randomfox connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await randomFoxImage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await randomFoxImage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("randomFoxImage returns an image URL with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ image: "https://randomfox.ca/images/42.jpg", link: "https://randomfox.ca/?i=42" }),
    })));
    const r = await randomFoxImage({}) as Record<string, unknown>;
    expect(r.image).toContain("randomfox.ca");
    expect(r.unclick_meta).toBeDefined();
  });
});
