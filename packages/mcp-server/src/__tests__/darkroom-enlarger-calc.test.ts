import { describe, it, expect } from "vitest";
import {
  printSharpness, toneEvenness, maxNegSize, setupEase,
  enlargerCost, colorPrinting, filterlessContrast, lightSource,
  bestPrint, darkroomEnlargers,
} from "../darkroom-enlarger-calc.js";

describe("printSharpness", () => {
  it("condenser 35mm sharpest prints", () => {
    expect(printSharpness("condenser_35mm")).toBeGreaterThan(printSharpness("cold_light_large"));
  });
});

describe("toneEvenness", () => {
  it("cold light large most even tones", () => {
    expect(toneEvenness("cold_light_large")).toBeGreaterThan(toneEvenness("condenser_35mm"));
  });
});

describe("maxNegSize", () => {
  it("cold light large largest neg size", () => {
    expect(maxNegSize("cold_light_large")).toBeGreaterThan(maxNegSize("condenser_35mm"));
  });
});

describe("setupEase", () => {
  it("digital hybrid easiest setup", () => {
    expect(setupEase("digital_hybrid")).toBeGreaterThan(setupEase("cold_light_large"));
  });
});

describe("enlargerCost", () => {
  it("digital hybrid most expensive", () => {
    expect(enlargerCost("digital_hybrid")).toBeGreaterThan(enlargerCost("condenser_35mm"));
  });
});

describe("colorPrinting", () => {
  it("color dichroic supports color printing", () => {
    expect(colorPrinting("color_dichroic")).toBe(true);
  });
  it("condenser 35mm does not", () => {
    expect(colorPrinting("condenser_35mm")).toBe(false);
  });
});

describe("filterlessContrast", () => {
  it("color dichroic has filterless contrast", () => {
    expect(filterlessContrast("color_dichroic")).toBe(true);
  });
  it("diffusion medium does not", () => {
    expect(filterlessContrast("diffusion_medium")).toBe(false);
  });
});

describe("lightSource", () => {
  it("cold light large uses fluorescent grid tube", () => {
    expect(lightSource("cold_light_large")).toBe("fluorescent_grid_tube");
  });
});

describe("bestPrint", () => {
  it("condenser 35mm for small format sharp bw", () => {
    expect(bestPrint("condenser_35mm")).toBe("small_format_sharp_bw");
  });
});

describe("darkroomEnlargers", () => {
  it("returns 5 types", () => {
    expect(darkroomEnlargers()).toHaveLength(5);
  });
});
