import { describe, it, expect } from "vitest";
import {
  curingWeeks, saltPercent, fatContentPercent,
  curingTempCelsius, moistureLossPercent, slicingThicknessMm,
  bestServingMethod, proteinPercent, costPerKg, curedMeatTypes,
} from "../cured-meat-calc.js";

describe("curingWeeks", () => {
  it("prosciutto cures longest", () => {
    expect(curingWeeks("prosciutto")).toBeGreaterThan(
      curingWeeks("pancetta")
    );
  });
});

describe("saltPercent", () => {
  it("pancetta is saltiest", () => {
    expect(saltPercent("pancetta")).toBeGreaterThan(
      saltPercent("prosciutto")
    );
  });
});

describe("fatContentPercent", () => {
  it("guanciale has most fat", () => {
    expect(fatContentPercent("guanciale")).toBeGreaterThan(
      fatContentPercent("bresaola")
    );
  });
});

describe("curingTempCelsius", () => {
  it("prosciutto cures warmest", () => {
    expect(curingTempCelsius("prosciutto")).toBeGreaterThan(
      curingTempCelsius("pancetta")
    );
  });
});

describe("moistureLossPercent", () => {
  it("bresaola loses most moisture", () => {
    expect(moistureLossPercent("bresaola")).toBeGreaterThan(
      moistureLossPercent("guanciale")
    );
  });
});

describe("slicingThicknessMm", () => {
  it("prosciutto is sliced thinnest", () => {
    expect(slicingThicknessMm("prosciutto")).toBeLessThan(
      slicingThicknessMm("guanciale")
    );
  });
});

describe("bestServingMethod", () => {
  it("guanciale is rendered", () => {
    expect(bestServingMethod("guanciale")).toBe("rendered");
  });
});

describe("proteinPercent", () => {
  it("bresaola has most protein", () => {
    expect(proteinPercent("bresaola")).toBeGreaterThan(
      proteinPercent("prosciutto")
    );
  });
});

describe("costPerKg", () => {
  it("bresaola is most expensive", () => {
    expect(costPerKg("bresaola")).toBeGreaterThan(
      costPerKg("pancetta")
    );
  });
});

describe("curedMeatTypes", () => {
  it("returns 5 types", () => {
    expect(curedMeatTypes()).toHaveLength(5);
  });
});
