import { describe, it, expect } from "vitest";
import {
  widthCm, heightCm, projectionCm, bearingAreaCm2,
  loadCapacityKn, moldingLayers, carvingHours, springLineHeightM,
  weightKg, restorationCostPerUnit, impostProfiles,
} from "../impost-calc.js";

describe("widthCm", () => {
  it("8% of arch span", () => {
    expect(widthCm(100)).toBe(8);
  });
});

describe("heightCm", () => {
  it("1.5x width", () => {
    expect(heightCm(8)).toBe(12);
  });
});

describe("projectionCm", () => {
  it("12% of wall thickness", () => {
    expect(projectionCm(50)).toBe(6);
  });
});

describe("bearingAreaCm2", () => {
  it("positive area", () => {
    expect(bearingAreaCm2(8, 30)).toBe(240);
  });
});

describe("loadCapacityKn", () => {
  it("positive capacity", () => {
    expect(loadCapacityKn(240, 30)).toBeGreaterThan(0);
  });
});

describe("moldingLayers", () => {
  it("carved most layers", () => {
    expect(moldingLayers("carved")).toBeGreaterThan(moldingLayers("chamfered"));
  });
});

describe("carvingHours", () => {
  it("carved longest", () => {
    expect(carvingHours("carved", 100)).toBeGreaterThan(carvingHours("chamfered", 100));
  });
});

describe("springLineHeightM", () => {
  it("95% of column height", () => {
    expect(springLineHeightM(4)).toBe(3.8);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(8, 12, 30, 2.5)).toBeGreaterThan(0);
  });
});

describe("restorationCostPerUnit", () => {
  it("carved most expensive", () => {
    expect(restorationCostPerUnit("carved", 50)).toBeGreaterThan(restorationCostPerUnit("chamfered", 50));
  });
});

describe("impostProfiles", () => {
  it("returns 5 profiles", () => {
    expect(impostProfiles()).toHaveLength(5);
  });
});
