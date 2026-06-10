import { describe, it, expect } from "vitest";
import {
  captureRate, humaneness, safetyAroundPets, reusability,
  unitCost, requiresChemical, preventative, mechanism,
  bestScenario, rodentControls,
} from "../rodent-control-calc.js";

describe("captureRate", () => {
  it("electronic trap highest capture rate", () => {
    expect(captureRate("electronic_trap")).toBeGreaterThan(captureRate("glue_board"));
  });
});

describe("humaneness", () => {
  it("exclusion seal most humane", () => {
    expect(humaneness("exclusion_seal")).toBeGreaterThan(humaneness("glue_board"));
  });
});

describe("safetyAroundPets", () => {
  it("exclusion seal safest around pets", () => {
    expect(safetyAroundPets("exclusion_seal")).toBeGreaterThan(safetyAroundPets("glue_board"));
  });
});

describe("reusability", () => {
  it("electronic trap most reusable", () => {
    expect(reusability("electronic_trap")).toBeGreaterThan(reusability("glue_board"));
  });
});

describe("unitCost", () => {
  it("exclusion seal most expensive", () => {
    expect(unitCost("exclusion_seal")).toBeGreaterThan(unitCost("glue_board"));
  });
});

describe("requiresChemical", () => {
  it("bait station requires chemical", () => {
    expect(requiresChemical("bait_station")).toBe(true);
  });
  it("snap trap does not", () => {
    expect(requiresChemical("snap_trap")).toBe(false);
  });
});

describe("preventative", () => {
  it("exclusion seal is preventative", () => {
    expect(preventative("exclusion_seal")).toBe(true);
  });
  it("snap trap is not", () => {
    expect(preventative("snap_trap")).toBe(false);
  });
});

describe("mechanism", () => {
  it("electronic trap uses high voltage shock plate", () => {
    expect(mechanism("electronic_trap")).toBe("high_voltage_shock_plate");
  });
});

describe("bestScenario", () => {
  it("exclusion seal for prevention entry point seal", () => {
    expect(bestScenario("exclusion_seal")).toBe("prevention_entry_point_seal");
  });
});

describe("rodentControls", () => {
  it("returns 5 control types", () => {
    expect(rodentControls()).toHaveLength(5);
  });
});
