import { describe, it, expect } from "vitest";
import {
  stringCount, controlBarWidth, stringLength, jointRange,
  weightLimit, bodySegments, headWeight, limbLength,
  walkCycleFrames, operatorHeight, rehearsalHours, marionetteTypes,
} from "../marionette-calc.js";

describe("stringCount", () => {
  it("marionette = 9", () => {
    expect(stringCount("marionette")).toBe(9);
  });
  it("hand = 0", () => {
    expect(stringCount("hand")).toBe(0);
  });
});

describe("controlBarWidth", () => {
  it("60% of puppet height", () => {
    expect(controlBarWidth(50)).toBe(30);
  });
});

describe("stringLength", () => {
  it("70% of stage height", () => {
    expect(stringLength(200)).toBe(140);
  });
});

describe("jointRange", () => {
  it("pivot = 360", () => {
    expect(jointRange("pivot")).toBe(360);
  });
});

describe("weightLimit", () => {
  it("positive grams", () => {
    expect(weightLimit(1, 9)).toBeGreaterThan(0);
  });
});

describe("bodySegments", () => {
  it("is 8", () => {
    expect(bodySegments()).toBe(8);
  });
});

describe("headWeight", () => {
  it("25% of total", () => {
    expect(headWeight(400)).toBe(100);
  });
});

describe("limbLength", () => {
  it("positive length", () => {
    expect(limbLength(60, "torso")).toBeGreaterThan(0);
  });
});

describe("walkCycleFrames", () => {
  it("is 16", () => {
    expect(walkCycleFrames()).toBe(16);
  });
});

describe("operatorHeight", () => {
  it("stage top + 30cm", () => {
    expect(operatorHeight(200)).toBe(230);
  });
});

describe("rehearsalHours", () => {
  it("scales with complexity", () => {
    expect(rehearsalHours(5)).toBeGreaterThan(rehearsalHours(2));
  });
});

describe("marionetteTypes", () => {
  it("returns 5 types", () => {
    expect(marionetteTypes()).toHaveLength(5);
  });
});
