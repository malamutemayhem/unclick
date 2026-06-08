import { afterEach, describe, expect, it, vi } from "vitest";
import { publicapisSearch, publicapisCategories, publicapisRandom } from "./publicapis-tool.js";

describe("publicapis connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await publicapisSearch({ title: "cat" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await publicapisCategories({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns API entries with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 1, entries: [{ API: "Cat Facts", Description: "Random cat facts", Auth: "", HTTPS: true, Cors: "yes", Link: "https://catfact.ninja", Category: "Animals" }] }),
    })));
    const r = await publicapisSearch({ title: "cat" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns random API with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 1, entries: [{ API: "Dogs", Description: "Dog data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://dog.ceo", Category: "Animals" }] }),
    })));
    const r = await publicapisRandom({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
