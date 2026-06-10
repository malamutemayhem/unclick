import { describe, it, expect } from "vitest";
import {
  stuffReach, controlMove, fabricSafe, versatility,
  needleCost, curved, doubleEnd, gaugeSize,
  bestUse, regulatorNeedles,
} from "../regulator-needle-calc.js";

describe("stuffReach", () => {
  it("mattress heavy gauge longest reach", () => {
    expect(stuffReach("mattress_heavy_gauge")).toBeGreaterThan(stuffReach("buttoning_loop_pull"));
  });
});

describe("controlMove", () => {
  it("bent tip angle best control", () => {
    expect(controlMove("bent_tip_angle")).toBeGreaterThan(controlMove("mattress_heavy_gauge"));
  });
});

describe("fabricSafe", () => {
  it("buttoning loop pull safest for fabric", () => {
    expect(fabricSafe("buttoning_loop_pull")).toBeGreaterThan(fabricSafe("mattress_heavy_gauge"));
  });
});

describe("versatility", () => {
  it("double point through most versatile", () => {
    expect(versatility("double_point_through")).toBeGreaterThan(versatility("buttoning_loop_pull"));
  });
});

describe("needleCost", () => {
  it("mattress heavy gauge most expensive", () => {
    expect(needleCost("mattress_heavy_gauge")).toBeGreaterThan(needleCost("straight_long_reach"));
  });
});

describe("curved", () => {
  it("bent tip angle is curved", () => {
    expect(curved("bent_tip_angle")).toBe(true);
  });
  it("straight long reach not curved", () => {
    expect(curved("straight_long_reach")).toBe(false);
  });
});

describe("doubleEnd", () => {
  it("double point through is double end", () => {
    expect(doubleEnd("double_point_through")).toBe(true);
  });
  it("straight long reach not double end", () => {
    expect(doubleEnd("straight_long_reach")).toBe(false);
  });
});

describe("gaugeSize", () => {
  it("mattress heavy gauge uses sixteen inch heavy", () => {
    expect(gaugeSize("mattress_heavy_gauge")).toBe("sixteen_inch_heavy");
  });
});

describe("bestUse", () => {
  it("bent tip angle best for edge roll shape", () => {
    expect(bestUse("bent_tip_angle")).toBe("edge_roll_shape");
  });
});

describe("regulatorNeedles", () => {
  it("returns 5 types", () => {
    expect(regulatorNeedles()).toHaveLength(5);
  });
});
