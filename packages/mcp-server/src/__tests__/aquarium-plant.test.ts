import { describe, it, expect } from "vitest";
import {
  lightPar, photoperiod, co2Needed, co2BubbleRate,
  substrateDepth, fertilizerDose, trimInterval, plantsNeeded,
  growthRate, waterChange, ironDose, algaeRisk, plantTypes,
} from "../aquarium-plant.js";

describe("lightPar", () => {
  it("high has more PAR", () => {
    expect(lightPar("high").min).toBeGreaterThan(lightPar("low").min);
  });
});

describe("photoperiod", () => {
  it("low is shorter", () => {
    expect(photoperiod("low")).toBeLessThanOrEqual(photoperiod("medium"));
  });
});

describe("co2Needed", () => {
  it("true for high light", () => {
    expect(co2Needed("high")).toBe(true);
  });

  it("false for low light", () => {
    expect(co2Needed("low")).toBe(false);
  });
});

describe("co2BubbleRate", () => {
  it("positive rate", () => {
    expect(co2BubbleRate(120)).toBeGreaterThan(0);
  });
});

describe("substrateDepth", () => {
  it("0 for floating", () => {
    expect(substrateDepth("floating")).toBe(0);
  });

  it("rosette needs most", () => {
    expect(substrateDepth("rosette")).toBeGreaterThan(substrateDepth("carpet"));
  });
});

describe("fertilizerDose", () => {
  it("more for heavy load", () => {
    expect(fertilizerDose(100, "heavy")).toBeGreaterThan(fertilizerDose(100, "light"));
  });
});

describe("trimInterval", () => {
  it("floating most frequent", () => {
    expect(trimInterval("floating")).toBeLessThan(trimInterval("rhizome"));
  });
});

describe("plantsNeeded", () => {
  it("positive count", () => {
    expect(plantsNeeded(900, 5)).toBeGreaterThan(0);
  });

  it("0 for no spacing", () => {
    expect(plantsNeeded(900, 0)).toBe(0);
  });
});

describe("growthRate", () => {
  it("stem is fast", () => {
    expect(growthRate("stem")).toBe("fast");
  });
});

describe("waterChange", () => {
  it("more for heavy", () => {
    expect(waterChange("heavy")).toBeGreaterThan(waterChange("light"));
  });
});

describe("ironDose", () => {
  it("positive ml", () => {
    expect(ironDose(100)).toBeGreaterThan(0);
  });
});

describe("algaeRisk", () => {
  it("high with excess light no CO2", () => {
    expect(algaeRisk(12, false, "balanced")).toBe("high");
  });

  it("low with balanced setup", () => {
    expect(algaeRisk(8, true, "balanced")).toBe("low");
  });
});

describe("plantTypes", () => {
  it("returns 6 types", () => {
    expect(plantTypes()).toHaveLength(6);
  });
});
