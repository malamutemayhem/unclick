import { afterEach, describe, expect, it, vi } from "vitest";
import { stapiSearchCharacter, stapiSearchSpecies, stapiSearchStarship } from "./stapi-tool.js";

describe("stapi connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await stapiSearchCharacter({ name: "Spock" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await stapiSearchSpecies({ name: "Vulcan" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns character data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ page: { totalElements: 1 }, characters: [{ uid: "CH0001", name: "Spock" }] }),
    })));
    const r = await stapiSearchCharacter({ name: "Spock" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns starship data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ page: { totalElements: 1 }, spacecraft: [{ uid: "SC0001", name: "USS Enterprise" }] }),
    })));
    const r = await stapiSearchStarship({ name: "Enterprise" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
