import { describe, it, expect } from "vitest";
import {
  polesRequired, diameterMeters, setupTimeMinutes,
  smokeFlapsAdjustable, waterResistance, weightKg,
  hidesRequired, insulation, costEstimate, tipiCovers,
} from "../tipi-calc.js";

describe("polesRequired", () => {
  it("modern synthetic needs most poles", () => {
    expect(polesRequired("modern_synthetic")).toBeGreaterThan(
      polesRequired("birch_bark")
    );
  });
});

describe("diameterMeters", () => {
  it("modern synthetic is largest", () => {
    expect(diameterMeters("modern_synthetic")).toBeGreaterThan(
      diameterMeters("birch_bark")
    );
  });
});

describe("setupTimeMinutes", () => {
  it("birch bark takes longest", () => {
    expect(setupTimeMinutes("birch_bark")).toBeGreaterThan(
      setupTimeMinutes("modern_synthetic")
    );
  });
});

describe("smokeFlapsAdjustable", () => {
  it("buffalo hide has adjustable flaps", () => {
    expect(smokeFlapsAdjustable("buffalo_hide")).toBe(true);
  });
  it("birch bark does not", () => {
    expect(smokeFlapsAdjustable("birch_bark")).toBe(false);
  });
});

describe("waterResistance", () => {
  it("modern synthetic has best water resistance", () => {
    expect(waterResistance("modern_synthetic")).toBeGreaterThan(
      waterResistance("elk_hide")
    );
  });
});

describe("weightKg", () => {
  it("buffalo hide is heaviest", () => {
    expect(weightKg("buffalo_hide")).toBeGreaterThan(
      weightKg("modern_synthetic")
    );
  });
});

describe("hidesRequired", () => {
  it("elk hide needs most hides", () => {
    expect(hidesRequired("elk_hide")).toBeGreaterThan(
      hidesRequired("buffalo_hide")
    );
  });
});

describe("insulation", () => {
  it("buffalo hide insulates best", () => {
    expect(insulation("buffalo_hide")).toBeGreaterThan(
      insulation("canvas")
    );
  });
});

describe("costEstimate", () => {
  it("buffalo hide is most expensive", () => {
    expect(costEstimate("buffalo_hide")).toBeGreaterThan(
      costEstimate("birch_bark")
    );
  });
});

describe("tipiCovers", () => {
  it("returns 5 covers", () => {
    expect(tipiCovers()).toHaveLength(5);
  });
});
