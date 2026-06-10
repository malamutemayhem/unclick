import { describe, it, expect } from "vitest";
import {
  sharpness, versatility, lowLightPerf, lensWeight,
  lensCost, imageStabilized, weatherSealed, focusType,
  bestSubject, cameraLenses,
} from "../camera-lens-calc.js";

describe("sharpness", () => {
  it("prime fast sharpest", () => {
    expect(sharpness("prime_fast")).toBeGreaterThan(sharpness("zoom_standard"));
  });
});

describe("versatility", () => {
  it("zoom standard most versatile", () => {
    expect(versatility("zoom_standard")).toBeGreaterThan(versatility("prime_fast"));
  });
});

describe("lowLightPerf", () => {
  it("prime fast best low light", () => {
    expect(lowLightPerf("prime_fast")).toBeGreaterThan(lowLightPerf("telephoto_long"));
  });
});

describe("lensWeight", () => {
  it("prime fast lightest", () => {
    expect(lensWeight("prime_fast")).toBeGreaterThan(lensWeight("telephoto_long"));
  });
});

describe("lensCost", () => {
  it("telephoto long most expensive", () => {
    expect(lensCost("telephoto_long")).toBeGreaterThan(lensCost("zoom_standard"));
  });
});

describe("imageStabilized", () => {
  it("zoom standard is image stabilized", () => {
    expect(imageStabilized("zoom_standard")).toBe(true);
  });
  it("prime fast is not", () => {
    expect(imageStabilized("prime_fast")).toBe(false);
  });
});

describe("weatherSealed", () => {
  it("telephoto long is weather sealed", () => {
    expect(weatherSealed("telephoto_long")).toBe(true);
  });
  it("prime fast is not", () => {
    expect(weatherSealed("prime_fast")).toBe(false);
  });
});

describe("focusType", () => {
  it("telephoto long uses nano usm tracking", () => {
    expect(focusType("telephoto_long")).toBe("nano_usm_tracking");
  });
});

describe("bestSubject", () => {
  it("macro close for insect flower product detail", () => {
    expect(bestSubject("macro_close")).toBe("insect_flower_product_detail");
  });
});

describe("cameraLenses", () => {
  it("returns 5 types", () => {
    expect(cameraLenses()).toHaveLength(5);
  });
});
