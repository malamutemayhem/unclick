import { afterEach, describe, expect, it, vi } from "vitest";
import { xkcdComic, xkcdLatest } from "./xkcd-tool.js";

describe("xkcd connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await xkcdLatest({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await xkcdLatest({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required number param for xkcdComic", async () => {
    const r = await xkcdComic({}) as Record<string, unknown>;
    expect(r.error).toMatch(/number is required/i);
  });

  it("maps comic data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({
        num: 327, title: "Exploits of a Mom", safe_title: "Exploits of a Mom",
        alt: "Her daughter is named Help...", img: "https://imgs.xkcd.com/comics/exploits_of_a_mom.png",
        year: "2007", month: "10", day: "10", transcript: "", link: "",
      }),
    })));
    const r = await xkcdLatest({}) as Record<string, any>;
    expect(r.number).toBe(327);
    expect(r.title).toBe("Exploits of a Mom");
    expect(r.date).toBe("2007-10-10");
  });
});
