import { describe, it, expect } from "vitest";
import {
  caseDepth, throughput, surfaceHardness, distortion,
  pnCost, lowTemp, forStainless, nitrideConfig,
  bestUse, plasmaNitridingTypes,
} from "../plasma-nitriding-calc.js";

describe("caseDepth", () => {
  it("hybrid nitrocarb best case depth", () => {
    expect(caseDepth("hybrid_nitrocarb")).toBeGreaterThan(caseDepth("post_discharge"));
  });
});

describe("throughput", () => {
  it("active screen highest throughput", () => {
    expect(throughput("active_screen")).toBeGreaterThan(throughput("post_discharge"));
  });
});

describe("surfaceHardness", () => {
  it("pulsed plasma best surface hardness", () => {
    expect(surfaceHardness("pulsed_plasma_nitride")).toBeGreaterThan(surfaceHardness("post_discharge"));
  });
});

describe("distortion", () => {
  it("active screen best distortion control", () => {
    expect(distortion("active_screen")).toBeGreaterThan(distortion("hybrid_nitrocarb"));
  });
});

describe("pnCost", () => {
  it("active screen most expensive", () => {
    expect(pnCost("active_screen")).toBeGreaterThan(pnCost("dc_plasma_nitride"));
  });
});

describe("lowTemp", () => {
  it("pulsed plasma is low temp", () => {
    expect(lowTemp("pulsed_plasma_nitride")).toBe(true);
  });
  it("dc plasma not low temp", () => {
    expect(lowTemp("dc_plasma_nitride")).toBe(false);
  });
});

describe("forStainless", () => {
  it("active screen for stainless", () => {
    expect(forStainless("active_screen")).toBe(true);
  });
  it("dc plasma not for stainless", () => {
    expect(forStainless("dc_plasma_nitride")).toBe(false);
  });
});

describe("nitrideConfig", () => {
  it("post discharge uses remote plasma no sputter damage", () => {
    expect(nitrideConfig("post_discharge")).toBe("post_discharge_plasma_nitriding_remote_plasma_no_sputter_damage");
  });
});

describe("bestUse", () => {
  it("hybrid nitrocarb for wear resist compound epsilon layer", () => {
    expect(bestUse("hybrid_nitrocarb")).toBe("wear_resist_hybrid_nitrocarburizing_compound_epsilon_layer_thick");
  });
});

describe("plasmaNitridingTypes", () => {
  it("returns 5 types", () => {
    expect(plasmaNitridingTypes()).toHaveLength(5);
  });
});
