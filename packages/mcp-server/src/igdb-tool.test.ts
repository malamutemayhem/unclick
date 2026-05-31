import { afterEach, describe, expect, it, vi } from "vitest";
import { igdbSearchGames } from "./igdb-tool.js";

// L2 resilience contract for the IGDB connector: request timeout, clean 429
// handling, input validation, and stable response mapping. IGDB fetches a Twitch
// OAuth token first, so mocks are URL-aware (token hop succeeds, API hop varies).
const CREDS = { client_id: "id", client_secret: "secret" };

function tokenOk() {
  return { ok: true, status: 200, headers: { get: (): string | null => null }, json: async () => ({ access_token: "tok", expires_in: 3600 }) };
}

describe("igdb connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  // igdbSearchGames returns the igdbPost promise without awaiting it, so async
  // rejections (429, timeout) surface to the caller rather than its try/catch.
  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("id.twitch.tv")) return tokenOk();
      return { ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "", json: async () => ({}) };
    }));
    await expect(igdbSearchGames({ ...CREDS, query: "mario" })).rejects.toThrow(/rate limit/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("id.twitch.tv")) return tokenOk();
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(igdbSearchGames({ ...CREDS, query: "mario" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("id.twitch.tv")) return tokenOk();
      return { ok: true, status: 200, headers: { get: (): string | null => null }, json: async () => ([]) };
    }));
    const result = await igdbSearchGames({ ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/query is required/i);
  });

  it("passes through successful game searches", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("id.twitch.tv")) return tokenOk();
      return { ok: true, status: 200, headers: { get: (): string | null => null }, json: async () => ([{ id: 1, name: "Mario" }]) };
    }));
    const result = await igdbSearchGames({ ...CREDS, query: "mario" });
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBe(1);
  });
});
