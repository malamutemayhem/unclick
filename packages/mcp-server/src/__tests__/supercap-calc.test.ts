import { describe, it, expect } from "vitest";
import {
  energyDensity, powerDensity, cycleLife, leakage,
  capCost, highTemp, forBackup, electrode,
  bestUse, supercaps,
} from "../supercap-calc.js";

describe("energyDensity", () => {
  it("hybrid lithium ion highest energy density", () => {
    expect(energyDensity("hybrid_lithium_ion")).toBeGreaterThan(energyDensity("edlc_carbon"));
  });
});

describe("powerDensity", () => {
  it("graphene ultrathin highest power density", () => {
    expect(powerDensity("graphene_ultrathin")).toBeGreaterThan(powerDensity("hybrid_lithium_ion"));
  });
});

describe("cycleLife", () => {
  it("edlc carbon best cycle life", () => {
    expect(cycleLife("edlc_carbon")).toBeGreaterThan(cycleLife("polymer_conducting"));
  });
});

describe("leakage", () => {
  it("hybrid lithium ion lowest leakage", () => {
    expect(leakage("hybrid_lithium_ion")).toBeGreaterThan(leakage("polymer_conducting"));
  });
});

describe("capCost", () => {
  it("graphene ultrathin most expensive", () => {
    expect(capCost("graphene_ultrathin")).toBeGreaterThan(capCost("edlc_carbon"));
  });
});

describe("highTemp", () => {
  it("pseudo cap metal oxide is high temp", () => {
    expect(highTemp("pseudo_cap_metal_oxide")).toBe(true);
  });
  it("edlc carbon not high temp", () => {
    expect(highTemp("edlc_carbon")).toBe(false);
  });
});

describe("forBackup", () => {
  it("edlc carbon is for backup", () => {
    expect(forBackup("edlc_carbon")).toBe(true);
  });
  it("graphene ultrathin not for backup", () => {
    expect(forBackup("graphene_ultrathin")).toBe(false);
  });
});

describe("electrode", () => {
  it("graphene ultrathin uses graphene nanosheet", () => {
    expect(electrode("graphene_ultrathin")).toBe("graphene_nanosheet");
  });
});

describe("bestUse", () => {
  it("edlc carbon best for ups bridge power", () => {
    expect(bestUse("edlc_carbon")).toBe("ups_bridge_power");
  });
});

describe("supercaps", () => {
  it("returns 5 types", () => {
    expect(supercaps()).toHaveLength(5);
  });
});
