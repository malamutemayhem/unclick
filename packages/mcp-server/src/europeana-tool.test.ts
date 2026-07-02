import { describe, it, expect, vi, afterEach } from "vitest";
import { europeanaSearch, europeanaRecord } from "./europeana-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("europeana-tool", () => {
  it("searches cultural heritage objects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ success: true, totalResults: 100, items: [{ id: "/123/abc", title: ["Mona Lisa"] }] }),
    }));
    const r = await europeanaSearch({ query: "Mona Lisa" }) as Record<string, unknown>;
    expect(r.items).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("gets a record by ID", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ success: true, object: { about: "/123/abc", title: ["Mona Lisa"] } }),
    }));
    const r = await europeanaRecord({ id: "/123/abc" }) as Record<string, unknown>;
    expect(r.object).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await europeanaSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
