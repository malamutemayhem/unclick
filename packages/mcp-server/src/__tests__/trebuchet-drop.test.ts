import { describe, it, expect } from "vitest";
import {
  dropHeight, potentialEnergyJ, efficiencyPercent, kineticEnergyJ,
  dropTimeS, impactVelocity, counterweightBoxVolume,
  pivotLoadKn, frameStress, safetyFactor, dropMechanisms,
} from "../trebuchet-drop.js";

describe("dropHeight", () => {
  it("sum of arm and pivot", () => {
    expect(dropHeight(3, 5)).toBe(8);
  });
});

describe("potentialEnergyJ", () => {
  it("positive joules", () => {
    expect(potentialEnergyJ(1000, 5)).toBeGreaterThan(0);
  });
});

describe("efficiencyPercent", () => {
  it("hinged most efficient", () => {
    expect(efficiencyPercent("hinged")).toBeGreaterThan(efficiencyPercent("fixed"));
  });
});

describe("kineticEnergyJ", () => {
  it("less than potential", () => {
    expect(kineticEnergyJ(10000, 85)).toBeLessThan(10000);
  });
});

describe("dropTimeS", () => {
  it("positive seconds", () => {
    expect(dropTimeS(5)).toBeGreaterThan(0);
  });
  it("zero height = 0", () => {
    expect(dropTimeS(0)).toBe(0);
  });
});

describe("impactVelocity", () => {
  it("positive m/s", () => {
    expect(impactVelocity(5)).toBeGreaterThan(0);
  });
  it("zero height = 0", () => {
    expect(impactVelocity(0)).toBe(0);
  });
});

describe("counterweightBoxVolume", () => {
  it("positive m3", () => {
    expect(counterweightBoxVolume(1000, 2500)).toBeGreaterThan(0);
  });
  it("zero density = 0", () => {
    expect(counterweightBoxVolume(1000, 0)).toBe(0);
  });
});

describe("pivotLoadKn", () => {
  it("positive kN", () => {
    expect(pivotLoadKn(1000, 50)).toBeGreaterThan(0);
  });
});

describe("frameStress", () => {
  it("positive stress", () => {
    expect(frameStress(10, 100)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(frameStress(10, 0)).toBe(0);
  });
});

describe("safetyFactor", () => {
  it("positive factor", () => {
    expect(safetyFactor(500, 100)).toBe(5);
  });
  it("zero stress = 0", () => {
    expect(safetyFactor(500, 0)).toBe(0);
  });
});

describe("dropMechanisms", () => {
  it("returns 4 mechanisms", () => {
    expect(dropMechanisms()).toHaveLength(4);
  });
});
