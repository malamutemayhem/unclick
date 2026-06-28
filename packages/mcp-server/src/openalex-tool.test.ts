import { describe, it, expect, vi, afterEach } from "vitest";
import { openalexSearchWorks, openalexGetWork, openalexSearchAuthors } from "./openalex-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("openalex-tool", () => {
  it("openalexSearchWorks returns works", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ results: [{ id: "W123", title: "Test" }], meta: { count: 1 } }),
    }));
    const r = await openalexSearchWorks({ query: "climate" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("openalexGetWork returns detail", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ id: "W123", title: "Test Paper", doi: "https://doi.org/10.1234/test" }),
    }));
    const r = await openalexGetWork({ id: "W123" }) as Record<string, unknown>;
    expect(r.id).toBe("W123");
    expect(r.unclick_meta).toBeDefined();
  });

  it("openalexSearchAuthors returns authors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ results: [{ id: "A123", display_name: "John Smith" }] }),
    }));
    const r = await openalexSearchAuthors({ query: "Smith" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await openalexSearchWorks({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
