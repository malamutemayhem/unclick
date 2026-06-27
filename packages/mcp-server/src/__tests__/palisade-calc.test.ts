import { describe, it, expect } from "vitest";
import {
  postCount, postHeight, timberVolumeM3, pointAngle,
  trenchDepthCm, trenchLengthM, laborDays, lifespanYears,
  defensiveStrength, gateWidth, woodTypes,
} from "../palisade-calc.js";

describe("postCount", () => {
  it("positive count", () => {
    expect(postCount(100, 15)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(postCount(100, 0)).toBe(0);
  });
});

describe("postHeight", () => {
  it("sum of visible and buried", () => {
    expect(postHeight(200, 60)).toBe(260);
  });
});

describe("timberVolumeM3", () => {
  it("positive volume", () => {
    expect(timberVolumeM3(50, 250, 15)).toBeGreaterThan(0);
  });
});

describe("pointAngle", () => {
  it("capped at 60", () => {
    expect(pointAngle(50)).toBeLessThanOrEqual(60);
  });
});

describe("trenchDepthCm", () => {
  it("about a third", () => {
    expect(trenchDepthCm(300)).toBeCloseTo(99, 0);
  });
});

describe("trenchLengthM", () => {
  it("equals perimeter", () => {
    expect(trenchLengthM(100)).toBe(100);
  });
});

describe("laborDays", () => {
  it("positive days", () => {
    expect(laborDays(50, 5)).toBeGreaterThan(0);
  });
  it("zero crew = 0", () => {
    expect(laborDays(50, 0)).toBe(0);
  });
});

describe("lifespanYears", () => {
  it("treated lasts longer", () => {
    expect(lifespanYears("pine", true)).toBeGreaterThan(lifespanYears("pine", false));
  });
});

describe("defensiveStrength", () => {
  it("thick and close = strong", () => {
    expect(defensiveStrength(15, 15)).toBe("strong");
  });
});

describe("gateWidth", () => {
  it("vehicle wider", () => {
    expect(gateWidth(true)).toBeGreaterThan(gateWidth(false));
  });
});

describe("woodTypes", () => {
  it("returns 5 types", () => {
    expect(woodTypes()).toHaveLength(5);
  });
});
