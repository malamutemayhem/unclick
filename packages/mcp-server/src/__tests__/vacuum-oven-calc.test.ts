import { describe, it, expect } from "vitest";
import {
  uniformity, throughput, gentleness, vacuumLevel,
  voCost, continuous, forLab, heating,
  bestUse, vacuumOvenTypes,
} from "../vacuum-oven-calc.js";

describe("uniformity", () => {
  it("conical screw most uniform", () => {
    expect(uniformity("conical_screw_pharma")).toBeGreaterThan(uniformity("belt_continuous_thin"));
  });
});

describe("throughput", () => {
  it("belt continuous highest throughput", () => {
    expect(throughput("belt_continuous_thin")).toBeGreaterThan(throughput("shelf_batch_lab"));
  });
});

describe("gentleness", () => {
  it("microwave vacuum gentlest", () => {
    expect(gentleness("microwave_vacuum_rapid")).toBeGreaterThan(gentleness("tumble_rotary_bulk"));
  });
});

describe("vacuumLevel", () => {
  it("shelf batch deepest vacuum", () => {
    expect(vacuumLevel("shelf_batch_lab")).toBeGreaterThan(vacuumLevel("belt_continuous_thin"));
  });
});

describe("voCost", () => {
  it("microwave vacuum most expensive", () => {
    expect(voCost("microwave_vacuum_rapid")).toBeGreaterThan(voCost("shelf_batch_lab"));
  });
});

describe("continuous", () => {
  it("belt continuous is continuous", () => {
    expect(continuous("belt_continuous_thin")).toBe(true);
  });
  it("shelf batch not continuous", () => {
    expect(continuous("shelf_batch_lab")).toBe(false);
  });
});

describe("forLab", () => {
  it("shelf batch for lab", () => {
    expect(forLab("shelf_batch_lab")).toBe(true);
  });
  it("conical screw not for lab", () => {
    expect(forLab("conical_screw_pharma")).toBe(false);
  });
});

describe("heating", () => {
  it("microwave vacuum uses volumetric chamber", () => {
    expect(heating("microwave_vacuum_rapid")).toBe("microwave_volumetric_vacuum_chamber");
  });
});

describe("bestUse", () => {
  it("conical screw for pharma api", () => {
    expect(bestUse("conical_screw_pharma")).toBe("pharma_api_fine_chemical_gmp");
  });
});

describe("vacuumOvenTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumOvenTypes()).toHaveLength(5);
  });
});
