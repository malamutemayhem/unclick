import { describe, it, expect, vi, afterEach } from "vitest";
import { dblpSearchPublications, dblpSearchAuthors } from "./dblp-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("dblp-tool", () => {
  it("dblpSearchPublications returns results", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ result: { hits: { hit: [{ info: { title: "Test", authors: { author: [{ text: "Jane" }] } } }] } } }),
    }));
    const r = await dblpSearchPublications({ query: "deep learning" }) as Record<string, unknown>;
    expect(r.result).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("dblpSearchAuthors returns authors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ result: { hits: { hit: [{ info: { author: "Turing" } }] } } }),
    }));
    const r = await dblpSearchAuthors({ query: "Turing" }) as Record<string, unknown>;
    expect(r.result).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await dblpSearchPublications({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
