import { describe, it, expect } from "vitest";
import {
  durationDays, temperatureCelsius, flavorComplexity,
  controlDifficulty, healthBenefits, producesAlcohol,
  requiresStarter, exampleProduct, shelfLifeMonths, fermentationTypes,
} from "../fermentation-type-calc.js";

describe("durationDays", () => {
  it("wild fermentation takes longest", () => {
    expect(durationDays("wild")).toBeGreaterThan(durationDays("koji"));
  });
});

describe("temperatureCelsius", () => {
  it("koji needs highest temperature", () => {
    expect(temperatureCelsius("koji")).toBeGreaterThan(
      temperatureCelsius("wild")
    );
  });
});

describe("flavorComplexity", () => {
  it("wild fermentation has most complex flavor", () => {
    expect(flavorComplexity("wild")).toBeGreaterThan(
      flavorComplexity("acetic")
    );
  });
});

describe("controlDifficulty", () => {
  it("wild is hardest to control", () => {
    expect(controlDifficulty("wild")).toBeGreaterThan(
      controlDifficulty("lactic")
    );
  });
});

describe("healthBenefits", () => {
  it("lactic has most health benefits", () => {
    expect(healthBenefits("lactic")).toBeGreaterThan(
      healthBenefits("alcoholic")
    );
  });
});

describe("producesAlcohol", () => {
  it("alcoholic produces alcohol", () => {
    expect(producesAlcohol("alcoholic")).toBe(true);
  });
  it("lactic does not", () => {
    expect(producesAlcohol("lactic")).toBe(false);
  });
});

describe("requiresStarter", () => {
  it("lactic requires starter", () => {
    expect(requiresStarter("lactic")).toBe(true);
  });
  it("wild does not", () => {
    expect(requiresStarter("wild")).toBe(false);
  });
});

describe("exampleProduct", () => {
  it("koji makes miso", () => {
    expect(exampleProduct("koji")).toBe("miso");
  });
});

describe("shelfLifeMonths", () => {
  it("alcoholic has longest shelf life", () => {
    expect(shelfLifeMonths("alcoholic")).toBeGreaterThan(
      shelfLifeMonths("lactic")
    );
  });
});

describe("fermentationTypes", () => {
  it("returns 5 types", () => {
    expect(fermentationTypes()).toHaveLength(5);
  });
});
