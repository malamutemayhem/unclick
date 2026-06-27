import { describe, it, expect } from "vitest";
import {
  sensitivity, throughput, resolution, frameRate,
  tiCost, cooled, forScience, imagerConfig,
  bestUse, thermalImagerTypes,
} from "../thermal-imager-calc.js";

describe("sensitivity", () => {
  it("cooled mwir best sensitivity", () => {
    expect(sensitivity("cooled_mwir")).toBeGreaterThan(sensitivity("handheld_therm"));
  });
});

describe("throughput", () => {
  it("handheld therm highest throughput", () => {
    expect(throughput("handheld_therm")).toBeGreaterThan(throughput("cooled_mwir"));
  });
});

describe("resolution", () => {
  it("cooled mwir best resolution", () => {
    expect(resolution("cooled_mwir")).toBeGreaterThan(resolution("handheld_therm"));
  });
});

describe("frameRate", () => {
  it("cooled mwir best frame rate", () => {
    expect(frameRate("cooled_mwir")).toBeGreaterThan(frameRate("handheld_therm"));
  });
});

describe("tiCost", () => {
  it("cooled lwir most expensive", () => {
    expect(tiCost("cooled_lwir")).toBeGreaterThan(tiCost("handheld_therm"));
  });
});

describe("cooled", () => {
  it("cooled mwir is cooled", () => {
    expect(cooled("cooled_mwir")).toBe(true);
  });
  it("uncooled micro not cooled", () => {
    expect(cooled("uncooled_micro")).toBe(false);
  });
});

describe("forScience", () => {
  it("cooled mwir for science", () => {
    expect(forScience("cooled_mwir")).toBe(true);
  });
  it("handheld therm not for science", () => {
    expect(forScience("handheld_therm")).toBe(false);
  });
});

describe("imagerConfig", () => {
  it("multispectral uses filter wheel gas species map", () => {
    expect(imagerConfig("multispectral_ir")).toBe("multispectral_ir_thermal_imager_filter_wheel_gas_species_map");
  });
});

describe("bestUse", () => {
  it("uncooled micro for predictive maint electrical mechanical", () => {
    expect(bestUse("uncooled_micro")).toBe("predictive_maint_uncooled_thermal_imager_electrical_mechanical");
  });
});

describe("thermalImagerTypes", () => {
  it("returns 5 types", () => {
    expect(thermalImagerTypes()).toHaveLength(5);
  });
});
