import { describe, it, expect } from "vitest";
import {
  separationResolution, analysisSpeed, sampleThroughput, equipmentCost,
  sensitivity, requiresVolatileSample, quantitative, detectorType,
  bestApplication, chromatographyMethods,
} from "../chromatography-method-calc.js";

describe("separationResolution", () => {
  it("hplc highest resolution", () => {
    expect(separationResolution("hplc")).toBeGreaterThan(separationResolution("thin_layer"));
  });
});

describe("analysisSpeed", () => {
  it("gas chromatography fastest", () => {
    expect(analysisSpeed("gas_chromatography")).toBeGreaterThan(analysisSpeed("size_exclusion"));
  });
});

describe("sampleThroughput", () => {
  it("thin layer highest throughput", () => {
    expect(sampleThroughput("thin_layer")).toBeGreaterThan(sampleThroughput("size_exclusion"));
  });
});

describe("equipmentCost", () => {
  it("hplc most expensive", () => {
    expect(equipmentCost("hplc")).toBeGreaterThan(equipmentCost("thin_layer"));
  });
});

describe("sensitivity", () => {
  it("gas chromatography most sensitive", () => {
    expect(sensitivity("gas_chromatography")).toBeGreaterThan(sensitivity("thin_layer"));
  });
});

describe("requiresVolatileSample", () => {
  it("gas chromatography requires volatile sample", () => {
    expect(requiresVolatileSample("gas_chromatography")).toBe(true);
  });
  it("hplc does not", () => {
    expect(requiresVolatileSample("hplc")).toBe(false);
  });
});

describe("quantitative", () => {
  it("hplc is quantitative", () => {
    expect(quantitative("hplc")).toBe(true);
  });
  it("thin layer is not", () => {
    expect(quantitative("thin_layer")).toBe(false);
  });
});

describe("detectorType", () => {
  it("hplc uses uv vis diode array", () => {
    expect(detectorType("hplc")).toBe("uv_vis_diode_array");
  });
});

describe("bestApplication", () => {
  it("gas chromatography for volatile organic analysis", () => {
    expect(bestApplication("gas_chromatography")).toBe("volatile_organic_analysis");
  });
});

describe("chromatographyMethods", () => {
  it("returns 5 methods", () => {
    expect(chromatographyMethods()).toHaveLength(5);
  });
});
