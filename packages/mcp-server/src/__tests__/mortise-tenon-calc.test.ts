import { describe, it, expect } from "vitest";
import {
  tenonThicknessMm, tenonWidthMm, mortiseDepthMm, shoulderCount,
  glueSurfaceAreaFactor, strengthRating, difficultyRating, chiselsNeeded,
  cuttingTimeMinutes, jointTypes,
} from "../mortise-tenon-calc.js";

describe("tenonThicknessMm", () => {
  it("one third of stock thickness", () => {
    expect(tenonThicknessMm(30)).toBe(10);
  });
});

describe("tenonWidthMm", () => {
  it("tusk has widest tenon", () => {
    expect(tenonWidthMm(100, "tusk")).toBeGreaterThan(
      tenonWidthMm(100, "haunched")
    );
  });
});

describe("mortiseDepthMm", () => {
  it("through goes full depth", () => {
    expect(mortiseDepthMm(40, "through")).toBe(40);
  });
  it("blind is shallower", () => {
    expect(mortiseDepthMm(40, "blind")).toBeLessThan(40);
  });
});

describe("shoulderCount", () => {
  it("through has 4 shoulders", () => {
    expect(shoulderCount("through")).toBe(4);
  });
  it("tusk has 2 shoulders", () => {
    expect(shoulderCount("tusk")).toBe(2);
  });
});

describe("glueSurfaceAreaFactor", () => {
  it("wedged has highest factor", () => {
    expect(glueSurfaceAreaFactor("wedged")).toBeGreaterThan(
      glueSurfaceAreaFactor("blind")
    );
  });
});

describe("strengthRating", () => {
  it("wedged is strongest", () => {
    expect(strengthRating("wedged")).toBeGreaterThan(strengthRating("blind"));
  });
});

describe("difficultyRating", () => {
  it("tusk is most difficult", () => {
    expect(difficultyRating("tusk")).toBeGreaterThan(
      difficultyRating("through")
    );
  });
});

describe("chiselsNeeded", () => {
  it("returns 3", () => {
    expect(chiselsNeeded()).toBe(3);
  });
});

describe("cuttingTimeMinutes", () => {
  it("tusk takes longest", () => {
    expect(cuttingTimeMinutes("tusk")).toBeGreaterThan(
      cuttingTimeMinutes("through")
    );
  });
});

describe("jointTypes", () => {
  it("returns 5 types", () => {
    expect(jointTypes()).toHaveLength(5);
  });
});
