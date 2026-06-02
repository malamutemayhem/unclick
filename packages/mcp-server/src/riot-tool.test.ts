import { afterEach, describe, expect, it, vi } from "vitest";
import { riotSummoner } from "./riot-tool.js";

// L2 resilience contract for the Riot connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("riot connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(riotSummoner({ api_key: "k", summonerName: "Faker" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(riotSummoner({ api_key: "k", summonerName: "Faker" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await riotSummoner({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/summonerName/i);
  });

  it("maps summoner responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ id: "s1", accountId: "a1", puuid: "p1", name: "Faker", summonerLevel: 500 }),
    })));
    const result = await riotSummoner({ api_key: "k", summonerName: "Faker" }) as Record<string, unknown>;
    expect(result.id).toBe("s1");
    expect(result.summoner_level).toBe(500);
  });
});
