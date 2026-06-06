import { afterEach, describe, expect, it, vi } from "vitest";
import { getSteamPlayerSummaries } from "./steam-tool.js";

// L2 resilience contract for the Steam connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("steam connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await getSteamPlayerSummaries({ api_key: "k", steamids: "1" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await getSteamPlayerSummaries({ api_key: "k", steamids: "1" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await getSteamPlayerSummaries({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/steamids/i);
  });

  it("maps player summaries into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ response: { players: [{ steamid: "1", personaname: "Gamer" }] } }),
    })));
    const result = await getSteamPlayerSummaries({ api_key: "k", steamids: "1" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.players as Array<Record<string, unknown>>)[0].personaname).toBe("Gamer");
  });
});
