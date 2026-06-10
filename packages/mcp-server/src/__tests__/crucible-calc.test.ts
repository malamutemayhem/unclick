import { describe, it, expect } from "vitest";
import {
  volumeMl, meltCapacityKg, maxTemp, heatUpTimeMin,
  thermalShockRisk, fluxAmountG, pouringTemp,
  lifetimePours, slagVolumeMl, crucibleMaterials,
} from "../crucible-calc.js";

describe("volumeMl", () => {
  it("positive ml", () => {
    expect(volumeMl(10, 15)).toBeGreaterThan(0);
  });
});

describe("meltCapacityKg", () => {
  it("positive kg", () => {
    expect(meltCapacityKg(1000, 7.8)).toBeGreaterThan(0);
  });
});

describe("maxTemp", () => {
  it("graphite highest", () => {
    expect(maxTemp("graphite")).toBeGreaterThan(maxTemp("clay"));
  });
});

describe("heatUpTimeMin", () => {
  it("positive minutes", () => {
    expect(heatUpTimeMin(500, 1000, 5)).toBeGreaterThan(0);
  });
  it("zero power = 0", () => {
    expect(heatUpTimeMin(500, 1000, 0)).toBe(0);
  });
});

describe("thermalShockRisk", () => {
  it("high rate in clay = high", () => {
    expect(thermalShockRisk(50, "clay")).toBe("high");
  });
  it("low rate in graphite = low", () => {
    expect(thermalShockRisk(10, "graphite")).toBe("low");
  });
});

describe("fluxAmountG", () => {
  it("positive grams", () => {
    expect(fluxAmountG(5, "copper")).toBeGreaterThan(0);
  });
});

describe("pouringTemp", () => {
  it("above melting point", () => {
    expect(pouringTemp(1000)).toBeGreaterThan(1000);
  });
});

describe("lifetimePours", () => {
  it("zirconia most durable", () => {
    expect(lifetimePours("zirconia")).toBeGreaterThan(lifetimePours("clay"));
  });
});

describe("slagVolumeMl", () => {
  it("positive ml", () => {
    expect(slagVolumeMl(5, 95)).toBeGreaterThan(0);
  });
});

describe("crucibleMaterials", () => {
  it("returns 5 materials", () => {
    expect(crucibleMaterials()).toHaveLength(5);
  });
});
