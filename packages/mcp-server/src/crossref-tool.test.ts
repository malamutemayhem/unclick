import { describe, it, expect, vi, afterEach } from "vitest";
import { crossrefSearchWorks, crossrefGetWork } from "./crossref-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("crossref-tool", () => {
  it("crossrefSearchWorks returns papers", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ message: { items: [{ DOI: "10.1038/nature12373", title: ["Test"] }] } }),
    }));
    const r = await crossrefSearchWorks({ query: "climate change" }) as Record<string, unknown>;
    expect(r.message).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("crossrefGetWork returns paper detail", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ message: { DOI: "10.1038/nature12373", title: ["Test Paper"] } }),
    }));
    const r = await crossrefGetWork({ doi: "10.1038/nature12373" }) as Record<string, unknown>;
    expect(r.message).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await crossrefSearchWorks({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
