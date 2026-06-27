import { describe, it, expect } from "vitest";
import {
  dryingRate, throughput, productQuality, energyEfficiency,
  bdCost, continuous, forPaste, dryerConfig,
  bestUse, bandDryerTypes,
} from "../band-dryer-calc.js";

describe("dryingRate", () => {
  it("foam mat band best drying rate", () => {
    expect(dryingRate("foam_mat_band")).toBeGreaterThan(dryingRate("vacuum_band"));
  });
});

describe("throughput", () => {
  it("multi pass highest throughput", () => {
    expect(throughput("multi_pass")).toBeGreaterThan(throughput("vacuum_band"));
  });
});

describe("productQuality", () => {
  it("vacuum band best product quality", () => {
    expect(productQuality("vacuum_band")).toBeGreaterThan(productQuality("single_pass"));
  });
});

describe("energyEfficiency", () => {
  it("multi pass best energy efficiency", () => {
    expect(energyEfficiency("multi_pass")).toBeGreaterThan(energyEfficiency("vacuum_band"));
  });
});

describe("bdCost", () => {
  it("vacuum band most expensive", () => {
    expect(bdCost("vacuum_band")).toBeGreaterThan(bdCost("single_pass"));
  });
});

describe("continuous", () => {
  it("single pass is continuous", () => {
    expect(continuous("single_pass")).toBe(true);
  });
  it("all types are continuous", () => {
    expect(continuous("vacuum_band")).toBe(true);
  });
});

describe("forPaste", () => {
  it("vacuum band for paste", () => {
    expect(forPaste("vacuum_band")).toBe(true);
  });
  it("single pass not for paste", () => {
    expect(forPaste("single_pass")).toBe(false);
  });
});

describe("dryerConfig", () => {
  it("multi pass uses stacked belt cascade recirculate heat", () => {
    expect(dryerConfig("multi_pass")).toBe("multi_pass_band_dryer_stacked_belt_cascade_recirculate_heat");
  });
});

describe("bestUse", () => {
  it("foam mat band for fruit juice foam spread rapid dry powder", () => {
    expect(bestUse("foam_mat_band")).toBe("fruit_juice_foam_mat_band_dryer_foam_spread_rapid_dry_powder");
  });
});

describe("bandDryerTypes", () => {
  it("returns 5 types", () => {
    expect(bandDryerTypes()).toHaveLength(5);
  });
});
