import { describe, it, expect } from "vitest";
import {
  gainBandwidth, inputOffset, slew, noise,
  opampCost, autoZero, forPrecision, inputStage,
  bestUse, opampTopologies,
} from "../opamp-topology-calc.js";

describe("gainBandwidth", () => {
  it("fully differential highest gain bandwidth", () => {
    expect(gainBandwidth("fully_differential")).toBeGreaterThan(gainBandwidth("rail_to_rail_io"));
  });
});

describe("inputOffset", () => {
  it("chopper stabilized best input offset", () => {
    expect(inputOffset("chopper_stabilized")).toBeGreaterThan(inputOffset("two_stage_miller"));
  });
});

describe("slew", () => {
  it("fully differential highest slew", () => {
    expect(slew("fully_differential")).toBeGreaterThan(slew("chopper_stabilized"));
  });
});

describe("noise", () => {
  it("chopper stabilized lowest noise", () => {
    expect(noise("chopper_stabilized")).toBeGreaterThan(noise("rail_to_rail_io"));
  });
});

describe("opampCost", () => {
  it("chopper stabilized most expensive", () => {
    expect(opampCost("chopper_stabilized")).toBeGreaterThan(opampCost("two_stage_miller"));
  });
});

describe("autoZero", () => {
  it("chopper stabilized is auto zero", () => {
    expect(autoZero("chopper_stabilized")).toBe(true);
  });
  it("folded cascode not auto zero", () => {
    expect(autoZero("folded_cascode")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("chopper stabilized is for precision", () => {
    expect(forPrecision("chopper_stabilized")).toBe(true);
  });
  it("two stage miller not for precision", () => {
    expect(forPrecision("two_stage_miller")).toBe(false);
  });
});

describe("inputStage", () => {
  it("fully differential uses diff in diff out", () => {
    expect(inputStage("fully_differential")).toBe("diff_in_diff_out");
  });
});

describe("bestUse", () => {
  it("folded cascode best for pipeline adc residue", () => {
    expect(bestUse("folded_cascode")).toBe("pipeline_adc_residue");
  });
});

describe("opampTopologies", () => {
  it("returns 5 types", () => {
    expect(opampTopologies()).toHaveLength(5);
  });
});
