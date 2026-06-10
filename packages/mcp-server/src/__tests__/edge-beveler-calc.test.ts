import { describe, it, expect } from "vitest";
import {
  cutQuality, speedOutput, controlFeel, edgeFinish,
  bevelerCost, needsPower, beginnerSafe, bladeGeometry,
  bestLeather, edgeBevelers,
} from "../edge-beveler-calc.js";

describe("cutQuality", () => {
  it("micro bevel fine best cut quality", () => {
    expect(cutQuality("micro_bevel_fine")).toBeGreaterThan(cutQuality("safety_beveler_guard"));
  });
});

describe("speedOutput", () => {
  it("power rotary bevel fastest speed", () => {
    expect(speedOutput("power_rotary_bevel")).toBeGreaterThan(speedOutput("micro_bevel_fine"));
  });
});

describe("controlFeel", () => {
  it("safety beveler guard best control", () => {
    expect(controlFeel("safety_beveler_guard")).toBeGreaterThan(controlFeel("power_rotary_bevel"));
  });
});

describe("edgeFinish", () => {
  it("micro bevel fine best edge finish", () => {
    expect(edgeFinish("micro_bevel_fine")).toBeGreaterThan(edgeFinish("power_rotary_bevel"));
  });
});

describe("bevelerCost", () => {
  it("power rotary bevel most expensive", () => {
    expect(bevelerCost("power_rotary_bevel")).toBeGreaterThan(bevelerCost("standard_hand_bevel"));
  });
});

describe("needsPower", () => {
  it("power rotary bevel needs power", () => {
    expect(needsPower("power_rotary_bevel")).toBe(true);
  });
  it("standard hand bevel needs no power", () => {
    expect(needsPower("standard_hand_bevel")).toBe(false);
  });
});

describe("beginnerSafe", () => {
  it("safety beveler guard is beginner safe", () => {
    expect(beginnerSafe("safety_beveler_guard")).toBe(true);
  });
  it("french edge skiver is not beginner safe", () => {
    expect(beginnerSafe("french_edge_skiver")).toBe(false);
  });
});

describe("bladeGeometry", () => {
  it("power rotary bevel uses spinning drum cutter", () => {
    expect(bladeGeometry("power_rotary_bevel")).toBe("spinning_drum_cutter");
  });
});

describe("bestLeather", () => {
  it("micro bevel fine best for luxury shell cordovan", () => {
    expect(bestLeather("micro_bevel_fine")).toBe("luxury_shell_cordovan");
  });
});

describe("edgeBevelers", () => {
  it("returns 5 types", () => {
    expect(edgeBevelers()).toHaveLength(5);
  });
});
