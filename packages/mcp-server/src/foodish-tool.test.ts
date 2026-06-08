import { describe, it, expect, vi, afterEach } from "vitest";
import { foodishRandom, foodishByCategory } from "./foodish-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("foodish-tool", () => {
  it("foodishRandom returns food image", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ image: "https://foodish-api.com/images/pizza/pizza1.jpg" }),
    }));
    const r = await foodishRandom({}) as Record<string, unknown>;
    expect(r.image).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("foodishByCategory returns category image", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ image: "https://foodish-api.com/images/burger/burger1.jpg" }),
    }));
    const r = await foodishByCategory({ category: "burger" }) as Record<string, unknown>;
    expect(r.image).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("foodishByCategory requires category", async () => {
    const r = await foodishByCategory({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
