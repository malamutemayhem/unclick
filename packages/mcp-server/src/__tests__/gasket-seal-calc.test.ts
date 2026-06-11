import { describe, it, expect } from "vitest";
import {
  sealability, pressureRating, temperatureRange, blowoutResist,
  gsCost, metallic, forHighPressure, construction,
  bestUse, gasketSealTypes,
} from "../gasket-seal-calc.js";

describe("sealability", () => {
  it("rtj best sealability", () => {
    expect(sealability("ring_joint_rtj")).toBeGreaterThan(sealability("sheet_compressed_fiber"));
  });
});

describe("pressureRating", () => {
  it("rtj highest pressure rating", () => {
    expect(pressureRating("ring_joint_rtj")).toBeGreaterThan(pressureRating("ptfe_envelope_lined"));
  });
});

describe("temperatureRange", () => {
  it("rtj widest temperature range", () => {
    expect(temperatureRange("ring_joint_rtj")).toBeGreaterThan(temperatureRange("sheet_compressed_fiber"));
  });
});

describe("blowoutResist", () => {
  it("rtj best blowout resistance", () => {
    expect(blowoutResist("ring_joint_rtj")).toBeGreaterThan(blowoutResist("sheet_compressed_fiber"));
  });
});

describe("gsCost", () => {
  it("rtj most expensive", () => {
    expect(gsCost("ring_joint_rtj")).toBeGreaterThan(gsCost("sheet_compressed_fiber"));
  });
});

describe("metallic", () => {
  it("spiral wound is metallic", () => {
    expect(metallic("spiral_wound_metal")).toBe(true);
  });
  it("ptfe envelope not metallic", () => {
    expect(metallic("ptfe_envelope_lined")).toBe(false);
  });
});

describe("forHighPressure", () => {
  it("kammprofile for high pressure", () => {
    expect(forHighPressure("kammprofile_serrated")).toBe(true);
  });
  it("sheet fiber not for high pressure", () => {
    expect(forHighPressure("sheet_compressed_fiber")).toBe(false);
  });
});

describe("construction", () => {
  it("spiral wound uses alternating windings", () => {
    expect(construction("spiral_wound_metal")).toBe("alternating_metal_filler_spiral_windings_ring");
  });
});

describe("bestUse", () => {
  it("ptfe envelope for chemical corrosive", () => {
    expect(bestUse("ptfe_envelope_lined")).toBe("chemical_corrosive_service_acid_alkali_flange");
  });
});

describe("gasketSealTypes", () => {
  it("returns 5 types", () => {
    expect(gasketSealTypes()).toHaveLength(5);
  });
});
