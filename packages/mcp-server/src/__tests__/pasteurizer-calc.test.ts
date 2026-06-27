import { describe, it, expect } from "vitest";
import {
  speed, shelfLife, flavorRetention, energyEfficiency,
  pCost, continuous, forDairy, heating,
  bestUse, pasteurizerTypes,
} from "../pasteurizer-calc.js";

describe("speed", () => {
  it("htst plate fastest", () => {
    expect(speed("htst_plate")).toBeGreaterThan(speed("batch_vat"));
  });
});

describe("shelfLife", () => {
  it("uht direct longest shelf life", () => {
    expect(shelfLife("uht_direct")).toBeGreaterThan(shelfLife("batch_vat"));
  });
});

describe("flavorRetention", () => {
  it("batch vat best flavor retention", () => {
    expect(flavorRetention("batch_vat")).toBeGreaterThan(flavorRetention("uht_indirect"));
  });
});

describe("energyEfficiency", () => {
  it("htst plate most energy efficient", () => {
    expect(energyEfficiency("htst_plate")).toBeGreaterThan(energyEfficiency("uht_direct"));
  });
});

describe("pCost", () => {
  it("uht direct most expensive", () => {
    expect(pCost("uht_direct")).toBeGreaterThan(pCost("batch_vat"));
  });
});

describe("continuous", () => {
  it("htst plate is continuous", () => {
    expect(continuous("htst_plate")).toBe(true);
  });
  it("batch vat not continuous", () => {
    expect(continuous("batch_vat")).toBe(false);
  });
});

describe("forDairy", () => {
  it("htst plate for dairy", () => {
    expect(forDairy("htst_plate")).toBe(true);
  });
  it("tunnel spray not for dairy", () => {
    expect(forDairy("tunnel_spray")).toBe(false);
  });
});

describe("heating", () => {
  it("batch vat uses jacketed vat", () => {
    expect(heating("batch_vat")).toBe("jacketed_vat_63c_30min_slow_heat_gentle_agitation_cool");
  });
});

describe("bestUse", () => {
  it("htst plate for fresh milk juice", () => {
    expect(bestUse("htst_plate")).toBe("fresh_milk_juice_beer_liquid_egg_high_throughput_dairy");
  });
});

describe("pasteurizerTypes", () => {
  it("returns 5 types", () => {
    expect(pasteurizerTypes()).toHaveLength(5);
  });
});
