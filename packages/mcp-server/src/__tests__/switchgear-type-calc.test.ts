import { describe, it, expect } from "vitest";
import {
  voltage, compactness, reliability, maintenance,
  swCost, gasSealed, forUrban, insulation,
  bestUse, switchgearTypes,
} from "../switchgear-type-calc.js";

describe("voltage", () => {
  it("air insulated highest voltage", () => {
    expect(voltage("air_insulated_ais")).toBeGreaterThanOrEqual(voltage("pad_mount_underground"));
  });
});

describe("compactness", () => {
  it("gas insulated most compact", () => {
    expect(compactness("gas_insulated_gis")).toBeGreaterThan(compactness("air_insulated_ais"));
  });
});

describe("reliability", () => {
  it("gas insulated most reliable", () => {
    expect(reliability("gas_insulated_gis")).toBeGreaterThan(reliability("air_insulated_ais"));
  });
});

describe("maintenance", () => {
  it("ring main unit low maintenance", () => {
    expect(maintenance("ring_main_unit_rmu")).toBeGreaterThan(maintenance("air_insulated_ais"));
  });
});

describe("swCost", () => {
  it("gas insulated most expensive", () => {
    expect(swCost("gas_insulated_gis")).toBeGreaterThan(swCost("pad_mount_underground"));
  });
});

describe("gasSealed", () => {
  it("gas insulated is gas sealed", () => {
    expect(gasSealed("gas_insulated_gis")).toBe(true);
  });
  it("air insulated not gas sealed", () => {
    expect(gasSealed("air_insulated_ais")).toBe(false);
  });
});

describe("forUrban", () => {
  it("gas insulated for urban", () => {
    expect(forUrban("gas_insulated_gis")).toBe(true);
  });
  it("air insulated not for urban", () => {
    expect(forUrban("air_insulated_ais")).toBe(false);
  });
});

describe("insulation", () => {
  it("ring main unit uses sf6 or solid", () => {
    expect(insulation("ring_main_unit_rmu")).toBe("sf6_or_solid_insulated");
  });
});

describe("bestUse", () => {
  it("metal clad best for industrial switchroom", () => {
    expect(bestUse("metal_clad_drawout")).toBe("industrial_plant_main_switchroom");
  });
});

describe("switchgearTypes", () => {
  it("returns 5 types", () => {
    expect(switchgearTypes()).toHaveLength(5);
  });
});
