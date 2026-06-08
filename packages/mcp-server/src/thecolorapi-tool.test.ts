import { describe, it, expect, vi, afterEach } from "vitest";
import { theColorApiId, theColorApiScheme } from "./thecolorapi-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("thecolorapi-tool", () => {
  it("theColorApiId returns color info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ hex: { value: "#FF5733" }, name: { value: "Red Orange" }, rgb: { r: 255, g: 87, b: 51 } }),
    }));
    const r = await theColorApiId({ hex: "FF5733" }) as Record<string, unknown>;
    expect(r.hex).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("theColorApiScheme returns color scheme", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ mode: "analogic", count: 5, colors: [{ hex: { value: "#FF5733" } }] }),
    }));
    const r = await theColorApiScheme({ hex: "FF5733" }) as Record<string, unknown>;
    expect(r.mode).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing hex", async () => {
    const r = await theColorApiId({}) as Record<string, unknown>;
    expect(r.error).toMatch(/hex/i);
  });
});
