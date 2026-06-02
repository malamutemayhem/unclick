import { afterEach, describe, expect, it, vi } from "vitest";
import { blueskyAction } from "./bluesky-tool.js";

// L2 resilience contract for the Bluesky connector: request timeout, clean 429
// handling, input validation, and stable response mapping. Bluesky creates a
// session first, so mocks are URL-aware (auth hop succeeds, XRPC hop varies).
const CREDS = { identifier: "me.bsky.social", password: "app-pass" };

function sessionOk() {
  return { ok: true, status: 200, headers: { get: (): string | null => null }, json: async () => ({ accessJwt: "jwt", refreshJwt: "r", did: "did:plc:x", handle: "me.bsky.social" }), text: async (): Promise<string> => "" };
}

describe("bluesky connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  // blueskyAction returns the action promise without awaiting it, so async
  // rejections (429, timeout) surface to the caller rather than its try/catch.
  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("createSession")) return sessionOk();
      return { ok: false, status: 429, headers: { get: (): string | null => null }, text: async (): Promise<string> => "", json: async () => ({}) };
    }));
    await expect(blueskyAction("bluesky_read_feed", { ...CREDS })).rejects.toThrow(/rate limit/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("createSession")) return sessionOk();
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(blueskyAction("bluesky_read_feed", { ...CREDS })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await blueskyAction("bluesky_read_feed", { password: "p" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/identifier is required/i);
  });

  it("passes through successful feed reads", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("createSession")) return sessionOk();
      return { ok: true, status: 200, headers: { get: (): string | null => null }, json: async () => ({ feed: [{ post: { uri: "at://x", cid: "c", record: { text: "hi" } } }] }), text: async (): Promise<string> => "" };
    }));
    const result = await blueskyAction("bluesky_read_feed", { ...CREDS }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
