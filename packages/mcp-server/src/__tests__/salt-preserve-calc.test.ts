import { describe, it, expect } from "vitest";
import {
  saltConcentrationPercent, cureTimeDays, moistureExtraction,
  flavorDevelopment, shelfLifeMonths, colorPreservation,
  additionalEquipment, bestProtein, costPerKg, saltPreserves,
} from "../salt-preserve-calc.js";

describe("saltConcentrationPercent", () => {
  it("dry salt has highest concentration", () => {
    expect(saltConcentrationPercent("dry_salt")).toBeGreaterThan(
      saltConcentrationPercent("nitrate_cure")
    );
  });
});

describe("cureTimeDays", () => {
  it("nitrate cure takes longest", () => {
    expect(cureTimeDays("nitrate_cure")).toBeGreaterThan(
      cureTimeDays("smoke_salt")
    );
  });
});

describe("moistureExtraction", () => {
  it("dry salt extracts most moisture", () => {
    expect(moistureExtraction("dry_salt")).toBeGreaterThan(
      moistureExtraction("nitrate_cure")
    );
  });
});

describe("flavorDevelopment", () => {
  it("smoke salt develops most flavor", () => {
    expect(flavorDevelopment("smoke_salt")).toBeGreaterThan(
      flavorDevelopment("dry_salt")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("dry salt lasts longest", () => {
    expect(shelfLifeMonths("dry_salt")).toBeGreaterThan(
      shelfLifeMonths("sugar_cure")
    );
  });
});

describe("colorPreservation", () => {
  it("nitrate cure preserves color", () => {
    expect(colorPreservation("nitrate_cure")).toBe(true);
  });
  it("dry salt does not", () => {
    expect(colorPreservation("dry_salt")).toBe(false);
  });
});

describe("additionalEquipment", () => {
  it("smoke salt needs equipment", () => {
    expect(additionalEquipment("smoke_salt")).toBe(true);
  });
  it("dry salt does not", () => {
    expect(additionalEquipment("dry_salt")).toBe(false);
  });
});

describe("bestProtein", () => {
  it("nitrate cure best for bacon", () => {
    expect(bestProtein("nitrate_cure")).toBe("bacon");
  });
});

describe("costPerKg", () => {
  it("smoke salt costs most", () => {
    expect(costPerKg("smoke_salt")).toBeGreaterThan(
      costPerKg("wet_brine")
    );
  });
});

describe("saltPreserves", () => {
  it("returns 5 methods", () => {
    expect(saltPreserves()).toHaveLength(5);
  });
});
