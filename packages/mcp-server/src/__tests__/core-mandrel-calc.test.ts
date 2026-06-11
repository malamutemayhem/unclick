import { describe, it, expect } from "vitest";
import {
  dimensionalAccuracy, throughput, surfaceFinish, extractionEase,
  cmCost, reusable, forHollow, mandrelConfig,
  bestUse, coreMandrelTypes,
} from "../core-mandrel-calc.js";

describe("dimensionalAccuracy", () => {
  it("steel fixed best dimensional accuracy", () => {
    expect(dimensionalAccuracy("steel_fixed")).toBeGreaterThan(dimensionalAccuracy("inflatable_bladder"));
  });
});

describe("throughput", () => {
  it("steel fixed highest throughput", () => {
    expect(throughput("steel_fixed")).toBeGreaterThan(throughput("soluble_washout"));
  });
});

describe("surfaceFinish", () => {
  it("steel fixed best surface finish", () => {
    expect(surfaceFinish("steel_fixed")).toBeGreaterThan(surfaceFinish("sand_cast"));
  });
});

describe("extractionEase", () => {
  it("inflatable bladder best extraction ease", () => {
    expect(extractionEase("inflatable_bladder")).toBeGreaterThan(extractionEase("steel_fixed"));
  });
});

describe("cmCost", () => {
  it("aluminum collapsible most expensive", () => {
    expect(cmCost("aluminum_collapsible")).toBeGreaterThan(cmCost("sand_cast"));
  });
});

describe("reusable", () => {
  it("steel fixed is reusable", () => {
    expect(reusable("steel_fixed")).toBe(true);
  });
  it("soluble washout not reusable", () => {
    expect(reusable("soluble_washout")).toBe(false);
  });
});

describe("forHollow", () => {
  it("steel fixed for hollow", () => {
    expect(forHollow("steel_fixed")).toBe(true);
  });
  it("sand cast not for hollow", () => {
    expect(forHollow("sand_cast")).toBe(false);
  });
});

describe("mandrelConfig", () => {
  it("soluble washout uses ceramic salt dissolve water flush", () => {
    expect(mandrelConfig("soluble_washout")).toBe("soluble_washout_core_mandrel_ceramic_salt_dissolve_water_flush");
  });
});

describe("bestUse", () => {
  it("aluminum collapsible for duct elbow segment fold out", () => {
    expect(bestUse("aluminum_collapsible")).toBe("duct_elbow_aluminum_collapsible_core_mandrel_segment_fold_out");
  });
});

describe("coreMandrelTypes", () => {
  it("returns 5 types", () => {
    expect(coreMandrelTypes()).toHaveLength(5);
  });
});
