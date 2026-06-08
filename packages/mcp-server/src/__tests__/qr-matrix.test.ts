import { describe, it, expect } from "vitest";
import { QrMatrix } from "../qr-matrix.js";

describe("QrMatrix", () => {
  it("creates matrix of correct size", () => {
    const m = new QrMatrix(21);
    expect(m.getSize()).toBe(21);
  });

  it("sets and gets modules", () => {
    const m = new QrMatrix(5);
    m.set(2, 3, true);
    expect(m.get(2, 3)).toBe(true);
    expect(m.get(0, 0)).toBe(false);
  });

  it("returns false for out-of-bounds", () => {
    const m = new QrMatrix(5);
    expect(m.get(-1, 0)).toBe(false);
    expect(m.get(5, 5)).toBe(false);
  });

  it("adds finder pattern", () => {
    const m = new QrMatrix(21);
    m.addFinderPattern(0, 0);
    expect(m.get(0, 0)).toBe(true);
    expect(m.get(0, 6)).toBe(true);
    expect(m.get(1, 1)).toBe(false);
    expect(m.get(2, 2)).toBe(true);
  });

  it("adds timing patterns", () => {
    const m = new QrMatrix(21);
    m.addTimingPatterns();
    expect(m.get(6, 8)).toBe(true);
    expect(m.get(6, 9)).toBe(false);
  });

  it("adds alignment pattern", () => {
    const m = new QrMatrix(25);
    m.addAlignmentPattern(18, 18);
    expect(m.get(18, 18)).toBe(true);
    expect(m.get(16, 16)).toBe(true);
    expect(m.get(17, 17)).toBe(false);
  });

  it("populates data", () => {
    const m = new QrMatrix(5);
    const data = [true, false, true, true, false];
    m.populateData(data);
    expect(m.darkModuleCount()).toBeGreaterThan(0);
  });

  it("applies mask", () => {
    const m = new QrMatrix(5);
    m.set(0, 0, true);
    m.applyMask((r, c) => r === 0 && c === 0);
    expect(m.get(0, 0)).toBe(false);
  });

  it("counts dark modules", () => {
    const m = new QrMatrix(3);
    m.set(0, 0, true);
    m.set(1, 1, true);
    expect(m.darkModuleCount()).toBe(2);
  });

  it("calculates dark percentage", () => {
    const m = new QrMatrix(10);
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 10; c++) {
        m.set(r, c, true);
      }
    }
    expect(m.darkPercentage()).toBeCloseTo(50);
  });

  it("generates ASCII art", () => {
    const m = new QrMatrix(3);
    m.set(0, 0, true);
    const art = m.toAscii();
    expect(art).toContain("##");
    expect(art.split("\n")).toHaveLength(3);
  });

  it("creates checkerboard pattern", () => {
    const m = QrMatrix.checkerboard(4);
    expect(m.get(0, 0)).toBe(true);
    expect(m.get(0, 1)).toBe(false);
    expect(m.get(1, 0)).toBe(false);
    expect(m.get(1, 1)).toBe(true);
  });

  it("returns matrix copy", () => {
    const m = new QrMatrix(3);
    m.set(0, 0, true);
    const copy = m.toMatrix();
    copy[0][0] = false;
    expect(m.get(0, 0)).toBe(true);
  });
});
