import { describe, it, expect, vi, afterEach } from "vitest";
import { jishoSearch } from "./jisho-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("jisho-tool", () => {
  it("jishoSearch returns results", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: [{ slug: "water", japanese: [{ word: "水" }] }] }),
    }));
    const r = await jishoSearch({ keyword: "water" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("jishoSearch requires keyword", async () => {
    const r = await jishoSearch({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
