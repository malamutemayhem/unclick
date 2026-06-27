import { describe, it, expect } from "vitest";
import {
  cop, capacity, coldClimate, installEase,
  hpCost, reversible, forNewBuild, refrigerant,
  bestUse, heatPumpTypes,
} from "../heat-pump-calc.js";

describe("cop", () => {
  it("ground source highest cop", () => {
    expect(cop("ground_source")).toBeGreaterThan(cop("air_source_split"));
  });
});

describe("capacity", () => {
  it("water source highest capacity", () => {
    expect(capacity("water_source")).toBeGreaterThan(capacity("air_source_split"));
  });
});

describe("coldClimate", () => {
  it("ground source best cold climate performance", () => {
    expect(coldClimate("ground_source")).toBeGreaterThan(coldClimate("air_source_split"));
  });
});

describe("installEase", () => {
  it("air source split easiest install", () => {
    expect(installEase("air_source_split")).toBeGreaterThan(installEase("ground_source"));
  });
});

describe("hpCost", () => {
  it("ground source most expensive", () => {
    expect(hpCost("ground_source")).toBeGreaterThan(hpCost("air_source_split"));
  });
});

describe("reversible", () => {
  it("air source split is reversible", () => {
    expect(reversible("air_source_split")).toBe(true);
  });
  it("co2 transcritical not reversible", () => {
    expect(reversible("co2_transcritical")).toBe(false);
  });
});

describe("forNewBuild", () => {
  it("ground source for new build", () => {
    expect(forNewBuild("ground_source")).toBe(true);
  });
  it("air source split not specifically for new build", () => {
    expect(forNewBuild("air_source_split")).toBe(false);
  });
});

describe("refrigerant", () => {
  it("co2 transcritical uses r744", () => {
    expect(refrigerant("co2_transcritical")).toBe("r744_co2_natural_transcritical_cycle_high_water_temp_90c");
  });
});

describe("bestUse", () => {
  it("air to water for hydronic underfloor", () => {
    expect(bestUse("air_to_water")).toBe("hydronic_underfloor_heating_radiator_retrofit_boiler_replace");
  });
});

describe("heatPumpTypes", () => {
  it("returns 5 types", () => {
    expect(heatPumpTypes()).toHaveLength(5);
  });
});
