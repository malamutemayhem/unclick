import { describe, it, expect, vi, afterEach } from "vitest";
import { fruityviceAll, fruityviceByName } from "./fruityvice-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("fruityvice-tool", () => {
  it("fruityviceAll returns fruits list", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ name: "Banana", family: "Musaceae", nutritions: { calories: 96 } }]),
    }));
    const r = await fruityviceAll({}) as Record<string, unknown>;
    expect(r.fruits).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("fruityviceByName returns single fruit", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ name: "Apple", family: "Rosaceae", nutritions: { calories: 52 } }),
    }));
    const r = await fruityviceByName({ name: "apple" }) as Record<string, unknown>;
    expect(r.fruit).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("fruityviceByName requires name", async () => {
    const r = await fruityviceByName({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
