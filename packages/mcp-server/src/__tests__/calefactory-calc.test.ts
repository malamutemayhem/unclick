import { describe, it, expect } from "vitest";
import {
  floorAreaM2, hearthSizeCm, chimneySizeCm, fuelConsumptionKgPerDay,
  heatOutputBtu, ventilationOpenings, seatingCapacity,
  operatingHoursPerDay, maintenanceFrequencyDays, constructionCost, heatingSources,
} from "../calefactory-calc.js";

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(30)).toBeGreaterThan(10);
  });
});

describe("hearthSizeCm", () => {
  it("positive size", () => {
    expect(hearthSizeCm(64)).toBeGreaterThan(0);
  });
});

describe("chimneySizeCm", () => {
  it("40% of hearth", () => {
    expect(chimneySizeCm(120)).toBe(48);
  });
});

describe("fuelConsumptionKgPerDay", () => {
  it("hypocaust uses most fuel", () => {
    expect(fuelConsumptionKgPerDay(64, "hypocaust")).toBeGreaterThan(
      fuelConsumptionKgPerDay(64, "stove")
    );
  });
});

describe("heatOutputBtu", () => {
  it("hypocaust highest output", () => {
    expect(heatOutputBtu(64, "hypocaust")).toBeGreaterThan(heatOutputBtu(64, "brazier"));
  });
});

describe("ventilationOpenings", () => {
  it("at least 1", () => {
    expect(ventilationOpenings(10)).toBe(1);
  });
});

describe("seatingCapacity", () => {
  it("positive capacity", () => {
    expect(seatingCapacity(64)).toBeGreaterThan(0);
  });
});

describe("operatingHoursPerDay", () => {
  it("winter longer", () => {
    expect(operatingHoursPerDay("winter")).toBeGreaterThan(operatingHoursPerDay("summer"));
  });
});

describe("maintenanceFrequencyDays", () => {
  it("underfloor least frequent", () => {
    expect(maintenanceFrequencyDays("underfloor")).toBeGreaterThan(
      maintenanceFrequencyDays("fireplace")
    );
  });
});

describe("constructionCost", () => {
  it("underfloor most expensive", () => {
    expect(constructionCost(64, "underfloor", 500)).toBeGreaterThan(
      constructionCost(64, "brazier", 500)
    );
  });
});

describe("heatingSources", () => {
  it("returns 5 sources", () => {
    expect(heatingSources()).toHaveLength(5);
  });
});
