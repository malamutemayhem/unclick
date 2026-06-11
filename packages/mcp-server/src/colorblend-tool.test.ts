import { describe, it, expect } from "vitest";
import { colorBlend } from "./colorblend-tool.js";

describe("colorblend-tool", () => {
  it("blends two colors", async () => {
    const r = await colorBlend({ color1: "#FF0000", color2: "#0000FF" }) as Record<string, unknown>;
    expect(r.blend).toBeDefined();
    expect(r.gradient).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("generates a gradient", async () => {
    const r = await colorBlend({ color1: "#000000", color2: "#FFFFFF", steps: 5 }) as Record<string, unknown>;
    const grad = r.gradient as string[];
    expect(grad).toHaveLength(5);
    expect(grad[0]).toBe("#000000");
    expect(grad[4]).toBe("#FFFFFF");
  });

  it("handles 3-char hex", async () => {
    const r = await colorBlend({ color1: "#F00", color2: "#00F" }) as Record<string, unknown>;
    expect(r.blend).toBeDefined();
  });

  it("rejects missing colors", async () => {
    const r = await colorBlend({}) as Record<string, unknown>;
    expect(r.error).toMatch(/color/i);
  });
});
