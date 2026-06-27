import { describe, it, expect } from "vitest";
import {
  bandForce, launchVelocity, kineticEnergy, effectiveRange,
  ammoWeight, bandLifeShots, drawWeight, forkWidth,
  pouchSize, bandLength, accuracy, safetyDistance, bandMaterials,
} from "../slingshot-calc.js";

describe("bandForce", () => {
  it("positive force", () => {
    expect(bandForce(20, 0.5)).toBeGreaterThan(0);
  });
});

describe("launchVelocity", () => {
  it("positive velocity", () => {
    expect(launchVelocity(50, 0.2, 0.01)).toBeGreaterThan(0);
  });
  it("zero mass returns 0", () => {
    expect(launchVelocity(50, 0.2, 0)).toBe(0);
  });
});

describe("kineticEnergy", () => {
  it("positive joules", () => {
    expect(kineticEnergy(0.01, 30)).toBeGreaterThan(0);
  });
});

describe("effectiveRange", () => {
  it("positive meters", () => {
    expect(effectiveRange(30)).toBeGreaterThan(0);
  });
});

describe("ammoWeight", () => {
  it("lead heaviest", () => {
    expect(ammoWeight("lead", 10)).toBeGreaterThan(ammoWeight("clay", 10));
  });
});

describe("bandLifeShots", () => {
  it("theraband lasts longest", () => {
    expect(bandLifeShots("theraband")).toBeGreaterThan(bandLifeShots("natural_rubber"));
  });
});

describe("drawWeight", () => {
  it("more bands = more weight", () => {
    expect(drawWeight(4, 5)).toBeGreaterThan(drawWeight(2, 5));
  });
});

describe("forkWidth", () => {
  it("3x ammo diameter", () => {
    expect(forkWidth(10)).toBe(30);
  });
});

describe("pouchSize", () => {
  it("2.5x ammo diameter", () => {
    expect(pouchSize(10)).toBe(25);
  });
});

describe("bandLength", () => {
  it("longer than draw length", () => {
    expect(bandLength(20)).toBeGreaterThan(20);
  });
});

describe("accuracy", () => {
  it("decreases with distance", () => {
    expect(accuracy(5, 5)).toBeGreaterThan(accuracy(30, 5));
  });
});

describe("safetyDistance", () => {
  it("1.5x max range", () => {
    expect(safetyDistance(30)).toBe(45);
  });
});

describe("bandMaterials", () => {
  it("returns 4 materials", () => {
    expect(bandMaterials()).toHaveLength(4);
  });
});
