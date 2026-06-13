import { afterEach, describe, expect, it, vi } from "vitest";
import { ramGetCharacter } from "./rickandmorty-tool.js";

describe("rickandmorty connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await ramGetCharacter({ id: "1" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await ramGetCharacter({ id: "1" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required id param", async () => {
    const r = await ramGetCharacter({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("maps character data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({
        id: 1, name: "Rick Sanchez", status: "Alive", species: "Human", type: "",
        gender: "Male", origin: { name: "Earth" }, location: { name: "Citadel" },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: ["ep1", "ep2", "ep3"],
      }),
    })));
    const r = await ramGetCharacter({ id: "1" }) as Record<string, any>;
    expect(r.id).toBe(1);
    expect(r.name).toBe("Rick Sanchez");
    expect(r.status).toBe("Alive");
    expect(r.episode_count).toBe(3);
  });
});
