import { describe, it, expect } from "vitest";
import {
  startingAbv, aceticAcidPercent, motherFormationDays, conversionWeeks,
  idealTempCelsius, oxygenRequired, agingMonths, flavorComplexity,
  costPerLiter, vinegarBases,
} from "../vinegar-calc.js";

describe("startingAbv", () => {
  it("wine has highest ABV", () => {
    expect(startingAbv("wine")).toBeGreaterThan(startingAbv("coconut"));
  });
});

describe("aceticAcidPercent", () => {
  it("wine produces strongest vinegar", () => {
    expect(aceticAcidPercent("wine")).toBeGreaterThan(
      aceticAcidPercent("rice")
    );
  });
});

describe("motherFormationDays", () => {
  it("wine forms mother fastest", () => {
    expect(motherFormationDays("wine")).toBeLessThan(
      motherFormationDays("coconut")
    );
  });
});

describe("conversionWeeks", () => {
  it("wine converts fastest", () => {
    expect(conversionWeeks("wine")).toBeLessThan(
      conversionWeeks("coconut")
    );
  });
});

describe("idealTempCelsius", () => {
  it("returns 27", () => {
    expect(idealTempCelsius()).toBe(27);
  });
});

describe("oxygenRequired", () => {
  it("returns true", () => {
    expect(oxygenRequired()).toBe(true);
  });
});

describe("agingMonths", () => {
  it("wine ages longest", () => {
    expect(agingMonths("wine")).toBeGreaterThan(agingMonths("malt"));
  });
});

describe("flavorComplexity", () => {
  it("wine is most complex", () => {
    expect(flavorComplexity("wine")).toBeGreaterThan(
      flavorComplexity("malt")
    );
  });
});

describe("costPerLiter", () => {
  it("wine vinegar is most expensive", () => {
    expect(costPerLiter("wine")).toBeGreaterThan(costPerLiter("malt"));
  });
});

describe("vinegarBases", () => {
  it("returns 5 bases", () => {
    expect(vinegarBases()).toHaveLength(5);
  });
});
