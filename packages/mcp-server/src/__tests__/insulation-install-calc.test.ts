import { describe, it, expect } from "vitest";
import {
  coverageUniformity, airSealingAbility, laborCost, moistureResistance,
  retrofitSuitability, diyFriendly, expandsToFill, typicalMaterial,
  bestApplication, insulationInstallMethods,
} from "../insulation-install-calc.js";

describe("coverageUniformity", () => {
  it("spray foam most uniform", () => {
    expect(coverageUniformity("spray_foam")).toBeGreaterThan(coverageUniformity("batt_roll"));
  });
});

describe("airSealingAbility", () => {
  it("spray foam best air sealing", () => {
    expect(airSealingAbility("spray_foam")).toBeGreaterThan(airSealingAbility("batt_roll"));
  });
});

describe("laborCost", () => {
  it("spray foam most expensive labor", () => {
    expect(laborCost("spray_foam")).toBeGreaterThan(laborCost("batt_roll"));
  });
});

describe("moistureResistance", () => {
  it("spray foam best moisture resistance", () => {
    expect(moistureResistance("spray_foam")).toBeGreaterThan(moistureResistance("batt_roll"));
  });
});

describe("retrofitSuitability", () => {
  it("blown in best for retrofit", () => {
    expect(retrofitSuitability("blown_in")).toBeGreaterThan(retrofitSuitability("rigid_board"));
  });
});

describe("diyFriendly", () => {
  it("batt roll is diy friendly", () => {
    expect(diyFriendly("batt_roll")).toBe(true);
  });
  it("spray foam is not", () => {
    expect(diyFriendly("spray_foam")).toBe(false);
  });
});

describe("expandsToFill", () => {
  it("spray foam expands to fill", () => {
    expect(expandsToFill("spray_foam")).toBe(true);
  });
  it("batt roll does not", () => {
    expect(expandsToFill("batt_roll")).toBe(false);
  });
});

describe("typicalMaterial", () => {
  it("spray foam is polyurethane", () => {
    expect(typicalMaterial("spray_foam")).toBe("polyurethane_open_closed");
  });
});

describe("bestApplication", () => {
  it("blown in for attic enclosed cavity", () => {
    expect(bestApplication("blown_in")).toBe("attic_enclosed_cavity");
  });
});

describe("insulationInstallMethods", () => {
  it("returns 5 methods", () => {
    expect(insulationInstallMethods()).toHaveLength(5);
  });
});
