import { describe, it, expect, vi, afterEach } from "vitest";
import { upcLookup, upcSearch } from "./upcitemdb-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("upcitemdb-tool", () => {
  it("looks up a UPC barcode", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ code: "OK", total: 1, items: [{ title: "Coca-Cola 12oz", brand: "Coca-Cola" }] }),
    }));
    const r = await upcLookup({ upc: "049000042566" }) as Record<string, unknown>;
    expect(r.items).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("searches products by name", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ code: "OK", total: 5, items: [{ title: "iPhone 15" }] }),
    }));
    const r = await upcSearch({ query: "iPhone" }) as Record<string, unknown>;
    expect(r.items).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing upc", async () => {
    const r = await upcLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/upc/i);
  });
});
