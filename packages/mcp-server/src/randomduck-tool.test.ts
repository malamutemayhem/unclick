import { describe, it, expect, vi, afterEach } from "vitest";
import { randomDuckImage, randomDuckList } from "./randomduck-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("randomduck-tool", () => {
  it("randomDuckImage returns duck URL", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ url: "https://random-d.uk/api/v2/123.jpg", message: "Quack!" }),
    }));
    const r = await randomDuckImage({}) as Record<string, unknown>;
    expect(r.url).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("randomDuckList returns image list", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ images: ["1.jpg", "2.jpg"], image_count: 2 }),
    }));
    const r = await randomDuckList({}) as Record<string, unknown>;
    expect(r.images).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
