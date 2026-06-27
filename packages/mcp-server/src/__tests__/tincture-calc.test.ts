import { describe, it, expect } from "vitest";
import {
  herbWeightG, alcoholPercent, macerationDays, shakeFrequencyPerDay,
  shelfLifeMonths, dosageMl, strainLossPercent, storageTemp,
  costPerLiter, menstruumTypes,
} from "../tincture-calc.js";

describe("herbWeightG", () => {
  it("lower ratio = more herb", () => {
    expect(herbWeightG(500, 3)).toBeGreaterThan(herbWeightG(500, 5));
  });
});

describe("alcoholPercent", () => {
  it("only ethanol has alcohol", () => {
    expect(alcoholPercent("ethanol")).toBe(40);
    expect(alcoholPercent("glycerin")).toBe(0);
  });
});

describe("macerationDays", () => {
  it("glycerin takes longest", () => {
    expect(macerationDays("glycerin")).toBeGreaterThan(macerationDays("vinegar"));
  });
});

describe("shakeFrequencyPerDay", () => {
  it("returns 2", () => {
    expect(shakeFrequencyPerDay()).toBe(2);
  });
});

describe("shelfLifeMonths", () => {
  it("ethanol lasts longest", () => {
    expect(shelfLifeMonths("ethanol")).toBeGreaterThan(shelfLifeMonths("oil"));
  });
});

describe("dosageMl", () => {
  it("stronger tincture = smaller dose", () => {
    expect(dosageMl(5)).toBeLessThan(dosageMl(2));
  });
});

describe("strainLossPercent", () => {
  it("oil loses most", () => {
    expect(strainLossPercent("oil")).toBeGreaterThan(strainLossPercent("honey"));
  });
});

describe("storageTemp", () => {
  it("returns cool dark", () => {
    expect(storageTemp()).toBe("cool_dark");
  });
});

describe("costPerLiter", () => {
  it("honey is most expensive", () => {
    expect(costPerLiter("honey")).toBeGreaterThan(costPerLiter("vinegar"));
  });
});

describe("menstruumTypes", () => {
  it("returns 5 types", () => {
    expect(menstruumTypes()).toHaveLength(5);
  });
});
