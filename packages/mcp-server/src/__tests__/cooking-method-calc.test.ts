import { describe, it, expect } from "vitest";
import {
  temperatureCelsius, cookTimeMultiplier, nutrientRetention,
  flavorDevelopment, skillRequired, dryHeat,
  createsCrust, bestProtein, equipmentCost, cookingMethods,
} from "../cooking-method-calc.js";

describe("temperatureCelsius", () => {
  it("sauteing is hottest", () => {
    expect(temperatureCelsius("sauteing")).toBeGreaterThan(
      temperatureCelsius("sous_vide")
    );
  });
});

describe("cookTimeMultiplier", () => {
  it("sous vide takes longest", () => {
    expect(cookTimeMultiplier("sous_vide")).toBeGreaterThan(
      cookTimeMultiplier("sauteing")
    );
  });
});

describe("nutrientRetention", () => {
  it("steaming retains most nutrients", () => {
    expect(nutrientRetention("steaming")).toBeGreaterThan(
      nutrientRetention("braising")
    );
  });
});

describe("flavorDevelopment", () => {
  it("braising develops most flavor", () => {
    expect(flavorDevelopment("braising")).toBeGreaterThan(
      flavorDevelopment("steaming")
    );
  });
});

describe("skillRequired", () => {
  it("sous vide requires most skill", () => {
    expect(skillRequired("sous_vide")).toBeGreaterThan(
      skillRequired("steaming")
    );
  });
});

describe("dryHeat", () => {
  it("roasting is dry heat", () => {
    expect(dryHeat("roasting")).toBe(true);
  });
  it("steaming is not dry heat", () => {
    expect(dryHeat("steaming")).toBe(false);
  });
});

describe("createsCrust", () => {
  it("sauteing creates crust", () => {
    expect(createsCrust("sauteing")).toBe(true);
  });
  it("sous vide does not", () => {
    expect(createsCrust("sous_vide")).toBe(false);
  });
});

describe("bestProtein", () => {
  it("sous vide best for steak", () => {
    expect(bestProtein("sous_vide")).toBe("steak");
  });
});

describe("equipmentCost", () => {
  it("sous vide equipment costs most", () => {
    expect(equipmentCost("sous_vide")).toBeGreaterThan(
      equipmentCost("steaming")
    );
  });
});

describe("cookingMethods", () => {
  it("returns 5 types", () => {
    expect(cookingMethods()).toHaveLength(5);
  });
});
