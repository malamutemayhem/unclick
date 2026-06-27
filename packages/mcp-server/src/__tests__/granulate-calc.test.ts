import { describe, it, expect } from "vitest";
import {
  uniformity, throughput, density, flowability,
  grCost, dryProcess, forPharma, mechanism,
  bestUse, granulateTypes,
} from "../granulate-calc.js";

describe("uniformity", () => {
  it("high shear and twin screw highest uniformity", () => {
    expect(uniformity("high_shear_wet")).toBeGreaterThan(uniformity("pan_granulator_disc"));
  });
});

describe("throughput", () => {
  it("twin screw high throughput", () => {
    expect(throughput("twin_screw_continuous")).toBeGreaterThan(throughput("fluid_bed_top_spray"));
  });
});

describe("density", () => {
  it("roller compaction highest density", () => {
    expect(density("roller_compaction_dry")).toBeGreaterThan(density("fluid_bed_top_spray"));
  });
});

describe("flowability", () => {
  it("fluid bed best flowability", () => {
    expect(flowability("fluid_bed_top_spray")).toBeGreaterThan(flowability("pan_granulator_disc"));
  });
});

describe("grCost", () => {
  it("twin screw most expensive", () => {
    expect(grCost("twin_screw_continuous")).toBeGreaterThan(grCost("pan_granulator_disc"));
  });
});

describe("dryProcess", () => {
  it("roller compaction is dry", () => {
    expect(dryProcess("roller_compaction_dry")).toBe(true);
  });
  it("high shear is not dry", () => {
    expect(dryProcess("high_shear_wet")).toBe(false);
  });
});

describe("forPharma", () => {
  it("high shear for pharma", () => {
    expect(forPharma("high_shear_wet")).toBe(true);
  });
  it("pan granulator not for pharma", () => {
    expect(forPharma("pan_granulator_disc")).toBe(false);
  });
});

describe("mechanism", () => {
  it("pan granulator uses rotating disc", () => {
    expect(mechanism("pan_granulator_disc")).toBe("rotating_disc_spray_tumble_ball");
  });
});

describe("bestUse", () => {
  it("twin screw for continuous pharma", () => {
    expect(bestUse("twin_screw_continuous")).toBe("continuous_pharma_mfg_process_analytic");
  });
});

describe("granulateTypes", () => {
  it("returns 5 types", () => {
    expect(granulateTypes()).toHaveLength(5);
  });
});
