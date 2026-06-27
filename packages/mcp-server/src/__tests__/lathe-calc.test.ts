import { describe, it, expect } from "vitest";
import {
  spindleSpeedRpm, feedRateMmPerRev, depthOfCutMm,
  materialRemovalRateCm3PerMin, machiningTimeMinutes, tailstockRequired,
  steadyRestRequired, chuckJawCount, surfaceFinishRa, toolLifeMinutes,
  latheOperations,
} from "../lathe-calc.js";

describe("spindleSpeedRpm", () => {
  it("smaller diameter = higher speed", () => {
    expect(spindleSpeedRpm(20, 100)).toBeGreaterThan(spindleSpeedRpm(40, 100));
  });
  it("zero diameter returns zero", () => {
    expect(spindleSpeedRpm(0, 100)).toBe(0);
  });
});

describe("feedRateMmPerRev", () => {
  it("roughing has highest feed", () => {
    expect(feedRateMmPerRev("roughing")).toBeGreaterThan(feedRateMmPerRev("finishing"));
  });
  it("threading has zero feed", () => {
    expect(feedRateMmPerRev("threading")).toBe(0);
  });
});

describe("depthOfCutMm", () => {
  it("roughing deepest cut", () => {
    expect(depthOfCutMm("roughing")).toBeGreaterThan(depthOfCutMm("finishing"));
  });
});

describe("materialRemovalRateCm3PerMin", () => {
  it("positive for valid inputs", () => {
    expect(materialRemovalRateCm3PerMin(1000, 0.3, 2.5, 50)).toBeGreaterThan(0);
  });
});

describe("machiningTimeMinutes", () => {
  it("longer piece = more time", () => {
    expect(machiningTimeMinutes(200, 0.3, 1000)).toBeGreaterThan(
      machiningTimeMinutes(100, 0.3, 1000)
    );
  });
  it("zero feed returns zero", () => {
    expect(machiningTimeMinutes(100, 0, 1000)).toBe(0);
  });
});

describe("tailstockRequired", () => {
  it("needed for long workpieces", () => {
    expect(tailstockRequired(5)).toBe(true);
  });
  it("not needed for short workpieces", () => {
    expect(tailstockRequired(2)).toBe(false);
  });
});

describe("steadyRestRequired", () => {
  it("needed for very long workpieces", () => {
    expect(steadyRestRequired(10)).toBe(true);
  });
  it("not needed for moderate length", () => {
    expect(steadyRestRequired(5)).toBe(false);
  });
});

describe("chuckJawCount", () => {
  it("3-jaw for round", () => {
    expect(chuckJawCount("round")).toBe(3);
  });
  it("4-jaw for square", () => {
    expect(chuckJawCount("square")).toBe(4);
  });
});

describe("surfaceFinishRa", () => {
  it("finer feed = better finish", () => {
    expect(surfaceFinishRa(0.05, 0.8)).toBeLessThan(surfaceFinishRa(0.3, 0.8));
  });
  it("zero radius returns zero", () => {
    expect(surfaceFinishRa(0.3, 0)).toBe(0);
  });
});

describe("toolLifeMinutes", () => {
  it("slower speed = longer life", () => {
    expect(toolLifeMinutes(50)).toBeGreaterThan(toolLifeMinutes(100));
  });
});

describe("latheOperations", () => {
  it("returns 5 operations", () => {
    expect(latheOperations()).toHaveLength(5);
  });
});
