import { describe, it, expect } from "vitest";
import {
  extractionRate, throughput, fiberHandling, energyEfficiency,
  ccCost_, continuous, forRaw, crusherConfig,
  bestUse, caneCrusherTypes,
} from "../cane-crusher-calc.js";

describe("extractionRate", () => {
  it("diffuser best extraction rate", () => {
    expect(extractionRate("diffuser")).toBeGreaterThan(extractionRate("three_roller"));
  });
});

describe("throughput", () => {
  it("six roller highest throughput", () => {
    expect(throughput("six_roller")).toBeGreaterThan(throughput("three_roller"));
  });
});

describe("fiberHandling", () => {
  it("six roller best fiber handling", () => {
    expect(fiberHandling("six_roller")).toBeGreaterThan(fiberHandling("three_roller"));
  });
});

describe("energyEfficiency", () => {
  it("diffuser best energy efficiency", () => {
    expect(energyEfficiency("diffuser")).toBeGreaterThan(energyEfficiency("three_roller"));
  });
});

describe("ccCost_", () => {
  it("diffuser most expensive", () => {
    expect(ccCost_("diffuser")).toBeGreaterThan(ccCost_("three_roller"));
  });
});

describe("continuous", () => {
  it("all cane crushers are continuous", () => {
    expect(continuous("three_roller")).toBe(true);
    expect(continuous("diffuser")).toBe(true);
  });
});

describe("forRaw", () => {
  it("all cane crushers for raw sugar", () => {
    expect(forRaw("three_roller")).toBe(true);
    expect(forRaw("six_roller")).toBe(true);
  });
});

describe("crusherConfig", () => {
  it("five roller uses underfeed re absorption", () => {
    expect(crusherConfig("five_roller")).toBe("five_roller_cane_crusher_underfeed_re_absorption_high_extraction");
  });
});

describe("bestUse", () => {
  it("diffuser for modern sugar factory", () => {
    expect(bestUse("diffuser")).toBe("modern_sugar_factory_diffuser_counter_current_wash_maximum_sucrose");
  });
});

describe("caneCrusherTypes", () => {
  it("returns 5 types", () => {
    expect(caneCrusherTypes()).toHaveLength(5);
  });
});
