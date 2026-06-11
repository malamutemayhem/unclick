import { describe, it, expect } from "vitest";
import {
  reductionRatio, throughput, versatility, wearRate,
  hmCost, classifier, forBiomass, rotor,
  bestUse, hammerMillTypes,
} from "../hammer-mill-calc.js";

describe("reductionRatio", () => {
  it("turbo mill highest reduction", () => {
    expect(reductionRatio("turbo_mill_classifier")).toBeGreaterThan(reductionRatio("reversible_hard_rock"));
  });
});

describe("throughput", () => {
  it("gravity discharge highest throughput", () => {
    expect(throughput("gravity_discharge_grain")).toBeGreaterThan(throughput("turbo_mill_classifier"));
  });
});

describe("versatility", () => {
  it("turbo mill most versatile", () => {
    expect(versatility("turbo_mill_classifier")).toBeGreaterThan(versatility("ring_hammer_coal"));
  });
});

describe("wearRate", () => {
  it("gravity discharge lower wear rate", () => {
    expect(wearRate("gravity_discharge_grain")).toBeGreaterThan(wearRate("reversible_hard_rock"));
  });
});

describe("hmCost", () => {
  it("turbo mill most expensive", () => {
    expect(hmCost("turbo_mill_classifier")).toBeGreaterThan(hmCost("gravity_discharge_grain"));
  });
});

describe("classifier", () => {
  it("turbo mill has classifier", () => {
    expect(classifier("turbo_mill_classifier")).toBe(true);
  });
  it("gravity discharge no classifier", () => {
    expect(classifier("gravity_discharge_grain")).toBe(false);
  });
});

describe("forBiomass", () => {
  it("gravity discharge for biomass", () => {
    expect(forBiomass("gravity_discharge_grain")).toBe(true);
  });
  it("turbo mill not for biomass", () => {
    expect(forBiomass("turbo_mill_classifier")).toBe(false);
  });
});

describe("rotor", () => {
  it("ring hammer uses screen bar coal", () => {
    expect(rotor("ring_hammer_coal")).toBe("ring_hammer_screen_bar_coal");
  });
});

describe("bestUse", () => {
  it("turbo mill for pigment toner ultra fine", () => {
    expect(bestUse("turbo_mill_classifier")).toBe("pigment_toner_pharma_ultra_fine");
  });
});

describe("hammerMillTypes", () => {
  it("returns 5 types", () => {
    expect(hammerMillTypes()).toHaveLength(5);
  });
});
