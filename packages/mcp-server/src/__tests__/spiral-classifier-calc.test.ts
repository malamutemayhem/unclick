import { describe, it, expect } from "vitest";
import {
  cutPoint, capacity, sandRecovery, reliability,
  scCost, submerged, forCoarse, spiral,
  bestUse, spiralClassifierTypes,
} from "../spiral-classifier-calc.js";

describe("cutPoint", () => {
  it("submerged spiral finest cut point", () => {
    expect(cutPoint("submerged_spiral_fine")).toBeGreaterThan(cutPoint("low_weir_dewater"));
  });
});

describe("capacity", () => {
  it("double spiral highest capacity", () => {
    expect(capacity("double_spiral_high_cap")).toBeGreaterThan(capacity("submerged_spiral_fine"));
  });
});

describe("sandRecovery", () => {
  it("low weir best sand recovery", () => {
    expect(sandRecovery("low_weir_dewater")).toBeGreaterThan(sandRecovery("submerged_spiral_fine"));
  });
});

describe("reliability", () => {
  it("single spiral most reliable", () => {
    expect(reliability("single_spiral_standard")).toBeGreaterThan(reliability("low_weir_dewater"));
  });
});

describe("scCost", () => {
  it("double spiral most expensive", () => {
    expect(scCost("double_spiral_high_cap")).toBeGreaterThan(scCost("low_weir_dewater"));
  });
});

describe("submerged", () => {
  it("submerged spiral is submerged", () => {
    expect(submerged("submerged_spiral_fine")).toBe(true);
  });
  it("single spiral not submerged", () => {
    expect(submerged("single_spiral_standard")).toBe(false);
  });
});

describe("forCoarse", () => {
  it("high weir for coarse", () => {
    expect(forCoarse("high_weir_coarse_cut")).toBe(true);
  });
  it("submerged spiral not for coarse", () => {
    expect(forCoarse("submerged_spiral_fine")).toBe(false);
  });
});

describe("spiral", () => {
  it("double spiral uses twin screw parallel", () => {
    expect(spiral("double_spiral_high_cap")).toBe("twin_screw_parallel_high_tonnage");
  });
});

describe("bestUse", () => {
  it("low weir for sand dewatering", () => {
    expect(bestUse("low_weir_dewater")).toBe("sand_dewatering_maximum_moisture_remove");
  });
});

describe("spiralClassifierTypes", () => {
  it("returns 5 types", () => {
    expect(spiralClassifierTypes()).toHaveLength(5);
  });
});
