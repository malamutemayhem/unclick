import { describe, it, expect } from "vitest";
import {
  heightCm, baseDiameterCm, weightKg, windLoadN,
  lightningRisk, gildingArea, mountingBoltCount,
  carvingHours, maintenanceYears, finialForms,
} from "../finial-calc.js";

describe("heightCm", () => {
  it("5% of roof peak", () => {
    expect(heightCm(10)).toBe(50);
  });
});

describe("baseDiameterCm", () => {
  it("40% of height", () => {
    expect(baseDiameterCm(50)).toBe(20);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(50, "ball", "stone")).toBeGreaterThan(0);
  });
});

describe("windLoadN", () => {
  it("positive load", () => {
    expect(windLoadN(50, 20, 80)).toBeGreaterThan(0);
  });
});

describe("lightningRisk", () => {
  it("metallic higher", () => {
    expect(lightningRisk(50, true)).toBeGreaterThan(lightningRisk(50, false));
  });
});

describe("gildingArea", () => {
  it("pineapple largest", () => {
    expect(gildingArea(50, "pineapple")).toBeGreaterThan(gildingArea(50, "spire"));
  });
});

describe("mountingBoltCount", () => {
  it("light = 2 bolts", () => {
    expect(mountingBoltCount(3)).toBe(2);
  });
  it("heavy = 8 bolts", () => {
    expect(mountingBoltCount(60)).toBe(8);
  });
});

describe("carvingHours", () => {
  it("pineapple slowest", () => {
    expect(carvingHours("pineapple", 50)).toBeGreaterThan(carvingHours("ball", 50));
  });
});

describe("maintenanceYears", () => {
  it("copper longest", () => {
    expect(maintenanceYears("copper")).toBeGreaterThan(maintenanceYears("wood"));
  });
});

describe("finialForms", () => {
  it("returns 5 forms", () => {
    expect(finialForms()).toHaveLength(5);
  });
});
