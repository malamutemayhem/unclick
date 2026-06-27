import { describe, it, expect } from "vitest";
import {
  partDensity, throughput, surfaceFinish, buildVolume,
  bjCost, sinterRequired, forCasting, jetterConfig,
  bestUse, binderJetterTypes,
} from "../binder-jetter-calc.js";

describe("partDensity", () => {
  it("metal binder best part density", () => {
    expect(partDensity("metal_binder")).toBeGreaterThan(partDensity("full_color_binder"));
  });
});

describe("throughput", () => {
  it("sand binder highest throughput", () => {
    expect(throughput("sand_binder")).toBeGreaterThan(throughput("ceramic_binder"));
  });
});

describe("surfaceFinish", () => {
  it("full color binder best surface finish", () => {
    expect(surfaceFinish("full_color_binder")).toBeGreaterThan(surfaceFinish("sand_binder"));
  });
});

describe("buildVolume", () => {
  it("sand binder best build volume", () => {
    expect(buildVolume("sand_binder")).toBeGreaterThan(buildVolume("ceramic_binder"));
  });
});

describe("bjCost", () => {
  it("metal binder most expensive", () => {
    expect(bjCost("metal_binder")).toBeGreaterThan(bjCost("sand_binder"));
  });
});

describe("sinterRequired", () => {
  it("metal binder requires sinter", () => {
    expect(sinterRequired("metal_binder")).toBe(true);
  });
  it("sand binder no sinter required", () => {
    expect(sinterRequired("sand_binder")).toBe(false);
  });
});

describe("forCasting", () => {
  it("sand binder for casting", () => {
    expect(forCasting("sand_binder")).toBe(true);
  });
  it("metal binder not for casting", () => {
    expect(forCasting("metal_binder")).toBe(false);
  });
});

describe("jetterConfig", () => {
  it("full color binder uses gypsum powder cmyk binder visual model", () => {
    expect(jetterConfig("full_color_binder")).toBe("full_color_binder_jetter_gypsum_powder_cmyk_binder_visual_model");
  });
});

describe("bestUse", () => {
  it("sand binder for sand mold core large casting pattern fast", () => {
    expect(bestUse("sand_binder")).toBe("sand_mold_core_sand_binder_jetter_large_casting_pattern_fast");
  });
});

describe("binderJetterTypes", () => {
  it("returns 5 types", () => {
    expect(binderJetterTypes()).toHaveLength(5);
  });
});
