import { describe, it, expect } from "vitest";
import {
  attenuation, bandwidth, insertionLoss, powerRating,
  filterCost, shielded, forPowerLine, topology,
  bestUse, emcFilters,
} from "../emc-filter-calc.js";

describe("attenuation", () => {
  it("power line filter best attenuation", () => {
    expect(attenuation("power_line_filter")).toBeGreaterThan(attenuation("emi_choke_inline"));
  });
});

describe("bandwidth", () => {
  it("waveguide vent widest bandwidth", () => {
    expect(bandwidth("waveguide_vent")).toBeGreaterThan(bandwidth("emi_choke_inline"));
  });
});

describe("insertionLoss", () => {
  it("waveguide vent best insertion loss", () => {
    expect(insertionLoss("waveguide_vent")).toBeGreaterThan(insertionLoss("emi_choke_inline"));
  });
});

describe("powerRating", () => {
  it("power line filter highest power rating", () => {
    expect(powerRating("power_line_filter")).toBeGreaterThan(powerRating("waveguide_vent"));
  });
});

describe("filterCost", () => {
  it("waveguide vent most expensive", () => {
    expect(filterCost("waveguide_vent")).toBeGreaterThan(filterCost("emi_choke_inline"));
  });
});

describe("shielded", () => {
  it("feedthrough cap is shielded", () => {
    expect(shielded("feedthrough_cap")).toBe(true);
  });
  it("pi filter lc not shielded", () => {
    expect(shielded("pi_filter_lc")).toBe(false);
  });
});

describe("forPowerLine", () => {
  it("power line filter is for power line", () => {
    expect(forPowerLine("power_line_filter")).toBe(true);
  });
  it("pi filter lc not for power line", () => {
    expect(forPowerLine("pi_filter_lc")).toBe(false);
  });
});

describe("topology", () => {
  it("waveguide vent uses honeycomb cutoff array", () => {
    expect(topology("waveguide_vent")).toBe("honeycomb_cutoff_array");
  });
});

describe("bestUse", () => {
  it("power line filter best for ac mains emi compliance", () => {
    expect(bestUse("power_line_filter")).toBe("ac_mains_emi_compliance");
  });
});

describe("emcFilters", () => {
  it("returns 5 types", () => {
    expect(emcFilters()).toHaveLength(5);
  });
});
