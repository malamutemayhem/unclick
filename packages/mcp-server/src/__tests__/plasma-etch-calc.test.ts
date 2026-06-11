import { describe, it, expect } from "vitest";
import {
  etchRate, throughput, selectivity, anisotropy,
  peCost, lowDamage, forDeep, etchConfig,
  bestUse, plasmaEtchTypes,
} from "../plasma-etch-calc.js";

describe("etchRate", () => {
  it("ecr best etch rate", () => {
    expect(etchRate("ecr_etch")).toBeGreaterThan(etchRate("barrel_ash"));
  });
});

describe("throughput", () => {
  it("barrel ash highest throughput", () => {
    expect(throughput("barrel_ash")).toBeGreaterThan(throughput("ecr_etch"));
  });
});

describe("selectivity", () => {
  it("icp best selectivity", () => {
    expect(selectivity("icp_etch")).toBeGreaterThan(selectivity("barrel_ash"));
  });
});

describe("anisotropy", () => {
  it("icp best anisotropy", () => {
    expect(anisotropy("icp_etch")).toBeGreaterThan(anisotropy("barrel_ash"));
  });
});

describe("peCost", () => {
  it("ecr most expensive", () => {
    expect(peCost("ecr_etch")).toBeGreaterThan(peCost("barrel_ash"));
  });
});

describe("lowDamage", () => {
  it("downstream etch is low damage", () => {
    expect(lowDamage("downstream_etch")).toBe(true);
  });
  it("rie not low damage", () => {
    expect(lowDamage("rie_etch")).toBe(false);
  });
});

describe("forDeep", () => {
  it("icp for deep etch", () => {
    expect(forDeep("icp_etch")).toBe(true);
  });
  it("barrel ash not for deep", () => {
    expect(forDeep("barrel_ash")).toBe(false);
  });
});

describe("etchConfig", () => {
  it("downstream uses remote source chemical no ion bombard", () => {
    expect(etchConfig("downstream_etch")).toBe("downstream_plasma_etch_remote_source_chemical_no_ion_bombard");
  });
});

describe("bestUse", () => {
  it("rie for pattern transfer anisotropic dielectric etch", () => {
    expect(bestUse("rie_etch")).toBe("pattern_transfer_rie_parallel_plate_anisotropic_dielectric_etch");
  });
});

describe("plasmaEtchTypes", () => {
  it("returns 5 types", () => {
    expect(plasmaEtchTypes()).toHaveLength(5);
  });
});
