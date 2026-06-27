import { describe, it, expect } from "vitest";
import {
  coverage, efficiency, uniformity, durability,
  cpCost, gps, forLargeField, sprinkler,
  bestUse, centerPivotTypes,
} from "../center-pivot-calc.js";

describe("coverage", () => {
  it("corner arm best coverage", () => {
    expect(coverage("corner_arm_attachment")).toBeGreaterThan(coverage("towable_lateral_move"));
  });
});

describe("efficiency", () => {
  it("lepa most efficient", () => {
    expect(efficiency("low_pressure_lepa_drop")).toBeGreaterThan(efficiency("hydraulic_oil_drive"));
  });
});

describe("uniformity", () => {
  it("towable best uniformity", () => {
    expect(uniformity("towable_lateral_move")).toBeGreaterThan(uniformity("standard_electric_drive"));
  });
});

describe("durability", () => {
  it("hydraulic most durable", () => {
    expect(durability("hydraulic_oil_drive")).toBeGreaterThan(durability("towable_lateral_move"));
  });
});

describe("cpCost", () => {
  it("corner arm most expensive", () => {
    expect(cpCost("corner_arm_attachment")).toBeGreaterThan(cpCost("towable_lateral_move"));
  });
});

describe("gps", () => {
  it("standard has gps", () => {
    expect(gps("standard_electric_drive")).toBe(true);
  });
  it("towable no gps", () => {
    expect(gps("towable_lateral_move")).toBe(false);
  });
});

describe("forLargeField", () => {
  it("standard for large field", () => {
    expect(forLargeField("standard_electric_drive")).toBe(true);
  });
  it("towable not large field", () => {
    expect(forLargeField("towable_lateral_move")).toBe(false);
  });
});

describe("sprinkler", () => {
  it("lepa uses drop nozzle", () => {
    expect(sprinkler("low_pressure_lepa_drop")).toBe("low_energy_precision_drop_nozzle");
  });
});

describe("bestUse", () => {
  it("corner arm for square field", () => {
    expect(bestUse("corner_arm_attachment")).toBe("maximize_square_field_coverage");
  });
});

describe("centerPivotTypes", () => {
  it("returns 5 types", () => {
    expect(centerPivotTypes()).toHaveLength(5);
  });
});
