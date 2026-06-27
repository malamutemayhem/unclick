import { describe, it, expect } from "vitest";
import {
  createImage, getPixel, setPixel, cloneImage, threshold,
  randomDither, floydSteinberg, orderedDither, atkinsonDither,
  imageToAscii, countBlack, countWhite,
} from "../dithering.js";

describe("createImage", () => {
  it("creates with correct dimensions", () => {
    const img = createImage(10, 8);
    expect(img.width).toBe(10);
    expect(img.height).toBe(8);
    expect(img.data.length).toBe(80);
  });

  it("fills with given value", () => {
    const img = createImage(3, 3, 128);
    expect(img.data.every(v => v === 128)).toBe(true);
  });
});

describe("get/setPixel", () => {
  it("sets and gets pixels", () => {
    const img = createImage(5, 5);
    setPixel(img, 2, 3, 200);
    expect(getPixel(img, 2, 3)).toBe(200);
  });

  it("returns 0 for out of bounds", () => {
    const img = createImage(5, 5, 100);
    expect(getPixel(img, -1, 0)).toBe(0);
    expect(getPixel(img, 5, 0)).toBe(0);
  });
});

describe("cloneImage", () => {
  it("creates independent copy", () => {
    const img = createImage(3, 3, 100);
    const copy = cloneImage(img);
    setPixel(copy, 0, 0, 50);
    expect(getPixel(img, 0, 0)).toBe(100);
    expect(getPixel(copy, 0, 0)).toBe(50);
  });
});

describe("threshold", () => {
  it("binarizes image", () => {
    const img = createImage(4, 1);
    img.data[0] = 50;
    img.data[1] = 150;
    img.data[2] = 127;
    img.data[3] = 128;
    const out = threshold(img);
    expect(out.data[0]).toBe(0);
    expect(out.data[1]).toBe(255);
    expect(out.data[2]).toBe(0);
    expect(out.data[3]).toBe(255);
  });

  it("uses custom threshold", () => {
    const img = createImage(2, 1);
    img.data[0] = 50;
    img.data[1] = 60;
    const out = threshold(img, 55);
    expect(out.data[0]).toBe(0);
    expect(out.data[1]).toBe(255);
  });
});

describe("randomDither", () => {
  it("produces only 0 and 255 values", () => {
    const img = createImage(10, 10, 128);
    const out = randomDither(img);
    for (const v of out.data) {
      expect(v === 0 || v === 255).toBe(true);
    }
  });
});

describe("floydSteinberg", () => {
  it("produces binary output", () => {
    const img = createImage(8, 8, 100);
    const out = floydSteinberg(img);
    for (const v of out.data) {
      expect(v === 0 || v === 255).toBe(true);
    }
  });

  it("preserves approximate brightness", () => {
    const img = createImage(20, 20, 128);
    const out = floydSteinberg(img);
    const whites = countWhite(out);
    expect(whites).toBeGreaterThan(50);
    expect(whites).toBeLessThan(350);
  });
});

describe("orderedDither", () => {
  it("produces binary output", () => {
    const img = createImage(8, 8, 100);
    const out = orderedDither(img);
    for (const v of out.data) {
      expect(v === 0 || v === 255).toBe(true);
    }
  });
});

describe("atkinsonDither", () => {
  it("produces binary output", () => {
    const img = createImage(8, 8, 200);
    const out = atkinsonDither(img);
    for (const v of out.data) {
      expect(v === 0 || v === 255).toBe(true);
    }
  });
});

describe("imageToAscii", () => {
  it("converts image to string", () => {
    const img = createImage(3, 2, 128);
    const ascii = imageToAscii(img);
    const lines = ascii.split("\n");
    expect(lines.length).toBe(2);
    expect(lines[0].length).toBe(3);
  });
});

describe("countBlack/countWhite", () => {
  it("counts correctly", () => {
    const img = threshold(createImage(4, 4, 200));
    expect(countWhite(img)).toBe(16);
    expect(countBlack(img)).toBe(0);
  });
});
