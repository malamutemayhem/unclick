import { describe, it, expect } from "vitest";
import {
  honeyKgPerLiter, originalGravity, fermentationTempCelsius, primaryFermentDays,
  secondaryFermentWeeks, agingMonths, yeastNutrientGPerLiter, rackingCount,
  costPerLiter, meadStyles,
} from "../mead-calc.js";

describe("honeyKgPerLiter", () => {
  it("higher ABV = more honey", () => {
    expect(honeyKgPerLiter(14)).toBeGreaterThan(honeyKgPerLiter(8));
  });
});

describe("originalGravity", () => {
  it("more honey = higher gravity", () => {
    expect(originalGravity(0.5)).toBeGreaterThan(originalGravity(0.3));
  });
});

describe("fermentationTempCelsius", () => {
  it("braggot ferments warmest", () => {
    expect(fermentationTempCelsius("braggot")).toBeGreaterThan(
      fermentationTempCelsius("cyser")
    );
  });
});

describe("primaryFermentDays", () => {
  it("melomel takes longest primary", () => {
    expect(primaryFermentDays("melomel")).toBeGreaterThan(
      primaryFermentDays("braggot")
    );
  });
});

describe("secondaryFermentWeeks", () => {
  it("melomel takes longest secondary", () => {
    expect(secondaryFermentWeeks("melomel")).toBeGreaterThan(
      secondaryFermentWeeks("braggot")
    );
  });
});

describe("agingMonths", () => {
  it("traditional ages longest", () => {
    expect(agingMonths("traditional")).toBeGreaterThan(
      agingMonths("braggot")
    );
  });
});

describe("yeastNutrientGPerLiter", () => {
  it("returns 1.5", () => {
    expect(yeastNutrientGPerLiter()).toBe(1.5);
  });
});

describe("rackingCount", () => {
  it("melomel needs most rackings", () => {
    expect(rackingCount("melomel")).toBeGreaterThan(rackingCount("braggot"));
  });
});

describe("costPerLiter", () => {
  it("metheglin is most expensive", () => {
    expect(costPerLiter("metheglin")).toBeGreaterThan(
      costPerLiter("braggot")
    );
  });
});

describe("meadStyles", () => {
  it("returns 5 styles", () => {
    expect(meadStyles()).toHaveLength(5);
  });
});
