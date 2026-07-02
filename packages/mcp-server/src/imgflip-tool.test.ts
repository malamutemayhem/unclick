import { describe, it, expect, vi, afterEach } from "vitest";
import { imgflipGetMemes } from "./imgflip-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("imgflip-tool", () => {
  it("imgflipGetMemes returns memes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ success: true, data: { memes: [{ id: "181913649", name: "Drake Hotline Bling", url: "https://i.imgflip.com/30b1gx.jpg" }] } }),
    }));
    const r = await imgflipGetMemes({}) as Record<string, unknown>;
    expect(r.memes).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
