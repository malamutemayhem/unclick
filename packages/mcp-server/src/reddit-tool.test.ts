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
    vi.stubGlobal("fetch", vi.fn(async (url: string): Promise<unknown> => {
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

  it("falls back to public Reddit RSS when anonymous thread JSON is forbidden", async () => {
    const requestedUrls: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      requestedUrls.push(url);
      if (url.includes(".json")) {
        return {
          ok: false, status: 403, statusText: "Forbidden", headers: { get: (): string | null => null },
          json: async (): Promise<Record<string, never>> => ({}), text: async (): Promise<string> => "",
        };
      }

      return {
        ok: true, status: 200, headers: { get: (): string | null => null },
        text: async (): Promise<string> => `<?xml version="1.0" encoding="UTF-8"?>
          <feed xmlns="http://www.w3.org/2005/Atom">
            <entry>
              <author><name>/u/semibaron</name></author>
              <category term="ClaudeAI" />
              <content type="html">&lt;!-- SC_OFF --&gt;&lt;div class=&quot;md&quot;&gt;&lt;p&gt;Just saw Ultraplan appear.&lt;/p&gt;&lt;/div&gt;&lt;!-- SC_ON --&gt;</content>
              <id>t3_1scblui</id>
              <link href="https://www.reddit.com/r/ClaudeAI/comments/1scblui/ultraplan_is_here/" />
              <title>Ultraplan is here</title>
              <updated>2026-01-01T00:00:00+00:00</updated>
            </entry>
            <entry>
              <author><name>/u/example</name></author>
              <category term="ClaudeAI" />
              <content type="html">&lt;div class=&quot;md&quot;&gt;&lt;p&gt;First comment body.&lt;/p&gt;&lt;/div&gt;</content>
              <id>t1_oecfyg4</id>
              <link href="https://www.reddit.com/r/ClaudeAI/comments/1scblui/ultraplan_is_here/oecfyg4/" />
              <title>Comment</title>
              <updated>2026-01-01T00:01:00+00:00</updated>
            </entry>
          </feed>`,
      };
    }));

    const result = await redditThread({
      url: "https://www.reddit.com/r/ClaudeAI/comments/1scblui/ultraplan_is_here/",
      limit: 8,
    }) as Record<string, unknown>;

    const post = result.post as Record<string, unknown>;
    const comments = result.comments as Record<string, unknown>[];
    expect(result.error).toBeUndefined();
    expect(requestedUrls[0]).toContain("https://www.reddit.com/r/ClaudeAI/comments/1scblui.json");
    expect(requestedUrls[1]).toContain("https://www.reddit.com/r/ClaudeAI/comments/1scblui/.rss");
    expect(post.title).toBe("Ultraplan is here");
    expect(post.selftext).toContain("Just saw Ultraplan appear.");
    expect(comments[0].body).toContain("First comment body.");
    expect((result.unclick_meta as Record<string, unknown>).source).toBe("Reddit RSS");
  });
});
