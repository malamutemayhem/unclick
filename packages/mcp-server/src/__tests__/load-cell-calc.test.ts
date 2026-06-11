import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, capacityRange, durability,
  lcCost, digitalOutput, forHighTemp, cellConfig,
  bestUse, loadCellTypes,
} from "../load-cell-calc.js";

describe("accuracy", () => {
  it("capacitive best accuracy", () => {
    expect(accuracy("capacitive_lc")).toBeGreaterThan(accuracy("hydraulic_lc"));
  });
});

describe("throughput", () => {
  it("piezoelectric highest throughput", () => {
    expect(throughput("piezoelectric_lc")).toBeGreaterThan(throughput("pneumatic_lc"));
  });
});

describe("capacityRange", () => {
  it("hydraulic best capacity range", () => {
    expect(capacityRange("hydraulic_lc")).toBeGreaterThan(capacityRange("capacitive_lc"));
  });
});

describe("durability", () => {
  it("hydraulic best durability", () => {
    expect(durability("hydraulic_lc")).toBeGreaterThan(durability("capacitive_lc"));
  });
});

describe("lcCost", () => {
  it("optical fiber most expensive", () => {
    expect(lcCost("piezoelectric_lc")).toBeGreaterThan(lcCost("strain_gauge_lc"));
  });
});

describe("digitalOutput", () => {
  it("strain gauge has digital output", () => {
    expect(digitalOutput("strain_gauge_lc")).toBe(true);
  });
  it("hydraulic no digital output", () => {
    expect(digitalOutput("hydraulic_lc")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("hydraulic for high temp", () => {
    expect(forHighTemp("hydraulic_lc")).toBe(true);
  });
  it("strain gauge not for high temp", () => {
    expect(forHighTemp("strain_gauge_lc")).toBe(false);
  });
});

describe("cellConfig", () => {
  it("piezoelectric uses quartz crystal charge dynamic fast response", () => {
    expect(cellConfig("piezoelectric_lc")).toBe("piezoelectric_load_cell_quartz_crystal_charge_dynamic_fast_response");
  });
});

describe("bestUse", () => {
  it("capacitive for laboratory ultra precise micro force measure", () => {
    expect(bestUse("capacitive_lc")).toBe("laboratory_capacitive_load_cell_ultra_precise_micro_force_measure");
  });
});

describe("loadCellTypes", () => {
  it("returns 5 types", () => {
    expect(loadCellTypes()).toHaveLength(5);
  });
});
