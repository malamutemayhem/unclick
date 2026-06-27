import { describe, it, expect } from "vitest";
import {
  fineness, throughput, heatGeneration, energyEfficiency,
  pnCost, counterRotate, forSugar, millConfig,
  bestUse, pinMillTypes,
} from "../pin-mill-calc.js";

describe("fineness", () => {
  it("turbo pin best fineness", () => {
    expect(fineness("turbo_pin")).toBeGreaterThan(fineness("single_rotor_pin"));
  });
});

describe("throughput", () => {
  it("disc pin highest throughput", () => {
    expect(throughput("disc_pin")).toBeGreaterThan(throughput("turbo_pin"));
  });
});

describe("heatGeneration", () => {
  it("turbo pin highest heat generation", () => {
    expect(heatGeneration("turbo_pin")).toBeGreaterThan(heatGeneration("disc_pin"));
  });
});

describe("energyEfficiency", () => {
  it("counter rotate best energy efficiency", () => {
    expect(energyEfficiency("counter_rotate_pin")).toBeGreaterThan(energyEfficiency("turbo_pin"));
  });
});

describe("pnCost", () => {
  it("turbo pin most expensive", () => {
    expect(pnCost("turbo_pin")).toBeGreaterThan(pnCost("single_rotor_pin"));
  });
});

describe("counterRotate", () => {
  it("counter rotate pin uses counter rotation", () => {
    expect(counterRotate("counter_rotate_pin")).toBe(true);
  });
  it("single rotor no counter rotation", () => {
    expect(counterRotate("single_rotor_pin")).toBe(false);
  });
});

describe("forSugar", () => {
  it("single rotor for sugar", () => {
    expect(forSugar("single_rotor_pin")).toBe(true);
  });
  it("disc pin not for sugar", () => {
    expect(forSugar("disc_pin")).toBe(false);
  });
});

describe("millConfig", () => {
  it("fine impact pin uses classifier wheel recirculate oversize grind", () => {
    expect(millConfig("fine_impact_pin")).toBe("fine_impact_pin_mill_classifier_wheel_recirculate_oversize_grind");
  });
});

describe("bestUse", () => {
  it("turbo pin for toner grind ultra fine narrow distribution powder", () => {
    expect(bestUse("turbo_pin")).toBe("toner_grind_turbo_pin_mill_ultra_fine_narrow_distribution_powder");
  });
});

describe("pinMillTypes", () => {
  it("returns 5 types", () => {
    expect(pinMillTypes()).toHaveLength(5);
  });
});
