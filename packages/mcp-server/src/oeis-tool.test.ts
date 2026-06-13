import { describe, it, expect, vi, afterEach } from "vitest";
import { oeisSearch } from "./oeis-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("oeis-tool", () => {
  it("searches integer sequences", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ count: 1, start: 0, results: [{ number: 45, name: "Fibonacci numbers", data: "0,1,1,2,3,5,8,13,21,34" }] }),
    }));
    const r = await oeisSearch({ query: "1,1,2,3,5,8" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await oeisSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
