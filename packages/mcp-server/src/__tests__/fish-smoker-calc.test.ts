import { describe, it, expect } from "vitest";
import {
  smokeDepth, throughput, temperatureControl, flavorConsistency,
  fmCost, coldSmoke, forSalmon, smokerConfig,
  bestUse, fishSmokerTypes,
} from "../fish-smoker-calc.js";

describe("smokeDepth", () => {
  it("traditional kiln best smoke depth", () => {
    expect(smokeDepth("traditional_kiln")).toBeGreaterThan(smokeDepth("liquid_smoke"));
  });
});

describe("throughput", () => {
  it("liquid smoke highest throughput", () => {
    expect(throughput("liquid_smoke")).toBeGreaterThan(throughput("traditional_kiln"));
  });
});

describe("temperatureControl", () => {
  it("liquid smoke best temperature control", () => {
    expect(temperatureControl("liquid_smoke")).toBeGreaterThan(temperatureControl("traditional_kiln"));
  });
});

describe("flavorConsistency", () => {
  it("electrostatic smoke best flavor consistency", () => {
    expect(flavorConsistency("electrostatic_smoke")).toBeGreaterThan(flavorConsistency("traditional_kiln"));
  });
});

describe("fmCost", () => {
  it("electrostatic smoke most expensive", () => {
    expect(fmCost("electrostatic_smoke")).toBeGreaterThan(fmCost("traditional_kiln"));
  });
});

describe("coldSmoke", () => {
  it("traditional kiln supports cold smoke", () => {
    expect(coldSmoke("traditional_kiln")).toBe(true);
  });
  it("liquid smoke not cold smoke", () => {
    expect(coldSmoke("liquid_smoke")).toBe(false);
  });
});

describe("forSalmon", () => {
  it("electrostatic smoke for salmon", () => {
    expect(forSalmon("electrostatic_smoke")).toBe(true);
  });
  it("liquid smoke not for salmon", () => {
    expect(forSalmon("liquid_smoke")).toBe(false);
  });
});

describe("smokerConfig", () => {
  it("cold smoke cabinet uses external generator pipe low temp", () => {
    expect(smokerConfig("cold_smoke_cabinet")).toBe("cold_smoke_cabinet_fish_external_generator_pipe_low_temp_cure");
  });
});

describe("bestUse", () => {
  it("mechanical kiln for commercial consistent temperature", () => {
    expect(bestUse("mechanical_kiln")).toBe("commercial_smoked_fish_mechanical_kiln_consistent_temperature");
  });
});

describe("fishSmokerTypes", () => {
  it("returns 5 types", () => {
    expect(fishSmokerTypes()).toHaveLength(5);
  });
});
