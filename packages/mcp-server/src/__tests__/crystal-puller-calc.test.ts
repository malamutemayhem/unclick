import { describe, it, expect } from "vitest";
import {
  crystalPurity, throughput, diameterControl, defectDensity,
  cpCost, meltFree, forSemiconductor, pullerConfig,
  bestUse, crystalPullerTypes,
} from "../crystal-puller-calc.js";

describe("crystalPurity", () => {
  it("float zone best crystal purity", () => {
    expect(crystalPurity("float_zone")).toBeGreaterThan(crystalPurity("verneuil_flame"));
  });
});

describe("throughput", () => {
  it("edge defined highest throughput", () => {
    expect(throughput("edge_defined")).toBeGreaterThan(throughput("float_zone"));
  });
});

describe("diameterControl", () => {
  it("czochralski pull best diameter control", () => {
    expect(diameterControl("czochralski_pull")).toBeGreaterThan(diameterControl("verneuil_flame"));
  });
});

describe("defectDensity", () => {
  it("float zone best defect density", () => {
    expect(defectDensity("float_zone")).toBeGreaterThan(defectDensity("verneuil_flame"));
  });
});

describe("cpCost", () => {
  it("float zone most expensive", () => {
    expect(cpCost("float_zone")).toBeGreaterThan(cpCost("verneuil_flame"));
  });
});

describe("meltFree", () => {
  it("float zone is melt free", () => {
    expect(meltFree("float_zone")).toBe(true);
  });
  it("czochralski pull not melt free", () => {
    expect(meltFree("czochralski_pull")).toBe(false);
  });
});

describe("forSemiconductor", () => {
  it("czochralski pull for semiconductor", () => {
    expect(forSemiconductor("czochralski_pull")).toBe(true);
  });
  it("bridgman grow not for semiconductor", () => {
    expect(forSemiconductor("bridgman_grow")).toBe(false);
  });
});

describe("pullerConfig", () => {
  it("float zone uses rf coil crucible free ultra pure", () => {
    expect(pullerConfig("float_zone")).toBe("float_zone_crystal_puller_rf_coil_crucible_free_ultra_pure");
  });
});

describe("bestUse", () => {
  it("czochralski pull for silicon wafer semiconductor ingot", () => {
    expect(bestUse("czochralski_pull")).toBe("silicon_wafer_czochralski_crystal_puller_semiconductor_ingot");
  });
});

describe("crystalPullerTypes", () => {
  it("returns 5 types", () => {
    expect(crystalPullerTypes()).toHaveLength(5);
  });
});
