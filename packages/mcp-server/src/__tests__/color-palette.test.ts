import { describe, it, expect } from "vitest";
import { analogous, complementary, triadic, shades, tints } from "../color-palette.js";

describe("color-palette", () => {
  it("analogous returns requested count", () => {
    const colors = analogous("#ff0000", 5);
    expect(colors.length).toBe(5);
    colors.forEach((c) => expect(c).toMatch(/^#[0-9a-f]{6}$/));
  });

  it("complementary returns opposite hue", () => {
    const result = complementary("#ff0000");
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
    expect(result).not.toBe("#ff0000");
  });

  it("triadic returns three colors", () => {
    const [a, b, c] = triadic("#ff0000");
    expect(a).toBe("#ff0000");
    expect(b).toMatch(/^#[0-9a-f]{6}$/);
    expect(c).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("shades returns darker versions", () => {
    const s = shades("#ff0000", 3);
    expect(s.length).toBe(3);
    s.forEach((c) => expect(c).toMatch(/^#[0-9a-f]{6}$/));
  });

  it("tints returns lighter versions", () => {
    const t = tints("#ff0000", 3);
    expect(t.length).toBe(3);
    t.forEach((c) => expect(c).toMatch(/^#[0-9a-f]{6}$/));
  });
});
