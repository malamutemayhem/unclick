import { describe, it, expect } from "vitest";
import {
  so2Removal, throughput, waterUsage, byproductValue,
  fgdCost, wet, forHighSulfur, reagent,
  bestUse, scrubberFgdTypes,
} from "../scrubber-fgd-calc.js";

describe("so2Removal", () => {
  it("wet limestone highest so2 removal", () => {
    expect(so2Removal("wet_limestone")).toBeGreaterThan(so2Removal("dry_sorbent_injection"));
  });
});

describe("throughput", () => {
  it("wet limestone highest throughput", () => {
    expect(throughput("wet_limestone")).toBeGreaterThan(throughput("dry_sorbent_injection"));
  });
});

describe("waterUsage", () => {
  it("dry sorbent injection lowest water usage", () => {
    expect(waterUsage("dry_sorbent_injection")).toBeGreaterThan(waterUsage("seawater_scrubber"));
  });
});

describe("byproductValue", () => {
  it("wet limestone highest byproduct value", () => {
    expect(byproductValue("wet_limestone")).toBeGreaterThan(byproductValue("dry_sorbent_injection"));
  });
});

describe("fgdCost", () => {
  it("wet limestone most expensive", () => {
    expect(fgdCost("wet_limestone")).toBeGreaterThan(fgdCost("dry_sorbent_injection"));
  });
});

describe("wet", () => {
  it("wet limestone is wet", () => {
    expect(wet("wet_limestone")).toBe(true);
  });
  it("dry sorbent injection is dry", () => {
    expect(wet("dry_sorbent_injection")).toBe(false);
  });
});

describe("forHighSulfur", () => {
  it("wet limestone for high sulfur", () => {
    expect(forHighSulfur("wet_limestone")).toBe(true);
  });
  it("dry sorbent injection not for high sulfur", () => {
    expect(forHighSulfur("dry_sorbent_injection")).toBe(false);
  });
});

describe("reagent", () => {
  it("seawater scrubber uses natural seawater alkalinity", () => {
    expect(reagent("seawater_scrubber")).toBe("natural_seawater_alkalinity_absorb_so2_discharge_treated");
  });
});

describe("bestUse", () => {
  it("dual alkali for industrial smelter", () => {
    expect(bestUse("dual_alkali")).toBe("industrial_smelter_high_so2_concentration_closed_loop_regen");
  });
});

describe("scrubberFgdTypes", () => {
  it("returns 5 types", () => {
    expect(scrubberFgdTypes()).toHaveLength(5);
  });
});
