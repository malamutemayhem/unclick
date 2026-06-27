import { describe, it, expect } from "vitest";
import {
  extinguishSpeed, coverage, environmentalImpact, reignitionProtect,
  fsCost, cleanAgent, forEnclosed, agent,
  bestUse, fireSuppressionTypes,
} from "../fire-suppression-calc.js";

describe("extinguishSpeed", () => {
  it("dry chemical fastest extinguish", () => {
    expect(extinguishSpeed("dry_chemical")).toBeGreaterThan(extinguishSpeed("water_mist"));
  });
});

describe("coverage", () => {
  it("foam afff widest coverage", () => {
    expect(coverage("foam_afff")).toBeGreaterThan(coverage("dry_chemical"));
  });
});

describe("environmentalImpact", () => {
  it("water mist best environmental impact", () => {
    expect(environmentalImpact("water_mist")).toBeGreaterThan(environmentalImpact("foam_afff"));
  });
});

describe("reignitionProtect", () => {
  it("foam afff best reignition protection", () => {
    expect(reignitionProtect("foam_afff")).toBeGreaterThan(reignitionProtect("dry_chemical"));
  });
});

describe("fsCost", () => {
  it("inert gas most expensive", () => {
    expect(fsCost("inert_gas_ig55")).toBeGreaterThan(fsCost("dry_chemical"));
  });
});

describe("cleanAgent", () => {
  it("co2 total flood is clean agent", () => {
    expect(cleanAgent("co2_total_flood")).toBe(true);
  });
  it("foam afff not clean agent", () => {
    expect(cleanAgent("foam_afff")).toBe(false);
  });
});

describe("forEnclosed", () => {
  it("co2 total flood for enclosed", () => {
    expect(forEnclosed("co2_total_flood")).toBe(true);
  });
  it("dry chemical not for enclosed", () => {
    expect(forEnclosed("dry_chemical")).toBe(false);
  });
});

describe("agent", () => {
  it("inert gas ig55 uses argon nitrogen blend", () => {
    expect(agent("inert_gas_ig55")).toBe("argon_nitrogen_blend_ig55_oxygen_reduction_no_residue");
  });
});

describe("bestUse", () => {
  it("foam afff for flight deck", () => {
    expect(bestUse("foam_afff")).toBe("flight_deck_helideck_fuel_tank_top_flammable_liquid_fire");
  });
});

describe("fireSuppressionTypes", () => {
  it("returns 5 types", () => {
    expect(fireSuppressionTypes()).toHaveLength(5);
  });
});
