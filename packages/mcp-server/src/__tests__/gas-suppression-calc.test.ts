import { describe, it, expect } from "vitest";
import {
  effectiveness, safetyMargin, envImpact, storageSpace,
  gsCost, occupiedArea, forElectrical, agent,
  bestUse, gasSuppressionTypes,
} from "../gas-suppression-calc.js";

describe("effectiveness", () => {
  it("co2 total flood most effective", () => {
    expect(effectiveness("co2_total_flood")).toBeGreaterThan(effectiveness("aerosol_condensed"));
  });
});

describe("safetyMargin", () => {
  it("inert gas highest safety margin", () => {
    expect(safetyMargin("inert_gas_ig541")).toBeGreaterThan(safetyMargin("co2_total_flood"));
  });
});

describe("envImpact", () => {
  it("inert gas best environmental impact", () => {
    expect(envImpact("inert_gas_ig541")).toBeGreaterThan(envImpact("clean_agent_fm200"));
  });
});

describe("storageSpace", () => {
  it("aerosol condensed best storage space", () => {
    expect(storageSpace("aerosol_condensed")).toBeGreaterThan(storageSpace("inert_gas_ig541"));
  });
});

describe("gsCost", () => {
  it("novec 1230 most expensive", () => {
    expect(gsCost("novec_1230_fk")).toBeGreaterThan(gsCost("co2_total_flood"));
  });
});

describe("occupiedArea", () => {
  it("inert gas safe for occupied areas", () => {
    expect(occupiedArea("inert_gas_ig541")).toBe(true);
  });
  it("co2 not safe for occupied areas", () => {
    expect(occupiedArea("co2_total_flood")).toBe(false);
  });
});

describe("forElectrical", () => {
  it("all gas suppression for electrical", () => {
    expect(forElectrical("clean_agent_fm200")).toBe(true);
    expect(forElectrical("co2_total_flood")).toBe(true);
  });
});

describe("agent", () => {
  it("inert gas uses nitrogen argon co2 blend", () => {
    expect(agent("inert_gas_ig541")).toBe("nitrogen_argon_co2_blend_52_40_8");
  });
});

describe("bestUse", () => {
  it("novec 1230 for data center", () => {
    expect(bestUse("novec_1230_fk")).toBe("data_center_critical_infra_low_gwp_clean");
  });
});

describe("gasSuppressionTypes", () => {
  it("returns 5 types", () => {
    expect(gasSuppressionTypes()).toHaveLength(5);
  });
});
