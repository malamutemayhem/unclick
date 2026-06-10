import { describe, it, expect } from "vitest";
import {
  oxygenDelivery, waterEfficiency, setupComplexity, growthRate,
  maintenanceFrequency, requiresGrowMedia, suitableForLeafyGreens, nutrientDelivery,
  bestCrop, hydroponicSystems,
} from "../hydroponic-system-calc.js";

describe("oxygenDelivery", () => {
  it("aeroponics best oxygen delivery", () => {
    expect(oxygenDelivery("aeroponics")).toBeGreaterThan(oxygenDelivery("drip"));
  });
});

describe("waterEfficiency", () => {
  it("aeroponics most water efficient", () => {
    expect(waterEfficiency("aeroponics")).toBeGreaterThan(waterEfficiency("deep_water_culture"));
  });
});

describe("setupComplexity", () => {
  it("aeroponics most complex setup", () => {
    expect(setupComplexity("aeroponics")).toBeGreaterThan(setupComplexity("deep_water_culture"));
  });
});

describe("growthRate", () => {
  it("aeroponics fastest growth", () => {
    expect(growthRate("aeroponics")).toBeGreaterThan(growthRate("ebb_flow"));
  });
});

describe("maintenanceFrequency", () => {
  it("aeroponics most maintenance", () => {
    expect(maintenanceFrequency("aeroponics")).toBeGreaterThan(maintenanceFrequency("deep_water_culture"));
  });
});

describe("requiresGrowMedia", () => {
  it("ebb flow requires grow media", () => {
    expect(requiresGrowMedia("ebb_flow")).toBe(true);
  });
  it("deep water culture does not", () => {
    expect(requiresGrowMedia("deep_water_culture")).toBe(false);
  });
});

describe("suitableForLeafyGreens", () => {
  it("nutrient film suitable for leafy greens", () => {
    expect(suitableForLeafyGreens("nutrient_film")).toBe(true);
  });
  it("drip is not", () => {
    expect(suitableForLeafyGreens("drip")).toBe(false);
  });
});

describe("nutrientDelivery", () => {
  it("aeroponics is misted suspended root", () => {
    expect(nutrientDelivery("aeroponics")).toBe("misted_suspended_root");
  });
});

describe("bestCrop", () => {
  it("deep water culture for lettuce herb", () => {
    expect(bestCrop("deep_water_culture")).toBe("lettuce_herb_beginner");
  });
});

describe("hydroponicSystems", () => {
  it("returns 5 systems", () => {
    expect(hydroponicSystems()).toHaveLength(5);
  });
});
