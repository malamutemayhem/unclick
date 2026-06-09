import { describe, it, expect } from "vitest";
import {
  checkerboard, gradient, stripes, dots,
  blend, invert, threshold, brightness, contrast, gaussianBlur,
} from "../texture-gen.js";

describe("checkerboard", () => {
  it("produces alternating tiles", () => {
    const tex = checkerboard(16, 16, 8);
    expect(tex[0][0]).toBe(255);
    expect(tex[0][8]).toBe(0);
    expect(tex[8][0]).toBe(0);
    expect(tex[8][8]).toBe(255);
  });

  it("correct dimensions", () => {
    const tex = checkerboard(10, 5);
    expect(tex).toHaveLength(5);
    expect(tex[0]).toHaveLength(10);
  });
});

describe("gradient", () => {
  it("horizontal starts at 0 ends at 255", () => {
    const tex = gradient(16, 4, "horizontal");
    expect(tex[0][0]).toBe(0);
    expect(tex[0][15]).toBe(255);
  });

  it("vertical starts at 0 ends at 255", () => {
    const tex = gradient(4, 16, "vertical");
    expect(tex[0][0]).toBe(0);
    expect(tex[15][0]).toBe(255);
  });

  it("radial is 0 at center", () => {
    const tex = gradient(16, 16, "radial");
    expect(tex[8][8]).toBeLessThan(30);
  });
});

describe("stripes", () => {
  it("produces alternating stripes", () => {
    const tex = stripes(16, 1, 4, 0);
    expect(tex[0][0]).toBe(255);
    expect(tex[0][4]).toBe(0);
    expect(tex[0][8]).toBe(255);
  });

  it("correct dimensions", () => {
    const tex = stripes(20, 10, 5, 45);
    expect(tex).toHaveLength(10);
    expect(tex[0]).toHaveLength(20);
  });
});

describe("dots", () => {
  it("center dots are bright", () => {
    const tex = dots(16, 16, 8, 2);
    expect(tex[0][0]).toBe(255);
    expect(tex[0][8]).toBe(255);
  });

  it("off-center pixels are dark", () => {
    const tex = dots(16, 16, 16, 1);
    expect(tex[0][4]).toBe(0);
  });
});

describe("blend", () => {
  it("normal blend replaces", () => {
    const a = [[100]];
    const b = [[200]];
    const r = blend(a, b, "normal", 1);
    expect(r[0][0]).toBe(200);
  });

  it("multiply darkens", () => {
    const a = [[128]];
    const b = [[128]];
    const r = blend(a, b, "multiply", 1);
    expect(r[0][0]).toBeLessThan(128);
  });

  it("screen brightens", () => {
    const a = [[128]];
    const b = [[128]];
    const r = blend(a, b, "screen", 1);
    expect(r[0][0]).toBeGreaterThan(128);
  });

  it("add clamps at 255", () => {
    const a = [[200]];
    const b = [[200]];
    const r = blend(a, b, "add", 1);
    expect(r[0][0]).toBe(255);
  });

  it("opacity 0 preserves base", () => {
    const a = [[100]];
    const b = [[200]];
    const r = blend(a, b, "normal", 0);
    expect(r[0][0]).toBe(100);
  });
});

describe("invert", () => {
  it("inverts values", () => {
    expect(invert([[0, 255, 128]])[0]).toEqual([255, 0, 127]);
  });
});

describe("threshold", () => {
  it("binarizes at level", () => {
    expect(threshold([[50, 128, 200]], 128)[0]).toEqual([0, 255, 255]);
  });
});

describe("brightness", () => {
  it("increases brightness", () => {
    expect(brightness([[100]], 50)[0][0]).toBe(150);
  });

  it("clamps at 255", () => {
    expect(brightness([[250]], 50)[0][0]).toBe(255);
  });

  it("clamps at 0", () => {
    expect(brightness([[10]], -50)[0][0]).toBe(0);
  });
});

describe("contrast", () => {
  it("increases contrast", () => {
    const r = contrast([[100, 200]], 2);
    expect(r[0][0]).toBeLessThan(100);
    expect(r[0][1]).toBeGreaterThan(200);
  });
});

describe("gaussianBlur", () => {
  it("smooths sharp edge", () => {
    const grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 255, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const blurred = gaussianBlur(grid, 1);
    expect(blurred[2][2]).toBeLessThan(255);
    expect(blurred[2][1]).toBeGreaterThan(0);
  });

  it("preserves dimensions", () => {
    const grid = [[100, 200], [150, 50]];
    const blurred = gaussianBlur(grid, 1);
    expect(blurred).toHaveLength(2);
    expect(blurred[0]).toHaveLength(2);
  });

  it("handles empty grid", () => {
    expect(gaussianBlur([])).toEqual([]);
  });
});
