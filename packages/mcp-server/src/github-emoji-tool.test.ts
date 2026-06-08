import { afterEach, describe, expect, it, vi } from "vitest";
import { githubEmojis } from "./github-emoji-tool.js";

describe("github-emoji connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await githubEmojis({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await githubEmojis({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("githubEmojis returns emoji data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ "+1": "https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png", heart: "https://github.githubassets.com/images/icons/emoji/unicode/2764.png" }),
    })));
    const r = await githubEmojis({}) as Record<string, unknown>;
    expect(r.count).toBe(2);
    expect(r.unclick_meta).toBeDefined();
  });
});
