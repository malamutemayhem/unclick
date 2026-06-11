import { describe, it, expect } from "vitest";
import {
  efficiency, outputRipple, loadRange, inputRange,
  convCost, isolated, forBattery, topology,
  bestUse, dcDcConvs,
} from "../dc-dc-conv-calc.js";

describe("efficiency", () => {
  it("buck step down best efficiency", () => {
    expect(efficiency("buck_step_down")).toBeGreaterThan(efficiency("isolated_flyback"));
  });
});

describe("outputRipple", () => {
  it("buck step down best output ripple", () => {
    expect(outputRipple("buck_step_down")).toBeGreaterThan(outputRipple("isolated_flyback"));
  });
});

describe("loadRange", () => {
  it("buck step down widest load range", () => {
    expect(loadRange("buck_step_down")).toBeGreaterThan(loadRange("charge_pump_cap"));
  });
});

describe("inputRange", () => {
  it("buck boost invert widest input range", () => {
    expect(inputRange("buck_boost_invert")).toBeGreaterThan(inputRange("charge_pump_cap"));
  });
});

describe("convCost", () => {
  it("isolated flyback most expensive", () => {
    expect(convCost("isolated_flyback")).toBeGreaterThan(convCost("charge_pump_cap"));
  });
});

describe("isolated", () => {
  it("isolated flyback is isolated", () => {
    expect(isolated("isolated_flyback")).toBe(true);
  });
  it("buck step down not isolated", () => {
    expect(isolated("buck_step_down")).toBe(false);
  });
});

describe("forBattery", () => {
  it("buck step down is for battery", () => {
    expect(forBattery("buck_step_down")).toBe(true);
  });
  it("isolated flyback not for battery", () => {
    expect(forBattery("isolated_flyback")).toBe(false);
  });
});

describe("topology", () => {
  it("charge pump cap uses switched capacitor mult", () => {
    expect(topology("charge_pump_cap")).toBe("switched_capacitor_mult");
  });
});

describe("bestUse", () => {
  it("buck step down best for point of load digital", () => {
    expect(bestUse("buck_step_down")).toBe("point_of_load_digital");
  });
});

describe("dcDcConvs", () => {
  it("returns 5 types", () => {
    expect(dcDcConvs()).toHaveLength(5);
  });
});
