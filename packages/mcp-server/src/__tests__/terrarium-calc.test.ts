import { describe, it, expect } from "vitest";
import {
  containerVolume, drainageLayerDepth, charcoalLayerDepth,
  soilDepth, plantingDepth, soilAmount, gravelAmount,
  plantCount, wateringFrequency, lightRequirement,
  humidityLevel, temperatureRange, maintenanceInterval,
  costEstimate, terrariumTypes,
} from "../terrarium-calc.js";

describe("containerVolume", () => {
  it("cube = side^3", () => {
    expect(containerVolume("cube", 10)).toBe(1000);
  });

  it("sphere is positive", () => {
    expect(containerVolume("sphere", 20)).toBeGreaterThan(0);
  });

  it("bowl < sphere same dimension", () => {
    expect(containerVolume("bowl", 20)).toBeLessThan(containerVolume("sphere", 20));
  });
});

describe("drainageLayerDepth", () => {
  it("10% of height", () => {
    expect(drainageLayerDepth(30)).toBe(3);
  });
});

describe("charcoalLayerDepth", () => {
  it("1cm standard", () => {
    expect(charcoalLayerDepth()).toBe(1);
  });
});

describe("soilDepth", () => {
  it("25% of height", () => {
    expect(soilDepth(20)).toBe(5);
  });
});

describe("plantingDepth", () => {
  it("remaining space after layers", () => {
    expect(plantingDepth(30)).toBeGreaterThan(0);
    expect(plantingDepth(30)).toBeLessThan(30);
  });
});

describe("soilAmount", () => {
  it("positive liters", () => {
    expect(soilAmount(5000)).toBeGreaterThan(0);
  });
});

describe("gravelAmount", () => {
  it("less than soil", () => {
    expect(gravelAmount(5000)).toBeLessThan(soilAmount(5000));
  });
});

describe("plantCount", () => {
  it("at least 1", () => {
    expect(plantCount(10, "closed")).toBeGreaterThanOrEqual(1);
  });

  it("more in larger container", () => {
    expect(plantCount(30, "closed")).toBeGreaterThan(plantCount(10, "closed"));
  });
});

describe("wateringFrequency", () => {
  it("closed least frequent", () => {
    expect(wateringFrequency("closed").days).toBeGreaterThan(wateringFrequency("open").days);
  });
});

describe("lightRequirement", () => {
  it("succulent needs direct", () => {
    expect(lightRequirement("succulent")).toContain("direct");
  });
});

describe("humidityLevel", () => {
  it("closed is highest", () => {
    expect(humidityLevel("closed")).toBeGreaterThan(humidityLevel("succulent"));
  });
});

describe("temperatureRange", () => {
  it("all have positive ranges", () => {
    const r = temperatureRange("closed");
    expect(r.maxC).toBeGreaterThan(r.minC);
  });
});

describe("maintenanceInterval", () => {
  it("closed needs least maintenance", () => {
    expect(maintenanceInterval("closed")).toBeGreaterThan(maintenanceInterval("moss"));
  });
});

describe("costEstimate", () => {
  it("includes all components", () => {
    expect(costEstimate(30, 3, 5)).toBeGreaterThan(30);
  });
});

describe("terrariumTypes", () => {
  it("returns 6 types", () => {
    expect(terrariumTypes()).toHaveLength(6);
    expect(terrariumTypes()).toContain("closed");
  });
});
