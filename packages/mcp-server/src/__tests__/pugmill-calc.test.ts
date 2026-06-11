import { describe, it, expect } from "vitest";
import {
  mixingSpeed, homogeneity, throughput, moistureControl,
  pmCost, deairing, forExtrusion, millConfig,
  bestUse, pugmillTypes,
} from "../pugmill-calc.js";

describe("mixingSpeed", () => {
  it("continuous mixer fastest mixing speed", () => {
    expect(mixingSpeed("continuous_mixer")).toBeGreaterThan(mixingSpeed("single_shaft"));
  });
});

describe("homogeneity", () => {
  it("deairing vacuum best homogeneity", () => {
    expect(homogeneity("deairing_vacuum")).toBeGreaterThan(homogeneity("single_shaft"));
  });
});

describe("throughput", () => {
  it("extruding auger highest throughput", () => {
    expect(throughput("extruding_auger")).toBeGreaterThan(throughput("single_shaft"));
  });
});

describe("moistureControl", () => {
  it("deairing vacuum best moisture control", () => {
    expect(moistureControl("deairing_vacuum")).toBeGreaterThan(moistureControl("single_shaft"));
  });
});

describe("pmCost", () => {
  it("deairing vacuum most expensive", () => {
    expect(pmCost("deairing_vacuum")).toBeGreaterThan(pmCost("single_shaft"));
  });
});

describe("deairing", () => {
  it("deairing vacuum has deairing", () => {
    expect(deairing("deairing_vacuum")).toBe(true);
  });
  it("single shaft no deairing", () => {
    expect(deairing("single_shaft")).toBe(false);
  });
});

describe("forExtrusion", () => {
  it("extruding auger for extrusion", () => {
    expect(forExtrusion("extruding_auger")).toBe(true);
  });
  it("twin shaft not for extrusion", () => {
    expect(forExtrusion("twin_shaft")).toBe(false);
  });
});

describe("millConfig", () => {
  it("single shaft uses paddle pugmill clay mix", () => {
    expect(millConfig("single_shaft")).toBe("single_shaft_paddle_pugmill_clay_mix_transport_simple_batch");
  });
});

describe("bestUse", () => {
  it("deairing vacuum for dense air free clay body", () => {
    expect(bestUse("deairing_vacuum")).toBe("dense_air_free_clay_body_pottery_porcelain_vacuum_deairing_pug");
  });
});

describe("pugmillTypes", () => {
  it("returns 5 types", () => {
    expect(pugmillTypes()).toHaveLength(5);
  });
});
