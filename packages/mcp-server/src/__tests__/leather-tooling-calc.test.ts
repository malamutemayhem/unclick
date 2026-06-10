import { describe, it, expect } from "vitest";
import {
  casingTimeMinutes, toolCount, detailLevel, workingTimeHoursPerDm2,
  idealThicknessMm, swivelKnifeAngleDeg, malletWeightOz, dyeCoats,
  costPerHour, toolingStyles,
} from "../leather-tooling-calc.js";

describe("casingTimeMinutes", () => {
  it("thicker leather takes longer", () => {
    expect(casingTimeMinutes(4)).toBeGreaterThan(casingTimeMinutes(2));
  });
});

describe("toolCount", () => {
  it("sheridan needs most tools", () => {
    expect(toolCount("sheridan")).toBeGreaterThan(toolCount("basket_weave"));
  });
});

describe("detailLevel", () => {
  it("sheridan has highest detail", () => {
    expect(detailLevel("sheridan")).toBeGreaterThan(
      detailLevel("basket_weave")
    );
  });
});

describe("workingTimeHoursPerDm2", () => {
  it("sheridan takes longest", () => {
    expect(workingTimeHoursPerDm2("sheridan")).toBeGreaterThan(
      workingTimeHoursPerDm2("basket_weave")
    );
  });
});

describe("idealThicknessMm", () => {
  it("sheridan needs thickest leather", () => {
    expect(idealThicknessMm("sheridan")).toBeGreaterThan(
      idealThicknessMm("basket_weave")
    );
  });
});

describe("swivelKnifeAngleDeg", () => {
  it("returns 45", () => {
    expect(swivelKnifeAngleDeg()).toBe(45);
  });
});

describe("malletWeightOz", () => {
  it("sheridan needs heaviest mallet", () => {
    expect(malletWeightOz("sheridan")).toBeGreaterThan(
      malletWeightOz("basket_weave")
    );
  });
});

describe("dyeCoats", () => {
  it("sheridan needs most coats", () => {
    expect(dyeCoats("sheridan")).toBeGreaterThan(dyeCoats("basket_weave"));
  });
});

describe("costPerHour", () => {
  it("sheridan is most expensive", () => {
    expect(costPerHour("sheridan")).toBeGreaterThan(
      costPerHour("basket_weave")
    );
  });
});

describe("toolingStyles", () => {
  it("returns 5 styles", () => {
    expect(toolingStyles()).toHaveLength(5);
  });
});
