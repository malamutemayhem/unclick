import { afterEach, describe, expect, it, vi } from "vitest";
import { dndGetClass, dndListClasses, dndGetSpell, dndListSpells, dndGetMonster, dndListMonsters } from "./dnd5e-tool.js";

describe("dnd5e connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await dndGetClass({ class: "wizard" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await dndGetMonster({ monster: "goblin" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required class param", async () => {
    const r = await dndGetClass({}) as Record<string, unknown>;
    expect(r.error).toMatch(/class is required/i);
  });

  it("validates required spell param", async () => {
    const r = await dndGetSpell({}) as Record<string, unknown>;
    expect(r.error).toMatch(/spell is required/i);
  });

  it("converts spaces to dashes for spell lookup", async () => {
    const fn = vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ index: "magic-missile", name: "Magic Missile" }),
    }));
    vi.stubGlobal("fetch", fn);
    await dndGetSpell({ spell: "magic missile" });
    expect(String(fn.mock.calls.at(0)?.at(0) ?? "")).toContain("magic-missile");
  });

  it("maps class data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ index: "wizard", name: "Wizard", hit_die: 6 }),
    })));
    const r = await dndGetClass({ class: "wizard" }) as Record<string, unknown>;
    expect(r.name).toBe("Wizard");
    expect(r.unclick_meta).toBeDefined();
  });

  it("dndListMonsters accepts challenge_rating filter", async () => {
    const fn = vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 5, results: [] }),
    }));
    vi.stubGlobal("fetch", fn);
    const r = await dndListMonsters({ challenge_rating: "1" }) as Record<string, unknown>;
    expect(r.count).toBe(5);
    expect(String(fn.mock.calls.at(0)?.at(0) ?? "")).toContain("challenge_rating=1");
  });
});
