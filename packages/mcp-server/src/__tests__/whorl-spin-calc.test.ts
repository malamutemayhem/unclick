import { describe, it, expect } from "vitest";
import {
  spinTime, draftControl, yarnConsist, portability,
  whorlCost, supported, forFine, whorlPlace,
  bestUse, whorlSpins,
} from "../whorl-spin-calc.js";

describe("spinTime", () => {
  it("bottom whorl low longest spin time", () => {
    expect(spinTime("bottom_whorl_low")).toBeGreaterThan(spinTime("tahkli_metal_fine"));
  });
});

describe("draftControl", () => {
  it("supported bowl rest best draft control", () => {
    expect(draftControl("supported_bowl_rest")).toBeGreaterThan(draftControl("bottom_whorl_low"));
  });
});

describe("yarnConsist", () => {
  it("tahkli metal fine most consistent yarn", () => {
    expect(yarnConsist("tahkli_metal_fine")).toBeGreaterThan(yarnConsist("top_whorl_high"));
  });
});

describe("portability", () => {
  it("turkish cross fold most portable", () => {
    expect(portability("turkish_cross_fold")).toBeGreaterThan(portability("supported_bowl_rest"));
  });
});

describe("whorlCost", () => {
  it("tahkli metal fine most expensive", () => {
    expect(whorlCost("tahkli_metal_fine")).toBeGreaterThan(whorlCost("top_whorl_high"));
  });
});

describe("supported", () => {
  it("supported bowl rest is supported", () => {
    expect(supported("supported_bowl_rest")).toBe(true);
  });
  it("top whorl high not supported", () => {
    expect(supported("top_whorl_high")).toBe(false);
  });
});

describe("forFine", () => {
  it("tahkli metal fine is for fine", () => {
    expect(forFine("tahkli_metal_fine")).toBe(true);
  });
  it("bottom whorl low not for fine", () => {
    expect(forFine("bottom_whorl_low")).toBe(false);
  });
});

describe("whorlPlace", () => {
  it("turkish cross fold uses cross arm center", () => {
    expect(whorlPlace("turkish_cross_fold")).toBe("cross_arm_center");
  });
});

describe("bestUse", () => {
  it("supported bowl rest best for fine lace spin", () => {
    expect(bestUse("supported_bowl_rest")).toBe("fine_lace_spin");
  });
});

describe("whorlSpins", () => {
  it("returns 5 types", () => {
    expect(whorlSpins()).toHaveLength(5);
  });
});
