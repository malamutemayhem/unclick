import { describe, it, expect } from "vitest";
import {
  largeEndDiameterMm, smallEndDiameterMm, chainLengthMm, grooveCount,
  torqueEqualization, chainPitchMm, machiningTimeHours, materialWeightG,
  costEstimate, fuseeShapes,
} from "../fusee-calc.js";

describe("largeEndDiameterMm", () => {
  it("90% of barrel diameter", () => {
    expect(largeEndDiameterMm(20)).toBe(18);
  });
});

describe("smallEndDiameterMm", () => {
  it("40% of large end", () => {
    expect(smallEndDiameterMm(20)).toBe(8);
  });
});

describe("chainLengthMm", () => {
  it("more turns = longer chain", () => {
    expect(chainLengthMm(15, 8)).toBeGreaterThan(chainLengthMm(15, 4));
  });
});

describe("grooveCount", () => {
  it("hyperbolic has most grooves", () => {
    expect(grooveCount("hyperbolic")).toBeGreaterThan(grooveCount("stepped"));
  });
});

describe("torqueEqualization", () => {
  it("hyperbolic has best equalization", () => {
    expect(torqueEqualization("hyperbolic")).toBeGreaterThan(
      torqueEqualization("stepped")
    );
  });
});

describe("chainPitchMm", () => {
  it("more grooves = smaller pitch", () => {
    expect(chainPitchMm(20, 14)).toBeLessThan(chainPitchMm(20, 8));
  });
  it("zero grooves returns 0", () => {
    expect(chainPitchMm(20, 0)).toBe(0);
  });
});

describe("machiningTimeHours", () => {
  it("hyperbolic takes longest", () => {
    expect(machiningTimeHours("hyperbolic")).toBeGreaterThan(
      machiningTimeHours("stepped")
    );
  });
});

describe("materialWeightG", () => {
  it("snail is heaviest per unit height", () => {
    expect(materialWeightG("snail", 15)).toBeGreaterThan(
      materialWeightG("hyperbolic", 15)
    );
  });
});

describe("costEstimate", () => {
  it("hyperbolic is most expensive", () => {
    expect(costEstimate("hyperbolic")).toBeGreaterThan(costEstimate("stepped"));
  });
});

describe("fuseeShapes", () => {
  it("returns 5 shapes", () => {
    expect(fuseeShapes()).toHaveLength(5);
  });
});
