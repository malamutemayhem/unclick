import { describe, it, expect } from "vitest";
import {
  placementSpeed, placementAccuracy, bondStrength, thermalPerformance,
  dbCost, fluxless, forPower, bonderConfig,
  bestUse, dieBonderTypes,
} from "../die-bonder-calc.js";

describe("placementSpeed", () => {
  it("uv adhesive fastest placement speed", () => {
    expect(placementSpeed("uv_adhesive")).toBeGreaterThan(placementSpeed("thermocompression"));
  });
});

describe("placementAccuracy", () => {
  it("thermocompression best placement accuracy", () => {
    expect(placementAccuracy("thermocompression")).toBeGreaterThan(placementAccuracy("epoxy_die_attach"));
  });
});

describe("bondStrength", () => {
  it("eutectic solder strongest bond", () => {
    expect(bondStrength("eutectic_solder")).toBeGreaterThan(bondStrength("uv_adhesive"));
  });
});

describe("thermalPerformance", () => {
  it("eutectic solder best thermal performance", () => {
    expect(thermalPerformance("eutectic_solder")).toBeGreaterThan(thermalPerformance("uv_adhesive"));
  });
});

describe("dbCost", () => {
  it("thermocompression most expensive", () => {
    expect(dbCost("thermocompression")).toBeGreaterThan(dbCost("uv_adhesive"));
  });
});

describe("fluxless", () => {
  it("epoxy die attach is fluxless", () => {
    expect(fluxless("epoxy_die_attach")).toBe(true);
  });
  it("eutectic solder not fluxless", () => {
    expect(fluxless("eutectic_solder")).toBe(false);
  });
});

describe("forPower", () => {
  it("eutectic solder for power devices", () => {
    expect(forPower("eutectic_solder")).toBe(true);
  });
  it("epoxy die attach not for power", () => {
    expect(forPower("epoxy_die_attach")).toBe(false);
  });
});

describe("bonderConfig", () => {
  it("flip chip uses solder ball underfill", () => {
    expect(bonderConfig("flip_chip")).toBe("flip_chip_bump_bond_solder_ball_underfill_high_io_processor");
  });
});

describe("bestUse", () => {
  it("thermocompression for fine pitch 3d stack", () => {
    expect(bestUse("thermocompression")).toBe("fine_pitch_3d_stack_hbm_memory_thermocompression_copper_pillar");
  });
});

describe("dieBonderTypes", () => {
  it("returns 5 types", () => {
    expect(dieBonderTypes()).toHaveLength(5);
  });
});
