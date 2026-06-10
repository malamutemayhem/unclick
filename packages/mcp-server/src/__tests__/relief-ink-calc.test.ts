import { describe, it, expect } from "vitest";
import {
  colorRich, drySpeed, cleanupEase, printSharp,
  inkCost, ecoFriendly, needsSolvent, inkBase,
  bestUse, reliefInks,
} from "../relief-ink-calc.js";

describe("colorRich", () => {
  it("oil based slow richest color", () => {
    expect(colorRich("oil_based_slow")).toBeGreaterThan(colorRich("water_based_wash"));
  });
});

describe("drySpeed", () => {
  it("water based wash fastest drying", () => {
    expect(drySpeed("water_based_wash")).toBeGreaterThan(drySpeed("oil_based_slow"));
  });
});

describe("cleanupEase", () => {
  it("water based wash easiest cleanup", () => {
    expect(cleanupEase("water_based_wash")).toBeGreaterThan(cleanupEase("oil_based_slow"));
  });
});

describe("printSharp", () => {
  it("oil based slow sharpest print", () => {
    expect(printSharp("oil_based_slow")).toBeGreaterThan(printSharp("water_based_wash"));
  });
});

describe("inkCost", () => {
  it("metallic shimmer foil most expensive", () => {
    expect(inkCost("metallic_shimmer_foil")).toBeGreaterThan(inkCost("water_based_wash"));
  });
});

describe("ecoFriendly", () => {
  it("soy based eco is eco friendly", () => {
    expect(ecoFriendly("soy_based_eco")).toBe(true);
  });
  it("oil based slow is not eco friendly", () => {
    expect(ecoFriendly("oil_based_slow")).toBe(false);
  });
});

describe("needsSolvent", () => {
  it("oil based slow needs solvent", () => {
    expect(needsSolvent("oil_based_slow")).toBe(true);
  });
  it("water based wash does not need solvent", () => {
    expect(needsSolvent("water_based_wash")).toBe(false);
  });
});

describe("inkBase", () => {
  it("soy based eco uses soybean oil natural", () => {
    expect(inkBase("soy_based_eco")).toBe("soybean_oil_natural");
  });
});

describe("bestUse", () => {
  it("water based wash best for class quick cleanup", () => {
    expect(bestUse("water_based_wash")).toBe("class_quick_cleanup");
  });
});

describe("reliefInks", () => {
  it("returns 5 types", () => {
    expect(reliefInks()).toHaveLength(5);
  });
});
