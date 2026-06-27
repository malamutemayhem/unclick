import { describe, it, expect } from "vitest";
import {
  steepingHours, germinationDays, kilnTempCelsius,
  enzymaticPower, colorContribution, glutenFree,
  moistureTargetPercent, yieldPercent, costPerKg, maltingGrains,
} from "../malting-calc.js";

describe("steepingHours", () => {
  it("barley steeps longest", () => {
    expect(steepingHours("barley")).toBeGreaterThan(
      steepingHours("sorghum")
    );
  });
});

describe("germinationDays", () => {
  it("barley germinates longest", () => {
    expect(germinationDays("barley")).toBeGreaterThan(
      germinationDays("sorghum")
    );
  });
});

describe("kilnTempCelsius", () => {
  it("oat needs highest kiln temp", () => {
    expect(kilnTempCelsius("oat")).toBeGreaterThan(
      kilnTempCelsius("sorghum")
    );
  });
});

describe("enzymaticPower", () => {
  it("barley has most enzymatic power", () => {
    expect(enzymaticPower("barley")).toBeGreaterThan(
      enzymaticPower("oat")
    );
  });
});

describe("colorContribution", () => {
  it("sorghum contributes most color", () => {
    expect(colorContribution("sorghum")).toBeGreaterThan(
      colorContribution("wheat")
    );
  });
});

describe("glutenFree", () => {
  it("sorghum is gluten free", () => {
    expect(glutenFree("sorghum")).toBe(true);
  });
  it("barley is not", () => {
    expect(glutenFree("barley")).toBe(false);
  });
});

describe("moistureTargetPercent", () => {
  it("barley targets highest moisture", () => {
    expect(moistureTargetPercent("barley")).toBeGreaterThan(
      moistureTargetPercent("sorghum")
    );
  });
});

describe("yieldPercent", () => {
  it("barley yields most", () => {
    expect(yieldPercent("barley")).toBeGreaterThan(
      yieldPercent("sorghum")
    );
  });
});

describe("costPerKg", () => {
  it("rye costs most", () => {
    expect(costPerKg("rye")).toBeGreaterThan(
      costPerKg("sorghum")
    );
  });
});

describe("maltingGrains", () => {
  it("returns 5 grains", () => {
    expect(maltingGrains()).toHaveLength(5);
  });
});
