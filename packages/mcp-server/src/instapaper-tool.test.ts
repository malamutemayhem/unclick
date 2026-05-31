import { afterEach, describe, expect, it, vi } from "vitest";
import { instapaperAction } from "./instapaper-tool.js";

// L2 resilience contract for the Instapaper connector: request timeout, clean
// 429 handling, input validation, and stable response mapping. Instapaper uses
// xAuth, so mocks are URL-aware: the token hop succeeds, the API hop varies.
const CREDS = { consumer_key: "ck", consumer_secret: "cs", username: "u", password: "p" };

function tokenOk() {
  return { ok: true, status: 200, headers: { get: () => null }, text: async () => "oauth_token=tok&oauth_token_secret=sec" };
}

describe("instapaper connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("/oauth/access_token")) return tokenOk();
      return { ok: false, status: 429, headers: { get: () => null }, text: async () => "" };
    }));
    const result = await instapaperAction("get_instapaper_bookmarks", { ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("/oauth/access_token")) return tokenOk();
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await instapaperAction("get_instapaper_bookmarks", { ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("/oauth/access_token")) return tokenOk();
      return { ok: true, status: 200, headers: { get: () => null }, text: async () => "[]" };
    }));
    const result = await instapaperAction("add_instapaper_bookmark", { ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/url is required/i);
  });

  it("passes through successful bookmark responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("/oauth/access_token")) return tokenOk();
      return {
        ok: true, status: 200, headers: { get: () => null },
        text: async () => JSON.stringify([{ type: "bookmark", bookmark_id: 1, title: "Saved" }]),
      };
    }));
    const result = await instapaperAction("get_instapaper_bookmarks", { ...CREDS });
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBe(1);
  });
});
