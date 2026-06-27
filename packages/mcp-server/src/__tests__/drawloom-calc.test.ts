import { describe, it, expect } from "vitest";
import {
  simpleCount, cordCount, comberBoardHoles, drawBoyLifts,
  lashingLength, patternRepeatCm, weavingSpeed,
  warpBeamWeight, heddles, setupTimeHours, figureWeaves,
} from "../drawloom-calc.js";

describe("simpleCount", () => {
  it("positive count", () => {
    expect(simpleCount(100, 0.5)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(simpleCount(100, 0)).toBe(0);
  });
});

describe("cordCount", () => {
  it("fewer cords than threads", () => {
    expect(cordCount(200, 4)).toBeLessThan(200);
  });
});

describe("comberBoardHoles", () => {
  it("equals figure threads", () => {
    expect(comberBoardHoles(200)).toBe(200);
  });
});

describe("drawBoyLifts", () => {
  it("positive lifts", () => {
    expect(drawBoyLifts(50, 3)).toBe(150);
  });
});

describe("lashingLength", () => {
  it("positive length", () => {
    expect(lashingLength(3, 10)).toBeGreaterThan(0);
  });
});

describe("patternRepeatCm", () => {
  it("positive cm", () => {
    expect(patternRepeatCm(50, 0.2)).toBeGreaterThan(0);
  });
});

describe("weavingSpeed", () => {
  it("damask fastest", () => {
    expect(weavingSpeed("damask")).toBeGreaterThan(weavingSpeed("velvet"));
  });
});

describe("warpBeamWeight", () => {
  it("positive kg", () => {
    expect(warpBeamWeight(2000, 10, 50)).toBeGreaterThan(0);
  });
});

describe("heddles", () => {
  it("product of shafts and threads", () => {
    expect(heddles(8, 100)).toBe(800);
  });
});

describe("setupTimeHours", () => {
  it("positive hours", () => {
    expect(setupTimeHours(200)).toBeGreaterThan(4);
  });
});

describe("figureWeaves", () => {
  it("returns 5 weaves", () => {
    expect(figureWeaves()).toHaveLength(5);
  });
});
