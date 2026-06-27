import { describe, it, expect } from "vitest";
import {
  canopyHeight, canopyAreaM2, columnCount, columnDiameterCm,
  totalWeightKg, gildingAreaM2, lightFixtures, fabricDrapeLength,
  foundationLoadKn, maintenanceCostPerYear, baldachinMaterials,
} from "../baldachin-calc.js";

describe("canopyHeight", () => {
  it("taller than columns", () => {
    expect(canopyHeight(5)).toBeGreaterThan(5);
  });
});

describe("canopyAreaM2", () => {
  it("positive area", () => {
    expect(canopyAreaM2(3, 3)).toBe(9);
  });
});

describe("columnCount", () => {
  it("always 4", () => {
    expect(columnCount()).toBe(4);
  });
});

describe("columnDiameterCm", () => {
  it("wood thickest", () => {
    expect(columnDiameterCm(5, "wood")).toBeGreaterThan(columnDiameterCm(5, "fabric"));
  });
});

describe("totalWeightKg", () => {
  it("marble heaviest", () => {
    expect(totalWeightKg(9, 5, "marble")).toBeGreaterThan(totalWeightKg(9, 5, "fabric"));
  });
});

describe("gildingAreaM2", () => {
  it("positive area", () => {
    expect(gildingAreaM2(9, 4, 5, 40)).toBeGreaterThan(0);
  });
});

describe("lightFixtures", () => {
  it("positive count", () => {
    expect(lightFixtures(9)).toBeGreaterThan(0);
  });
});

describe("fabricDrapeLength", () => {
  it("longer with higher factor", () => {
    expect(fabricDrapeLength(5, 1.5)).toBeGreaterThan(fabricDrapeLength(5, 1.2));
  });
});

describe("foundationLoadKn", () => {
  it("positive kn", () => {
    expect(foundationLoadKn(5000)).toBeGreaterThan(0);
  });
});

describe("maintenanceCostPerYear", () => {
  it("bronze most expensive", () => {
    expect(maintenanceCostPerYear("bronze", 20)).toBeGreaterThan(maintenanceCostPerYear("wood", 20));
  });
});

describe("baldachinMaterials", () => {
  it("returns 5 materials", () => {
    expect(baldachinMaterials()).toHaveLength(5);
  });
});
