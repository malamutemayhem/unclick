import { describe, it, expect } from "vitest";
import {
  yieldPerSqFt, startupCost, energyUsage, scalability,
  automationLevel, usesSunlight, relocatable, climateSystem,
  bestCrop, verticalFarms,
} from "../vertical-farm-calc.js";

describe("yieldPerSqFt", () => {
  it("warehouse highest yield", () => {
    expect(yieldPerSqFt("warehouse")).toBeGreaterThan(yieldPerSqFt("building_integrated"));
  });
});

describe("startupCost", () => {
  it("warehouse most expensive startup", () => {
    expect(startupCost("warehouse")).toBeGreaterThan(startupCost("modular_rack"));
  });
});

describe("energyUsage", () => {
  it("warehouse most energy", () => {
    expect(energyUsage("warehouse")).toBeGreaterThan(energyUsage("greenhouse_hybrid"));
  });
});

describe("scalability", () => {
  it("warehouse most scalable", () => {
    expect(scalability("warehouse")).toBeGreaterThan(scalability("building_integrated"));
  });
});

describe("automationLevel", () => {
  it("warehouse most automated", () => {
    expect(automationLevel("warehouse")).toBeGreaterThan(automationLevel("building_integrated"));
  });
});

describe("usesSunlight", () => {
  it("greenhouse hybrid uses sunlight", () => {
    expect(usesSunlight("greenhouse_hybrid")).toBe(true);
  });
  it("warehouse does not", () => {
    expect(usesSunlight("warehouse")).toBe(false);
  });
});

describe("relocatable", () => {
  it("container farm is relocatable", () => {
    expect(relocatable("container_farm")).toBe(true);
  });
  it("warehouse is not", () => {
    expect(relocatable("warehouse")).toBe(false);
  });
});

describe("climateSystem", () => {
  it("warehouse uses industrial hvac", () => {
    expect(climateSystem("warehouse")).toBe("industrial_hvac_dehumidify");
  });
});

describe("bestCrop", () => {
  it("modular rack for microgreen sprout", () => {
    expect(bestCrop("modular_rack")).toBe("microgreen_sprout");
  });
});

describe("verticalFarms", () => {
  it("returns 5 farms", () => {
    expect(verticalFarms()).toHaveLength(5);
  });
});
