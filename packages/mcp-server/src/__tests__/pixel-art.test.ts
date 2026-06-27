import { describe, it, expect } from "vitest";
import { PixelCanvas, color } from "../pixel-art.js";

describe("PixelCanvas", () => {
  it("creates canvas with correct dimensions", () => {
    const c = new PixelCanvas(10, 8);
    expect(c.width).toBe(10);
    expect(c.height).toBe(8);
  });

  it("sets and gets pixels", () => {
    const c = new PixelCanvas(5, 5);
    const red = color(255, 0, 0);
    c.setPixel(2, 3, red);
    const p = c.getPixel(2, 3);
    expect(p.r).toBe(255);
    expect(p.g).toBe(0);
    expect(p.b).toBe(0);
    expect(p.a).toBe(255);
  });

  it("returns transparent for out-of-bounds", () => {
    const c = new PixelCanvas(5, 5);
    const p = c.getPixel(-1, 0);
    expect(p.a).toBe(0);
  });

  it("ignores out-of-bounds setPixel", () => {
    const c = new PixelCanvas(5, 5);
    c.setPixel(10, 10, color(255, 0, 0));
    expect(c.getPixel(10, 10).a).toBe(0);
  });

  it("fills entire canvas", () => {
    const c = new PixelCanvas(3, 3);
    c.fill(color(0, 255, 0));
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        expect(c.getPixel(x, y).g).toBe(255);
      }
    }
  });

  it("draws a rectangle", () => {
    const c = new PixelCanvas(10, 10);
    c.drawRect(2, 2, 3, 3, color(100, 100, 100));
    expect(c.getPixel(2, 2).r).toBe(100);
    expect(c.getPixel(4, 4).r).toBe(100);
    expect(c.getPixel(1, 1).a).toBe(0);
  });

  it("draws a line", () => {
    const c = new PixelCanvas(10, 10);
    c.drawLine(0, 0, 4, 0, color(255, 255, 255));
    for (let x = 0; x <= 4; x++) {
      expect(c.getPixel(x, 0).r).toBe(255);
    }
  });

  it("draws a circle", () => {
    const c = new PixelCanvas(20, 20);
    c.drawCircle(10, 10, 5, color(200, 200, 200));
    expect(c.getPixel(15, 10).r).toBe(200);
    expect(c.getPixel(5, 10).r).toBe(200);
    expect(c.getPixel(10, 15).r).toBe(200);
    expect(c.getPixel(10, 5).r).toBe(200);
  });

  it("flood fills a region", () => {
    const c = new PixelCanvas(5, 5);
    c.floodFill(0, 0, color(50, 50, 50));
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        expect(c.getPixel(x, y).r).toBe(50);
      }
    }
  });

  it("flood fill stops at boundaries", () => {
    const c = new PixelCanvas(5, 5);
    const wall = color(255, 0, 0);
    for (let y = 0; y < 5; y++) c.setPixel(2, y, wall);
    c.floodFill(0, 0, color(0, 255, 0));
    expect(c.getPixel(0, 0).g).toBe(255);
    expect(c.getPixel(1, 0).g).toBe(255);
    expect(c.getPixel(3, 0).g).toBe(0);
  });

  it("scales canvas up", () => {
    const c = new PixelCanvas(2, 2);
    c.setPixel(0, 0, color(255, 0, 0));
    const scaled = c.scale(3);
    expect(scaled.width).toBe(6);
    expect(scaled.height).toBe(6);
    expect(scaled.getPixel(0, 0).r).toBe(255);
    expect(scaled.getPixel(2, 2).r).toBe(255);
  });

  it("converts to ascii art", () => {
    const c = new PixelCanvas(3, 1);
    c.setPixel(0, 0, color(255, 255, 255));
    c.setPixel(1, 0, color(128, 128, 128));
    const ascii = c.toAscii();
    expect(ascii.length).toBe(3);
  });

  it("counts non-empty pixels", () => {
    const c = new PixelCanvas(5, 5);
    c.setPixel(0, 0, color(255, 0, 0));
    c.setPixel(1, 1, color(0, 255, 0));
    expect(c.countNonEmpty()).toBe(2);
  });
});

describe("color", () => {
  it("creates with default alpha", () => {
    const c = color(10, 20, 30);
    expect(c.a).toBe(255);
  });

  it("creates with custom alpha", () => {
    const c = color(10, 20, 30, 128);
    expect(c.a).toBe(128);
  });
});
