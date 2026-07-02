import { describe, it, expect, vi, afterEach } from "vitest";
import { cratesSearch, cratesGet } from "./crates-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("crates-tool", () => {
  it("cratesSearch returns crates", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ crates: [{ name: "serde", downloads: 1000000 }] }),
    }));
    const r = await cratesSearch({ query: "serde" }) as Record<string, unknown>;
    expect(r.crates).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("cratesGet returns crate detail", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ crate: { name: "serde", max_version: "1.0.200" } }),
    }));
    const r = await cratesGet({ name: "serde" }) as Record<string, unknown>;
    expect(r.crate).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await cratesSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
