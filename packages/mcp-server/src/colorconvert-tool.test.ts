import { describe, it, expect } from "vitest";
import { colorHexConvert } from "./colorconvert-tool.js";

describe("colorconvert-tool", () => {
  it("converts hex to RGB and HSL", async () => {
    const r = await colorHexConvert({ hex: "#FF5733" }) as Record<string, unknown>;
    const rgb = r.rgb as Record<string, number>;
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(87);
    expect(rgb.b).toBe(51);
    expect(r.hsl).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles hex without hash", async () => {
    const r = await colorHexConvert({ hex: "000000" }) as Record<string, unknown>;
    const rgb = r.rgb as Record<string, number>;
    expect(rgb.r).toBe(0);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("rejects invalid hex", async () => {
    const r = await colorHexConvert({ hex: "xyz" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid/i);
  });

  it("rejects missing hex", async () => {
    const r = await colorHexConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/hex/i);
  });
});
