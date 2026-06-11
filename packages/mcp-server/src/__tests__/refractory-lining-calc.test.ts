import { describe, it, expect } from "vitest";
import {
  tempRating, abrasionResist, thermalShock, installSpeed,
  rlCost, monolithic, forSlagContact, composition,
  bestUse, refractoryLiningTypes,
} from "../refractory-lining-calc.js";

describe("tempRating", () => {
  it("silicon carbide highest temp rating", () => {
    expect(tempRating("silicon_carbide_brick")).toBeGreaterThan(tempRating("fireclay_brick_std"));
  });
});

describe("abrasionResist", () => {
  it("silicon carbide best abrasion resistance", () => {
    expect(abrasionResist("silicon_carbide_brick")).toBeGreaterThan(abrasionResist("ceramic_fiber_blanket"));
  });
});

describe("thermalShock", () => {
  it("ceramic fiber best thermal shock", () => {
    expect(thermalShock("ceramic_fiber_blanket")).toBeGreaterThan(thermalShock("high_alumina_brick"));
  });
});

describe("installSpeed", () => {
  it("ceramic fiber fastest install", () => {
    expect(installSpeed("ceramic_fiber_blanket")).toBeGreaterThan(installSpeed("silicon_carbide_brick"));
  });
});

describe("rlCost", () => {
  it("silicon carbide most expensive", () => {
    expect(rlCost("silicon_carbide_brick")).toBeGreaterThan(rlCost("fireclay_brick_std"));
  });
});

describe("monolithic", () => {
  it("castable is monolithic", () => {
    expect(monolithic("castable_monolithic")).toBe(true);
  });
  it("fireclay brick not monolithic", () => {
    expect(monolithic("fireclay_brick_std")).toBe(false);
  });
});

describe("forSlagContact", () => {
  it("high alumina for slag contact", () => {
    expect(forSlagContact("high_alumina_brick")).toBe(true);
  });
  it("fireclay not for slag contact", () => {
    expect(forSlagContact("fireclay_brick_std")).toBe(false);
  });
});

describe("composition", () => {
  it("castable uses hydraulic bonded", () => {
    expect(composition("castable_monolithic")).toBe("hydraulic_bonded_castable_vibration_pour_gun");
  });
});

describe("bestUse", () => {
  it("ceramic fiber for periodic kiln", () => {
    expect(bestUse("ceramic_fiber_blanket")).toBe("backup_insulation_periodic_kiln_low_thermal_mass");
  });
});

describe("refractoryLiningTypes", () => {
  it("returns 5 types", () => {
    expect(refractoryLiningTypes()).toHaveLength(5);
  });
});
