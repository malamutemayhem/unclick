import { afterEach, describe, expect, it, vi } from "vitest";
import { mastodonAction } from "./mastodon-tool.js";

// L2 resilience contract for the Mastodon connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const CFG = { instance_url: "https://mastodon.social", access_token: "t" };

describe("mastodon connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}), text: async () => "",
    })));
    const result = await mastodonAction("mastodon_read_timeline", { ...CFG }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await mastodonAction("mastodon_read_timeline", { ...CFG }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await mastodonAction("mastodon_read_timeline", { access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/instance_url/i);
  });

  it("passes through successful timeline reads", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      headers: { get: (h: string): string | null => (h === "content-type" ? "application/json" : null) },
      json: async () => ([]),
    })));
    const result = await mastodonAction("mastodon_read_timeline", { ...CFG }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
