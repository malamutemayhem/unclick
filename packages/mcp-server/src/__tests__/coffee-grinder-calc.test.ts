import { describe, it, expect } from "vitest";
import {
  grindConsistency, grindRange, retention, noiseLevel,
  grinderCost, electric, espressoCapable, burrMaterial,
  bestBrew, coffeeGrinders,
} from "../coffee-grinder-calc.js";

describe("grindConsistency", () => {
  it("roller commercial most consistent", () => {
    expect(grindConsistency("roller_commercial")).toBeGreaterThan(grindConsistency("blade_electric"));
  });
});

describe("grindRange", () => {
  it("flat burr widest range", () => {
    expect(grindRange("flat_burr")).toBeGreaterThan(grindRange("blade_electric"));
  });
});

describe("retention", () => {
  it("roller commercial highest retention", () => {
    expect(retention("roller_commercial")).toBeGreaterThan(retention("hand_manual"));
  });
});

describe("noiseLevel", () => {
  it("roller commercial noisiest", () => {
    expect(noiseLevel("roller_commercial")).toBeGreaterThan(noiseLevel("hand_manual"));
  });
});

describe("grinderCost", () => {
  it("roller commercial most expensive", () => {
    expect(grinderCost("roller_commercial")).toBeGreaterThan(grinderCost("blade_electric"));
  });
});

describe("electric", () => {
  it("flat burr is electric", () => {
    expect(electric("flat_burr")).toBe(true);
  });
  it("hand manual is not", () => {
    expect(electric("hand_manual")).toBe(false);
  });
});

describe("espressoCapable", () => {
  it("conical burr is espresso capable", () => {
    expect(espressoCapable("conical_burr")).toBe(true);
  });
  it("blade electric is not", () => {
    expect(espressoCapable("blade_electric")).toBe(false);
  });
});

describe("burrMaterial", () => {
  it("conical burr uses ceramic conical slow grind", () => {
    expect(burrMaterial("conical_burr")).toBe("ceramic_conical_slow_grind");
  });
});

describe("bestBrew", () => {
  it("hand manual for travel camping single dose", () => {
    expect(bestBrew("hand_manual")).toBe("travel_camping_single_dose");
  });
});

describe("coffeeGrinders", () => {
  it("returns 5 types", () => {
    expect(coffeeGrinders()).toHaveLength(5);
  });
});
