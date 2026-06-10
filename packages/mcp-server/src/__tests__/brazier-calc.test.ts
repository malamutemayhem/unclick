import { describe, it, expect } from "vitest";
import {
  bowlDiameterCm, fuelCapacityKg, burnDurationHours,
  heatOutputBtu, ventGapCm, sparkScreenMesh, standHeightCm,
  safeDistanceM, ashCleanupKg, metalWeightKg, brazierFuels,
} from "../brazier-calc.js";

describe("bowlDiameterCm", () => {
  it("industrial largest", () => {
    expect(bowlDiameterCm("industrial")).toBeGreaterThan(bowlDiameterCm("low"));
  });
});

describe("fuelCapacityKg", () => {
  it("positive kg", () => {
    expect(fuelCapacityKg(50, 20)).toBeGreaterThan(0);
  });
});

describe("burnDurationHours", () => {
  it("coal burns longest", () => {
    expect(burnDurationHours(5, "coal")).toBeGreaterThan(burnDurationHours(5, "dung"));
  });
});

describe("heatOutputBtu", () => {
  it("coal highest btu", () => {
    expect(heatOutputBtu(5, "coal")).toBeGreaterThan(heatOutputBtu(5, "peat"));
  });
});

describe("ventGapCm", () => {
  it("15% of diameter", () => {
    expect(ventGapCm(50)).toBeCloseTo(7.5, 1);
  });
});

describe("sparkScreenMesh", () => {
  it("wood coarsest", () => {
    expect(sparkScreenMesh("wood")).toBeLessThan(sparkScreenMesh("dung"));
  });
});

describe("standHeightCm", () => {
  it("cooking tallest", () => {
    expect(standHeightCm("cooking")).toBeGreaterThan(standHeightCm("table"));
  });
});

describe("safeDistanceM", () => {
  it("positive meters", () => {
    expect(safeDistanceM(50000)).toBeGreaterThan(0);
  });
});

describe("ashCleanupKg", () => {
  it("dung most ash", () => {
    expect(ashCleanupKg(5, "dung")).toBeGreaterThan(ashCleanupKg(5, "charcoal"));
  });
});

describe("metalWeightKg", () => {
  it("positive kg", () => {
    expect(metalWeightKg(50, 3)).toBeGreaterThan(0);
  });
});

describe("brazierFuels", () => {
  it("returns 5 fuels", () => {
    expect(brazierFuels()).toHaveLength(5);
  });
});
