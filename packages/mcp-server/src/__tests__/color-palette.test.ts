import { describe, it, expect } from "vitest";
import { complementary, analogous, triadic, tetradic, monochromatic } from "../color-palette.js";

describe("color-palette", () => {
  it("complementary returns 2 colors", () => {
    const colors = complementary("#ff0000");
    expect(colors).toHaveLength(2);
    expect(colors[0]).toBe("#ff0000");
  });

  it("analogous returns 3 colors", () => {
    const colors = analogous("#ff0000");
    expect(colors).toHaveLength(3);
    expect(colors[1]).toBe("#ff0000");
  });

  it("triadic returns 3 colors", () => {
    const colors = triadic("#ff0000");
    expect(colors).toHaveLength(3);
    expect(colors[0]).toBe("#ff0000");
  });

  it("tetradic returns 4 colors", () => {
    const colors = tetradic("#ff0000");
    expect(colors).toHaveLength(4);
    expect(colors[0]).toBe("#ff0000");
  });

  it("monochromatic returns requested count", () => {
    const colors = monochromatic("#3366cc", 5);
    expect(colors).toHaveLength(5);
    for (const c of colors) expect(c).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("all colors are valid hex", () => {
    for (const c of [...complementary("#336699"), ...analogous("#336699"), ...triadic("#336699")]) {
      expect(c).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("handles white", () => {
    const colors = complementary("#ffffff");
    expect(colors).toHaveLength(2);
  });

  it("handles black", () => {
    const colors = complementary("#000000");
    expect(colors).toHaveLength(2);
  });
});
