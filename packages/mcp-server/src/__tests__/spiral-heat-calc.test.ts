import { describe, it, expect } from "vitest";
import {
  efficiency, foulingResist, pressure, compactness,
  shCost, selfCleaning, forSlurry, flow,
  bestUse, spiralHeatTypes,
} from "../spiral-heat-calc.js";

describe("efficiency", () => {
  it("type 1 highest efficiency", () => {
    expect(efficiency("type_1_both_spiral")).toBeGreaterThan(efficiency("type_2_one_crossflow"));
  });
});

describe("foulingResist", () => {
  it("self cleaning best fouling resist", () => {
    expect(foulingResist("self_cleaning_fouling")).toBeGreaterThan(foulingResist("type_3_condenser"));
  });
});

describe("pressure", () => {
  it("welded highest pressure", () => {
    expect(pressure("welded_high_pressure")).toBeGreaterThan(pressure("type_3_condenser"));
  });
});

describe("compactness", () => {
  it("type 1 most compact", () => {
    expect(compactness("type_1_both_spiral")).toBeGreaterThan(compactness("welded_high_pressure"));
  });
});

describe("shCost", () => {
  it("welded most expensive", () => {
    expect(shCost("welded_high_pressure")).toBeGreaterThan(shCost("type_2_one_crossflow"));
  });
});

describe("selfCleaning", () => {
  it("type 1 is self cleaning", () => {
    expect(selfCleaning("type_1_both_spiral")).toBe(true);
  });
  it("type 2 not self cleaning", () => {
    expect(selfCleaning("type_2_one_crossflow")).toBe(false);
  });
});

describe("forSlurry", () => {
  it("type 1 for slurry", () => {
    expect(forSlurry("type_1_both_spiral")).toBe(true);
  });
  it("type 2 not slurry", () => {
    expect(forSlurry("type_2_one_crossflow")).toBe(false);
  });
});

describe("flow", () => {
  it("type 3 uses vapor center", () => {
    expect(flow("type_3_condenser")).toBe("vapor_in_center_condensate_spiral");
  });
});

describe("bestUse", () => {
  it("welded for refinery", () => {
    expect(bestUse("welded_high_pressure")).toBe("refinery_high_pressure_process");
  });
});

describe("spiralHeatTypes", () => {
  it("returns 5 types", () => {
    expect(spiralHeatTypes()).toHaveLength(5);
  });
});
