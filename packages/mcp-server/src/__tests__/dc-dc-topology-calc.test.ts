import { describe, it, expect } from "vitest";
import {
  efficiency, regulation, ripple, isolation,
  topCost, synchronous, forBattery, inductor,
  bestUse, dcDcTopologies,
} from "../dc-dc-topology-calc.js";

describe("efficiency", () => {
  it("buck step down highest efficiency", () => {
    expect(efficiency("buck_step_down")).toBeGreaterThan(efficiency("sepic_non_inverting"));
  });
});

describe("regulation", () => {
  it("buck step down best regulation", () => {
    expect(regulation("buck_step_down")).toBeGreaterThan(regulation("flyback_isolated"));
  });
});

describe("ripple", () => {
  it("buck step down lowest ripple", () => {
    expect(ripple("buck_step_down")).toBeGreaterThan(ripple("flyback_isolated"));
  });
});

describe("isolation", () => {
  it("flyback isolated highest isolation", () => {
    expect(isolation("flyback_isolated")).toBeGreaterThan(isolation("buck_step_down"));
  });
});

describe("topCost", () => {
  it("flyback isolated most expensive", () => {
    expect(topCost("flyback_isolated")).toBeGreaterThan(topCost("buck_step_down"));
  });
});

describe("synchronous", () => {
  it("buck step down is synchronous", () => {
    expect(synchronous("buck_step_down")).toBe(true);
  });
  it("flyback isolated not synchronous", () => {
    expect(synchronous("flyback_isolated")).toBe(false);
  });
});

describe("forBattery", () => {
  it("buck step down for battery", () => {
    expect(forBattery("buck_step_down")).toBe(true);
  });
  it("flyback isolated not for battery", () => {
    expect(forBattery("flyback_isolated")).toBe(false);
  });
});

describe("inductor", () => {
  it("flyback isolated uses transformer multi output", () => {
    expect(inductor("flyback_isolated")).toBe("transformer_multi_output");
  });
});

describe("bestUse", () => {
  it("buck step down best for cpu core point of load", () => {
    expect(bestUse("buck_step_down")).toBe("cpu_core_point_of_load");
  });
});

describe("dcDcTopologies", () => {
  it("returns 5 types", () => {
    expect(dcDcTopologies()).toHaveLength(5);
  });
});
