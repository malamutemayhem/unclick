import { describe, it, expect } from "vitest";
import {
  granuleUniformity, throughput, densityControl, bindingEfficiency,
  gpCost, continuous, forDry, granulatorConfig,
  bestUse, granulatorPharmaTypes,
} from "../granulator-pharma-calc.js";

describe("granuleUniformity", () => {
  it("high shear wet best granule uniformity", () => {
    expect(granuleUniformity("high_shear_wet")).toBeGreaterThan(granuleUniformity("oscillating_granulate"));
  });
});

describe("throughput", () => {
  it("twin screw granulate highest throughput", () => {
    expect(throughput("twin_screw_granulate")).toBeGreaterThan(throughput("oscillating_granulate"));
  });
});

describe("densityControl", () => {
  it("roller compactor best density control", () => {
    expect(densityControl("roller_compactor")).toBeGreaterThan(densityControl("oscillating_granulate"));
  });
});

describe("bindingEfficiency", () => {
  it("high shear wet best binding efficiency", () => {
    expect(bindingEfficiency("high_shear_wet")).toBeGreaterThan(bindingEfficiency("roller_compactor"));
  });
});

describe("gpCost", () => {
  it("twin screw granulate most expensive", () => {
    expect(gpCost("twin_screw_granulate")).toBeGreaterThan(gpCost("oscillating_granulate"));
  });
});

describe("continuous", () => {
  it("roller compactor is continuous", () => {
    expect(continuous("roller_compactor")).toBe(true);
  });
  it("high shear wet not continuous", () => {
    expect(continuous("high_shear_wet")).toBe(false);
  });
});

describe("forDry", () => {
  it("roller compactor for dry granulation", () => {
    expect(forDry("roller_compactor")).toBe(true);
  });
  it("high shear wet not for dry", () => {
    expect(forDry("high_shear_wet")).toBe(false);
  });
});

describe("granulatorConfig", () => {
  it("twin screw uses continuous feed knead granulate inline", () => {
    expect(granulatorConfig("twin_screw_granulate")).toBe("twin_screw_granulator_continuous_feed_knead_granulate_inline");
  });
});

describe("bestUse", () => {
  it("roller compactor for pharma moisture sensitive dry granulation api", () => {
    expect(bestUse("roller_compactor")).toBe("pharma_moisture_sensitive_roller_compactor_dry_granulation_api");
  });
});

describe("granulatorPharmaTypes", () => {
  it("returns 5 types", () => {
    expect(granulatorPharmaTypes()).toHaveLength(5);
  });
});
