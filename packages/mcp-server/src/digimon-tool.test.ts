import { afterEach, describe, expect, it, vi } from "vitest";
import { digimonAll, digimonByName, digimonByLevel } from "./digimon-tool.js";

describe("digimon connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await digimonAll({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await digimonByName({ name: "Agumon" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns digimon list with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ name: "Agumon", img: "https://example.com/agumon.png", level: "Rookie" }]),
    })));
    const r = await digimonAll({}) as Record<string, unknown>;
    expect(r.digimon).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns digimon by level with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ name: "Greymon", img: "https://example.com/greymon.png", level: "Champion" }]),
    })));
    const r = await digimonByLevel({ level: "Champion" }) as Record<string, unknown>;
    expect(r.digimon).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
