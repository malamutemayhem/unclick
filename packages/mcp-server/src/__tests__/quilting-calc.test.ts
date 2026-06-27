import { describe, it, expect } from "vitest";
import {
  quiltDimensions, blocksNeeded, fabricYards, battingYards,
  bindingStrips, seamAllowance, cutSize, piecesPerBlock,
  totalPieces, sewingTime, threadYards, quiltWeight, quiltSizes,
} from "../quilting-calc.js";

describe("quiltDimensions", () => {
  it("queen is 90x108", () => {
    const d = quiltDimensions("queen");
    expect(d.widthIn).toBe(90);
    expect(d.heightIn).toBe(108);
  });
});

describe("blocksNeeded", () => {
  it("correct count", () => {
    expect(blocksNeeded(90, 108, 9)).toBe(120);
  });
  it("zero block size = 0", () => {
    expect(blocksNeeded(90, 108, 0)).toBe(0);
  });
});

describe("fabricYards", () => {
  it("positive yards", () => {
    expect(fabricYards(9720)).toBeGreaterThan(0);
  });
});

describe("battingYards", () => {
  it("positive yards", () => {
    expect(battingYards(90, 108)).toBeGreaterThan(0);
  });
});

describe("bindingStrips", () => {
  it("positive strips", () => {
    expect(bindingStrips(396, 42)).toBeGreaterThan(0);
  });
});

describe("seamAllowance", () => {
  it("is 0.25 inch", () => {
    expect(seamAllowance()).toBe(0.25);
  });
});

describe("cutSize", () => {
  it("adds 0.5 inch", () => {
    expect(cutSize(9)).toBe(9.5);
  });
});

describe("piecesPerBlock", () => {
  it("log_cabin = 13", () => {
    expect(piecesPerBlock("log_cabin")).toBe(13);
  });
  it("square = 1", () => {
    expect(piecesPerBlock("square")).toBe(1);
  });
});

describe("totalPieces", () => {
  it("correct product", () => {
    expect(totalPieces(120, 4)).toBe(480);
  });
});

describe("sewingTime", () => {
  it("positive hours", () => {
    expect(sewingTime(480, 3)).toBeGreaterThan(0);
  });
});

describe("threadYards", () => {
  it("positive yards", () => {
    expect(threadYards(1000)).toBeGreaterThan(0);
  });
});

describe("quiltWeight", () => {
  it("positive lbs", () => {
    expect(quiltWeight(90, 108)).toBeGreaterThan(0);
  });
});

describe("quiltSizes", () => {
  it("returns 6 sizes", () => {
    expect(quiltSizes()).toHaveLength(6);
  });
});
