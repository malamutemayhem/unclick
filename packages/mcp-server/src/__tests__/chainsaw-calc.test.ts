import { describe, it, expect } from "vitest";
import {
  cuttingPower, barLengthInches, weightScore, safetyRating,
  sawCost, kickbackBrake, toolFree, chainDesign,
  bestTask, chainsaws,
} from "../chainsaw-calc.js";

describe("cuttingPower", () => {
  it("gas professional strongest cutting", () => {
    expect(cuttingPower("gas_professional")).toBeGreaterThan(cuttingPower("pole_saw"));
  });
});

describe("barLengthInches", () => {
  it("gas professional longest bar", () => {
    expect(barLengthInches("gas_professional")).toBeGreaterThan(barLengthInches("pole_saw"));
  });
});

describe("weightScore", () => {
  it("gas professional heaviest", () => {
    expect(weightScore("gas_professional")).toBeGreaterThan(weightScore("top_handle_arborist"));
  });
});

describe("safetyRating", () => {
  it("electric corded safest", () => {
    expect(safetyRating("electric_corded")).toBeGreaterThan(safetyRating("top_handle_arborist"));
  });
});

describe("sawCost", () => {
  it("gas professional most expensive", () => {
    expect(sawCost("gas_professional")).toBeGreaterThan(sawCost("electric_corded"));
  });
});

describe("kickbackBrake", () => {
  it("all have kickback brake", () => {
    expect(kickbackBrake("gas_professional")).toBe(true);
    expect(kickbackBrake("battery_cordless")).toBe(true);
  });
});

describe("toolFree", () => {
  it("battery cordless is tool free", () => {
    expect(toolFree("battery_cordless")).toBe(true);
  });
  it("gas professional is not", () => {
    expect(toolFree("gas_professional")).toBe(false);
  });
});

describe("chainDesign", () => {
  it("pole saw uses narrow kerf pruning", () => {
    expect(chainDesign("pole_saw")).toBe("narrow_kerf_pruning");
  });
});

describe("bestTask", () => {
  it("gas professional for felling large hardwood", () => {
    expect(bestTask("gas_professional")).toBe("felling_large_hardwood");
  });
});

describe("chainsaws", () => {
  it("returns 5 types", () => {
    expect(chainsaws()).toHaveLength(5);
  });
});
