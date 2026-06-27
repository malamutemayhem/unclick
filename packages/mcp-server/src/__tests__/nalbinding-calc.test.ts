import { describe, it, expect } from "vitest";
import {
  needleLengthCm, yarnLengthPerPassCm, fabricThicknessMm, stretchPercent,
  connectionsPerStitch, difficultyRating, stitchesPerHour, unravels,
  yarnWeightBest, nalbindingStitches,
} from "../nalbinding-calc.js";

describe("needleLengthCm", () => {
  it("korgen uses longest needle", () => {
    expect(needleLengthCm("korgen")).toBeGreaterThan(
      needleLengthCm("york")
    );
  });
});

describe("yarnLengthPerPassCm", () => {
  it("korgen uses most yarn per pass", () => {
    expect(yarnLengthPerPassCm("korgen")).toBeGreaterThan(
      yarnLengthPerPassCm("york")
    );
  });
});

describe("fabricThicknessMm", () => {
  it("korgen makes thickest fabric", () => {
    expect(fabricThicknessMm("korgen")).toBeGreaterThan(
      fabricThicknessMm("york")
    );
  });
});

describe("stretchPercent", () => {
  it("york stretches most", () => {
    expect(stretchPercent("york")).toBeGreaterThan(
      stretchPercent("korgen")
    );
  });
});

describe("connectionsPerStitch", () => {
  it("korgen has most connections", () => {
    expect(connectionsPerStitch("korgen")).toBeGreaterThan(
      connectionsPerStitch("york")
    );
  });
});

describe("difficultyRating", () => {
  it("korgen is hardest", () => {
    expect(difficultyRating("korgen")).toBeGreaterThan(
      difficultyRating("york")
    );
  });
});

describe("stitchesPerHour", () => {
  it("york is fastest", () => {
    expect(stitchesPerHour("york")).toBeGreaterThan(
      stitchesPerHour("korgen")
    );
  });
});

describe("unravels", () => {
  it("nalbinding does not unravel", () => {
    expect(unravels()).toBe(false);
  });
});

describe("yarnWeightBest", () => {
  it("korgen uses super bulky", () => {
    expect(yarnWeightBest("korgen")).toBe("super_bulky");
  });
});

describe("nalbindingStitches", () => {
  it("returns 5 stitches", () => {
    expect(nalbindingStitches()).toHaveLength(5);
  });
});
