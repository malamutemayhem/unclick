import { describe, it, expect } from "vitest";
import {
  energyDensity, cyclLife, safety, chargRate,
  chemCost, cobaltFree, forEv, cathode,
  bestUse, batteryChems,
} from "../battery-chem-calc.js";

describe("energyDensity", () => {
  it("nca cylindrical highest energy density", () => {
    expect(energyDensity("nca_cylindrical")).toBeGreaterThan(energyDensity("sodium_ion_layered"));
  });
});

describe("cyclLife", () => {
  it("lfp olivine longest cycle life", () => {
    expect(cyclLife("lfp_olivine")).toBeGreaterThan(cyclLife("nca_cylindrical"));
  });
});

describe("safety", () => {
  it("lfp olivine safest", () => {
    expect(safety("lfp_olivine")).toBeGreaterThan(safety("nca_cylindrical"));
  });
});

describe("chargRate", () => {
  it("solid state sulfide fastest charge rate", () => {
    expect(chargRate("solid_state_sulfide")).toBeGreaterThan(chargRate("nca_cylindrical"));
  });
});

describe("chemCost", () => {
  it("solid state sulfide most expensive", () => {
    expect(chemCost("solid_state_sulfide")).toBeGreaterThan(chemCost("sodium_ion_layered"));
  });
});

describe("cobaltFree", () => {
  it("lfp olivine is cobalt free", () => {
    expect(cobaltFree("lfp_olivine")).toBe(true);
  });
  it("nmc 811 not cobalt free", () => {
    expect(cobaltFree("nmc_811")).toBe(false);
  });
});

describe("forEv", () => {
  it("nmc 811 for ev", () => {
    expect(forEv("nmc_811")).toBe(true);
  });
  it("sodium ion layered not for ev", () => {
    expect(forEv("sodium_ion_layered")).toBe(false);
  });
});

describe("cathode", () => {
  it("lfp olivine uses lithium iron phosphate", () => {
    expect(cathode("lfp_olivine")).toBe("lithium_iron_phosphate");
  });
});

describe("bestUse", () => {
  it("sodium ion layered best for low cost stationary storage", () => {
    expect(bestUse("sodium_ion_layered")).toBe("low_cost_stationary_storage");
  });
});

describe("batteryChems", () => {
  it("returns 5 types", () => {
    expect(batteryChems()).toHaveLength(5);
  });
});
