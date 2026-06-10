import { describe, it, expect } from "vitest";
import {
  sphereRadiusM, surfaceAreaM2, thicknessCm, weightKg,
  thrustForceKn, mosaicTesserae, scaffoldPlatforms,
  carvingHours, crackMonitorPoints, restorationCostPerM2, pendentiveForms,
} from "../pendentive-calc.js";

describe("sphereRadiusM", () => {
  it("positive radius", () => {
    expect(sphereRadiusM(10)).toBeGreaterThan(0);
  });
});

describe("surfaceAreaM2", () => {
  it("positive area", () => {
    expect(surfaceAreaM2(7)).toBeGreaterThan(0);
  });
});

describe("thicknessCm", () => {
  it("compound thickest", () => {
    expect(thicknessCm(7, "compound")).toBeGreaterThan(thicknessCm(7, "sail"));
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(46, 84, 2400)).toBeGreaterThan(0);
  });
});

describe("thrustForceKn", () => {
  it("positive force", () => {
    expect(thrustForceKn(5000, 45)).toBeGreaterThan(0);
  });
  it("zero angle = 0", () => {
    expect(thrustForceKn(5000, 0)).toBe(0);
  });
});

describe("mosaicTesserae", () => {
  it("positive count", () => {
    expect(mosaicTesserae(46, 1)).toBeGreaterThan(0);
  });
  it("zero size = 0", () => {
    expect(mosaicTesserae(46, 0)).toBe(0);
  });
});

describe("scaffoldPlatforms", () => {
  it("positive count", () => {
    expect(scaffoldPlatforms(15)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("decorated longest", () => {
    expect(carvingHours("decorated", 46)).toBeGreaterThan(carvingHours("sail", 46));
  });
});

describe("crackMonitorPoints", () => {
  it("at least 4", () => {
    expect(crackMonitorPoints(1)).toBeGreaterThanOrEqual(4);
  });
});

describe("restorationCostPerM2", () => {
  it("decorated most expensive", () => {
    expect(restorationCostPerM2("decorated")).toBeGreaterThan(restorationCostPerM2("simple"));
  });
});

describe("pendentiveForms", () => {
  it("returns 5 forms", () => {
    expect(pendentiveForms()).toHaveLength(5);
  });
});
