import { describe, it, expect } from "vitest";
import {
  coupling, directivity, bandwidth, isolation,
  cpCost, balanced, forMeasurement, structure,
  bestUse, rfCouplers,
} from "../rf-coupler-calc.js";

describe("coupling", () => {
  it("lange interdigital strongest coupling", () => {
    expect(coupling("lange_interdigital")).toBeGreaterThan(coupling("wilkinson_divider"));
  });
});

describe("directivity", () => {
  it("lange interdigital best directivity", () => {
    expect(directivity("lange_interdigital")).toBeGreaterThan(directivity("wilkinson_divider"));
  });
});

describe("bandwidth", () => {
  it("lange interdigital widest bandwidth", () => {
    expect(bandwidth("lange_interdigital")).toBeGreaterThan(bandwidth("rat_race_180"));
  });
});

describe("isolation", () => {
  it("wilkinson divider best isolation", () => {
    expect(isolation("wilkinson_divider")).toBeGreaterThan(isolation("lange_interdigital"));
  });
});

describe("cpCost", () => {
  it("lange interdigital most expensive", () => {
    expect(cpCost("lange_interdigital")).toBeGreaterThan(cpCost("wilkinson_divider"));
  });
});

describe("balanced", () => {
  it("hybrid 90 degree is balanced", () => {
    expect(balanced("hybrid_90_degree")).toBe(true);
  });
  it("directional branch not balanced", () => {
    expect(balanced("directional_branch")).toBe(false);
  });
});

describe("forMeasurement", () => {
  it("directional branch for measurement", () => {
    expect(forMeasurement("directional_branch")).toBe(true);
  });
  it("hybrid 90 degree not for measurement", () => {
    expect(forMeasurement("hybrid_90_degree")).toBe(false);
  });
});

describe("structure", () => {
  it("rat race 180 uses ring 3lambda 4 sum diff", () => {
    expect(structure("rat_race_180")).toBe("ring_3lambda_4_sum_diff");
  });
});

describe("bestUse", () => {
  it("wilkinson divider best for equal power split combine", () => {
    expect(bestUse("wilkinson_divider")).toBe("equal_power_split_combine");
  });
});

describe("rfCouplers", () => {
  it("returns 5 types", () => {
    expect(rfCouplers()).toHaveLength(5);
  });
});
