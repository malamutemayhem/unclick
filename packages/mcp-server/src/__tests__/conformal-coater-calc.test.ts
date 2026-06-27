import { describe, it, expect } from "vitest";
import {
  coatUniformity, throughput, edgeCoverage, thicknessControl,
  ccCost_, selective, forHighRel, coaterConfig,
  bestUse, conformalCoaterTypes,
} from "../conformal-coater-calc.js";

describe("coatUniformity", () => {
  it("vapor deposition best coat uniformity", () => {
    expect(coatUniformity("vapor_deposition")).toBeGreaterThan(coatUniformity("spray_coat"));
  });
});

describe("throughput", () => {
  it("curtain coat highest throughput", () => {
    expect(throughput("curtain_coat")).toBeGreaterThan(throughput("vapor_deposition"));
  });
});

describe("edgeCoverage", () => {
  it("vapor deposition best edge coverage", () => {
    expect(edgeCoverage("vapor_deposition")).toBeGreaterThan(edgeCoverage("spray_coat"));
  });
});

describe("thicknessControl", () => {
  it("vapor deposition best thickness control", () => {
    expect(thicknessControl("vapor_deposition")).toBeGreaterThan(thicknessControl("dip_coat"));
  });
});

describe("ccCost_", () => {
  it("vapor deposition most expensive", () => {
    expect(ccCost_("vapor_deposition")).toBeGreaterThan(ccCost_("dip_coat"));
  });
});

describe("selective", () => {
  it("selective coat is selective", () => {
    expect(selective("selective_coat")).toBe(true);
  });
  it("spray coat not selective", () => {
    expect(selective("spray_coat")).toBe(false);
  });
});

describe("forHighRel", () => {
  it("vapor deposition for high rel", () => {
    expect(forHighRel("vapor_deposition")).toBe(true);
  });
  it("spray coat not for high rel", () => {
    expect(forHighRel("spray_coat")).toBe(false);
  });
});

describe("coaterConfig", () => {
  it("selective coat uses needle valve programmable path coat", () => {
    expect(coaterConfig("selective_coat")).toBe("selective_conformal_coater_needle_valve_programmable_path_coat");
  });
});

describe("bestUse", () => {
  it("vapor deposition for medical aerospace parylene ultra thin", () => {
    expect(bestUse("vapor_deposition")).toBe("medical_aerospace_parylene_vapor_conformal_coat_ultra_thin");
  });
});

describe("conformalCoaterTypes", () => {
  it("returns 5 types", () => {
    expect(conformalCoaterTypes()).toHaveLength(5);
  });
});
