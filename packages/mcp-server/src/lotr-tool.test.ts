import { afterEach, describe, expect, it, vi } from "vitest";
import { lotrBooks, lotrCharacters, lotrQuotes } from "./lotr-tool.js";

describe("lotr connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await lotrBooks({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await lotrCharacters({ name: "Gandalf" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns books with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ docs: [{ _id: "1", name: "The Fellowship of the Ring" }], total: 3 }),
    })));
    const r = await lotrBooks({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
