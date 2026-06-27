import { describe, it, expect } from "vitest";
import {
  juiceYield, juiceSpeed, nutrientRetention, noiseLevel,
  juicerCost, handlesLeafy, needsPower, extractMethod,
  bestProduce, juicers,
} from "../juicer-calc.js";

describe("juiceYield", () => {
  it("triturating twin gear best yield", () => {
    expect(juiceYield("triturating_twin_gear")).toBeGreaterThan(juiceYield("centrifugal_fast_spin"));
  });
});

describe("juiceSpeed", () => {
  it("centrifugal fast spin fastest", () => {
    expect(juiceSpeed("centrifugal_fast_spin")).toBeGreaterThan(juiceSpeed("masticating_slow_press"));
  });
});

describe("nutrientRetention", () => {
  it("triturating twin gear best nutrient retention", () => {
    expect(nutrientRetention("triturating_twin_gear")).toBeGreaterThan(nutrientRetention("centrifugal_fast_spin"));
  });
});

describe("noiseLevel", () => {
  it("citrus press manual quietest", () => {
    expect(noiseLevel("citrus_press_manual")).toBeGreaterThan(noiseLevel("centrifugal_fast_spin"));
  });
});

describe("juicerCost", () => {
  it("triturating twin gear most expensive", () => {
    expect(juicerCost("triturating_twin_gear")).toBeGreaterThan(juicerCost("citrus_press_manual"));
  });
});

describe("handlesLeafy", () => {
  it("masticating slow press handles leafy greens", () => {
    expect(handlesLeafy("masticating_slow_press")).toBe(true);
  });
  it("centrifugal fast spin does not", () => {
    expect(handlesLeafy("centrifugal_fast_spin")).toBe(false);
  });
});

describe("needsPower", () => {
  it("centrifugal fast spin needs power", () => {
    expect(needsPower("centrifugal_fast_spin")).toBe(true);
  });
  it("citrus press manual does not", () => {
    expect(needsPower("citrus_press_manual")).toBe(false);
  });
});

describe("extractMethod", () => {
  it("masticating slow press uses auger crush squeeze", () => {
    expect(extractMethod("masticating_slow_press")).toBe("auger_crush_squeeze");
  });
});

describe("bestProduce", () => {
  it("citrus press manual best for orange lemon grapefruit", () => {
    expect(bestProduce("citrus_press_manual")).toBe("orange_lemon_grapefruit");
  });
});

describe("juicers", () => {
  it("returns 5 types", () => {
    expect(juicers()).toHaveLength(5);
  });
});
