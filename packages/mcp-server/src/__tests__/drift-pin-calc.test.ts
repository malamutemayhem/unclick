import { describe, it, expect } from "vitest";
import {
  alignForce, holdStrength, driveEase, corrosionResist,
  pinCost, tapered, forMarine, pinMaterial,
  bestUse, driftPins,
} from "../drift-pin-calc.js";

describe("alignForce", () => {
  it("tapered align draw best alignment", () => {
    expect(alignForce("tapered_align_draw")).toBeGreaterThan(alignForce("hardwood_treenail_peg"));
  });
});

describe("holdStrength", () => {
  it("threaded bolt lock strongest hold", () => {
    expect(holdStrength("threaded_bolt_lock")).toBeGreaterThan(holdStrength("hardwood_treenail_peg"));
  });
});

describe("driveEase", () => {
  it("hardwood treenail peg easiest drive", () => {
    expect(driveEase("hardwood_treenail_peg")).toBeGreaterThan(driveEase("threaded_bolt_lock"));
  });
});

describe("corrosionResist", () => {
  it("copper marine resist best corrosion resistance", () => {
    expect(corrosionResist("copper_marine_resist")).toBeGreaterThan(corrosionResist("steel_round_standard"));
  });
});

describe("pinCost", () => {
  it("copper marine resist most expensive", () => {
    expect(pinCost("copper_marine_resist")).toBeGreaterThan(pinCost("hardwood_treenail_peg"));
  });
});

describe("tapered", () => {
  it("tapered align draw is tapered", () => {
    expect(tapered("tapered_align_draw")).toBe(true);
  });
  it("steel round standard not tapered", () => {
    expect(tapered("steel_round_standard")).toBe(false);
  });
});

describe("forMarine", () => {
  it("copper marine resist is for marine", () => {
    expect(forMarine("copper_marine_resist")).toBe(true);
  });
  it("steel round standard not for marine", () => {
    expect(forMarine("steel_round_standard")).toBe(false);
  });
});

describe("pinMaterial", () => {
  it("hardwood treenail peg uses locust wood peg", () => {
    expect(pinMaterial("hardwood_treenail_peg")).toBe("locust_wood_peg");
  });
});

describe("bestUse", () => {
  it("threaded bolt lock best for permanent joint lock", () => {
    expect(bestUse("threaded_bolt_lock")).toBe("permanent_joint_lock");
  });
});

describe("driftPins", () => {
  it("returns 5 types", () => {
    expect(driftPins()).toHaveLength(5);
  });
});
