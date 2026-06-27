import { describe, it, expect } from "vitest";
import {
  thinPrecision, speedOutput, controlFeel, safetyLevel,
  skiveCost, replaceBlade, machineAssist, bladeProfile,
  bestTask, leatherSkives,
} from "../leather-skive-calc.js";

describe("thinPrecision", () => {
  it("paring knife round most precise thinning", () => {
    expect(thinPrecision("paring_knife_round")).toBeGreaterThan(thinPrecision("safety_skiver_pull"));
  });
});

describe("speedOutput", () => {
  it("splitter machine even fastest output", () => {
    expect(speedOutput("splitter_machine_even")).toBeGreaterThan(speedOutput("paring_knife_round"));
  });
});

describe("controlFeel", () => {
  it("paring knife round best control feel", () => {
    expect(controlFeel("paring_knife_round")).toBeGreaterThan(controlFeel("splitter_machine_even"));
  });
});

describe("safetyLevel", () => {
  it("safety skiver pull safest", () => {
    expect(safetyLevel("safety_skiver_pull")).toBeGreaterThan(safetyLevel("paring_knife_round"));
  });
});

describe("skiveCost", () => {
  it("splitter machine even most expensive", () => {
    expect(skiveCost("splitter_machine_even")).toBeGreaterThan(skiveCost("safety_skiver_pull"));
  });
});

describe("replaceBlade", () => {
  it("safety skiver pull has replaceable blade", () => {
    expect(replaceBlade("safety_skiver_pull")).toBe(true);
  });
  it("french skiver push does not have replaceable blade", () => {
    expect(replaceBlade("french_skiver_push")).toBe(false);
  });
});

describe("machineAssist", () => {
  it("bell skiver machine is machine assisted", () => {
    expect(machineAssist("bell_skiver_machine")).toBe(true);
  });
  it("french skiver push is not machine assisted", () => {
    expect(machineAssist("french_skiver_push")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("bell skiver machine uses rotating bell blade", () => {
    expect(bladeProfile("bell_skiver_machine")).toBe("rotating_bell_blade");
  });
});

describe("bestTask", () => {
  it("splitter machine even best for split hide uniform", () => {
    expect(bestTask("splitter_machine_even")).toBe("split_hide_uniform");
  });
});

describe("leatherSkives", () => {
  it("returns 5 types", () => {
    expect(leatherSkives()).toHaveLength(5);
  });
});
