import { describe, it, expect } from "vitest";
import {
  lowFreqPerf, highFreqPerf, loopArea, safetyCompliance,
  grCost, scalable, forMixedSignal, topology,
  bestUse, groundings,
} from "../grounding-calc.js";

describe("lowFreqPerf", () => {
  it("single point star best low freq", () => {
    expect(lowFreqPerf("single_point_star")).toBeGreaterThan(lowFreqPerf("multi_point_mesh"));
  });
});

describe("highFreqPerf", () => {
  it("multi point mesh best high freq", () => {
    expect(highFreqPerf("multi_point_mesh")).toBeGreaterThan(highFreqPerf("single_point_star"));
  });
});

describe("loopArea", () => {
  it("isolated floating smallest loop area", () => {
    expect(loopArea("isolated_floating_ref")).toBeGreaterThan(loopArea("chassis_bond_strap"));
  });
});

describe("safetyCompliance", () => {
  it("chassis bond strap best safety", () => {
    expect(safetyCompliance("chassis_bond_strap")).toBeGreaterThan(safetyCompliance("single_point_star"));
  });
});

describe("grCost", () => {
  it("isolated floating most expensive", () => {
    expect(grCost("isolated_floating_ref")).toBeGreaterThan(grCost("chassis_bond_strap"));
  });
});

describe("scalable", () => {
  it("multi point mesh is scalable", () => {
    expect(scalable("multi_point_mesh")).toBe(true);
  });
  it("single point star not scalable", () => {
    expect(scalable("single_point_star")).toBe(false);
  });
});

describe("forMixedSignal", () => {
  it("hybrid frequency for mixed signal", () => {
    expect(forMixedSignal("hybrid_frequency_split")).toBe(true);
  });
  it("multi point mesh not for mixed signal", () => {
    expect(forMixedSignal("multi_point_mesh")).toBe(false);
  });
});

describe("topology", () => {
  it("isolated floating uses galvanic isolated barrier", () => {
    expect(topology("isolated_floating_ref")).toBe("galvanic_isolated_barrier");
  });
});

describe("bestUse", () => {
  it("hybrid frequency best for mixed signal adc", () => {
    expect(bestUse("hybrid_frequency_split")).toBe("mixed_signal_adc_partition");
  });
});

describe("groundings", () => {
  it("returns 5 types", () => {
    expect(groundings()).toHaveLength(5);
  });
});
