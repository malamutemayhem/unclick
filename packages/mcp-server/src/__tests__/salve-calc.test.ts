import { describe, it, expect } from "vitest";
import {
  oilVolumeMl, beeswaxWeightG, infusionTimeHours, infusionTempCelsius,
  essentialOilDrops, shelfLifeMonths, absorptionRate, containerSizeMl,
  costPerBatch, baseOils,
} from "../salve-calc.js";

describe("oilVolumeMl", () => {
  it("scales with batch weight", () => {
    expect(oilVolumeMl(200)).toBeGreaterThan(oilVolumeMl(100));
  });
});

describe("beeswaxWeightG", () => {
  it("15% of oil volume", () => {
    expect(beeswaxWeightG(100)).toBe(15);
  });
});

describe("infusionTimeHours", () => {
  it("solar takes longest", () => {
    expect(infusionTimeHours("solar")).toBeGreaterThan(infusionTimeHours("stovetop"));
  });
});

describe("infusionTempCelsius", () => {
  it("stovetop is hottest", () => {
    expect(infusionTempCelsius("stovetop")).toBeGreaterThan(infusionTempCelsius("solar"));
  });
});

describe("essentialOilDrops", () => {
  it("higher dilution = more drops", () => {
    expect(essentialOilDrops(100, 3)).toBeGreaterThan(essentialOilDrops(100, 1));
  });
});

describe("shelfLifeMonths", () => {
  it("jojoba lasts longest", () => {
    expect(shelfLifeMonths("jojoba")).toBeGreaterThan(shelfLifeMonths("almond"));
  });
});

describe("absorptionRate", () => {
  it("jojoba absorbs best", () => {
    expect(absorptionRate("jojoba")).toBeGreaterThan(absorptionRate("olive"));
  });
});

describe("containerSizeMl", () => {
  it("picks appropriate container", () => {
    expect(containerSizeMl(25)).toBe(30);
    expect(containerSizeMl(50)).toBe(60);
  });
});

describe("costPerBatch", () => {
  it("larger batch costs more", () => {
    expect(costPerBatch(20, 200)).toBeGreaterThan(costPerBatch(20, 100));
  });
});

describe("baseOils", () => {
  it("returns 5 oils", () => {
    expect(baseOils()).toHaveLength(5);
  });
});
