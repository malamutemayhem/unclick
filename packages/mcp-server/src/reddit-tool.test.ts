import { afterEach, describe, expect, it, vi } from "vitest";
import { redditRead, redditSearch, redditThread } from "./reddit-tool.js";

// L2 resilience contract for the Reddit connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("reddit connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}), text: async () => "",
    })));
    const result = await redditSearch({ access_token: "t", query: "x" }) as Record<string, unknown>;
    expect(`${result.error} ${result.message}`).toMatch(/rate.?limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await redditSearch({ access_token: "t", query: "x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await redditSearch({ access_token: "t", query: "" }) as Record<string, unknown>;
    expect(String(result.message)).toMatch(/query is required/i);
  });

  it("passes through successful searches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ data: { children: [], after: null } }),
    })));
    const result = await redditSearch({ access_token: "t", query: "x" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });

  it("accepts q and uses public Reddit JSON without OAuth", async () => {
    let requestedUrl = "";
    let requestedAuthorization: string | undefined;
    vi.stubGlobal("fetch", vi.fn(async (url: string, init?: { headers?: Record<string, string> }) => {
      requestedUrl = url;
      requestedAuthorization = init?.headers?.Authorization;
      return {
        ok: true, status: 200, headers: { get: (): string | null => null },
        json: async () => ({ data: { children: [], after: null } }),
      };
    }));

    const result = await redditSearch({ q: "ultraplan", subreddit: "ClaudeAI", limit: 1 }) as Record<string, unknown>;

    expect(result.error).toBeUndefined();
    expect(requestedUrl).toContain("https://www.reddit.com/r/ClaudeAI/search.json");
    expect(requestedUrl).toContain("q=ultraplan");
    expect(requestedAuthorization).toBeUndefined();
  });

  it("reads public subreddit listings without OAuth", async () => {
    let requestedUrl = "";
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      requestedUrl = url;
      return {
        ok: true, status: 200, headers: { get: (): string | null => null },
        json: async () => ({ data: { children: [], after: null } }),
      };
    }));

    const result = await redditRead({ subreddit: "ClaudeAI", limit: 1 }) as Record<string, unknown>;

    expect(result.error).toBeUndefined();
    expect(requestedUrl).toContain("https://www.reddit.com/r/ClaudeAI/hot.json");
  });

  it("reads public Reddit threads without OAuth", async () => {
    let requestedUrl = "";
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      requestedUrl = url;
      return {
        ok: true, status: 200, headers: { get: (): string | null => null },
        json: async () => [
          { data: { children: [] } },
          { data: { children: [] } },
        ],
      };
    }));

    const result = await redditThread({ url: "https://www.reddit.com/r/ClaudeAI/comments/1scblui/ultraplan_is_here/" }) as Record<string, unknown>;

    expect(result.error).toBeUndefined();
    expect(requestedUrl).toContain("https://www.reddit.com/r/ClaudeAI/comments/1scblui.json");
  });
});
