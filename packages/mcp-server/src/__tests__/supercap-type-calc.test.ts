import { describe, it, expect } from "vitest";
import {
  energyDensity, powerDensity, cycleLife, selfDischarge,
  scCost, aqueous, forBackup, electrode,
  bestUse, supercapTypes,
} from "../supercap-type-calc.js";

describe("energyDensity", () => {
  it("hybrid lithium ion highest energy density", () => {
    expect(energyDensity("hybrid_lithium_ion")).toBeGreaterThan(energyDensity("edlc_carbon"));
  });
});

describe("powerDensity", () => {
  it("graphene aerogel highest power density", () => {
    expect(powerDensity("graphene_aerogel")).toBeGreaterThan(powerDensity("hybrid_lithium_ion"));
  });
});

describe("cycleLife", () => {
  it("edlc carbon longest cycle life", () => {
    expect(cycleLife("edlc_carbon")).toBeGreaterThan(cycleLife("polymer_conducting"));
  });
});

describe("selfDischarge", () => {
  it("hybrid lithium ion lowest self discharge", () => {
    expect(selfDischarge("hybrid_lithium_ion")).toBeGreaterThan(selfDischarge("polymer_conducting"));
  });
});

describe("scCost", () => {
  it("graphene aerogel most expensive", () => {
    expect(scCost("graphene_aerogel")).toBeGreaterThan(scCost("edlc_carbon"));
  });
});

describe("aqueous", () => {
  it("pseudocap metal oxide is aqueous", () => {
    expect(aqueous("pseudocap_metal_oxide")).toBe(true);
  });
  it("edlc carbon not aqueous", () => {
    expect(aqueous("edlc_carbon")).toBe(false);
  });
});

describe("forBackup", () => {
  it("edlc carbon for backup", () => {
    expect(forBackup("edlc_carbon")).toBe(true);
  });
  it("graphene aerogel not for backup", () => {
    expect(forBackup("graphene_aerogel")).toBe(false);
  });
});

describe("electrode", () => {
  it("graphene aerogel uses 3d graphene foam", () => {
    expect(electrode("graphene_aerogel")).toBe("3d_graphene_foam");
  });
});

describe("bestUse", () => {
  it("hybrid lithium ion best for ups holdup power", () => {
    expect(bestUse("hybrid_lithium_ion")).toBe("ups_holdup_power");
  });
});

describe("supercapTypes", () => {
  it("returns 5 types", () => {
    expect(supercapTypes()).toHaveLength(5);
  });
});
