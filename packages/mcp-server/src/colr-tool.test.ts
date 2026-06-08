import { describe, it, expect, vi, afterEach } from "vitest";
import { colrRandomPalette } from "./colr-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("colr-tool", () => {
  it("colrRandomPalette returns palette", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ id: 42, colors: ["ff0000", "00ff00"], tags: ["warm"] }),
    }));
    const r = await colrRandomPalette({}) as Record<string, unknown>;
    expect(r.palette).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
