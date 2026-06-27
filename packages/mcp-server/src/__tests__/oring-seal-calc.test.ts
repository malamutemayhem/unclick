import { describe, it, expect } from "vitest";
import {
  chemResist, tempRange, compression, wear,
  orCost, fdaApproved, forHydraulic, material,
  bestUse, oringTypes,
} from "../oring-seal-calc.js";

describe("chemResist", () => {
  it("Viton FKM best chemical resistance", () => {
    expect(chemResist("viton_fkm_chemical")).toBeGreaterThan(chemResist("silicone_vvm_food"));
  });
});

describe("tempRange", () => {
  it("silicone widest temp range", () => {
    expect(tempRange("silicone_vvm_food")).toBeGreaterThan(tempRange("nitrile_buna_n_general"));
  });
});

describe("compression", () => {
  it("nitrile best compression set", () => {
    expect(compression("nitrile_buna_n_general")).toBeGreaterThan(compression("ptfe_encapsulated"));
  });
});

describe("wear", () => {
  it("nitrile best wear resistance", () => {
    expect(wear("nitrile_buna_n_general")).toBeGreaterThan(wear("silicone_vvm_food"));
  });
});

describe("orCost", () => {
  it("PTFE encapsulated most expensive", () => {
    expect(orCost("ptfe_encapsulated")).toBeGreaterThan(orCost("nitrile_buna_n_general"));
  });
});

describe("fdaApproved", () => {
  it("silicone is FDA approved", () => {
    expect(fdaApproved("silicone_vvm_food")).toBe(true);
  });
  it("nitrile not FDA approved", () => {
    expect(fdaApproved("nitrile_buna_n_general")).toBe(false);
  });
});

describe("forHydraulic", () => {
  it("nitrile for hydraulic", () => {
    expect(forHydraulic("nitrile_buna_n_general")).toBe(true);
  });
  it("silicone not for hydraulic", () => {
    expect(forHydraulic("silicone_vvm_food")).toBe(false);
  });
});

describe("material", () => {
  it("EPDM uses ethylene propylene", () => {
    expect(material("epdm_steam_water")).toBe("ethylene_propylene_diene_monomer");
  });
});

describe("bestUse", () => {
  it("Viton for chemical fuel solvent", () => {
    expect(bestUse("viton_fkm_chemical")).toBe("chemical_fuel_solvent_acid_seal");
  });
});

describe("oringTypes", () => {
  it("returns 5 types", () => {
    expect(oringTypes()).toHaveLength(5);
  });
});
