import { describe, it, expect } from "vitest";
import {
  bondStrength, cureTimeMinutes, heatResistanceCelsius,
  flexibility, gapFilling, waterproof,
  repositionable, bestMaterial, shelfLifeMonths, adhesiveTypes,
} from "../adhesive-type-calc.js";

describe("bondStrength", () => {
  it("epoxy is strongest", () => {
    expect(bondStrength("epoxy")).toBeGreaterThan(
      bondStrength("hot_melt")
    );
  });
});

describe("cureTimeMinutes", () => {
  it("cyanoacrylate cures fastest", () => {
    expect(cureTimeMinutes("cyanoacrylate")).toBeLessThan(
      cureTimeMinutes("epoxy")
    );
  });
});

describe("heatResistanceCelsius", () => {
  it("epoxy handles most heat", () => {
    expect(heatResistanceCelsius("epoxy")).toBeGreaterThan(
      heatResistanceCelsius("pva")
    );
  });
});

describe("flexibility", () => {
  it("contact is most flexible", () => {
    expect(flexibility("contact")).toBeGreaterThan(
      flexibility("cyanoacrylate")
    );
  });
});

describe("gapFilling", () => {
  it("epoxy fills gaps best", () => {
    expect(gapFilling("epoxy")).toBeGreaterThan(
      gapFilling("cyanoacrylate")
    );
  });
});

describe("waterproof", () => {
  it("epoxy is waterproof", () => {
    expect(waterproof("epoxy")).toBe(true);
  });
  it("pva is not waterproof", () => {
    expect(waterproof("pva")).toBe(false);
  });
});

describe("repositionable", () => {
  it("pva is repositionable", () => {
    expect(repositionable("pva")).toBe(true);
  });
  it("epoxy is not repositionable", () => {
    expect(repositionable("epoxy")).toBe(false);
  });
});

describe("bestMaterial", () => {
  it("epoxy for metal", () => {
    expect(bestMaterial("epoxy")).toBe("metal");
  });
});

describe("shelfLifeMonths", () => {
  it("hot melt lasts longest", () => {
    expect(shelfLifeMonths("hot_melt")).toBeGreaterThan(
      shelfLifeMonths("cyanoacrylate")
    );
  });
});

describe("adhesiveTypes", () => {
  it("returns 5 types", () => {
    expect(adhesiveTypes()).toHaveLength(5);
  });
});
