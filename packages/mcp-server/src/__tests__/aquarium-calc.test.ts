import { describe, it, expect } from "vitest";
import {
  tankVolumeLiters, tankVolumeGallons, surfaceArea,
  glassThickness, waterWeight, totalWeight,
  stockingLevel, filterFlowRate, heaterWatts, lightingWatts,
  waterChangeVolume, cyclingStatus, waterQuality,
  co2Level, substrateVolume, compatibilityCheck,
} from "../aquarium-calc.js";

const TANK = { lengthCm: 60, widthCm: 30, heightCm: 36 };

describe("tankVolumeLiters / tankVolumeGallons", () => {
  it("computes liters", () => {
    expect(tankVolumeLiters(TANK)).toBeCloseTo(64.8, 0);
  });

  it("computes gallons", () => {
    expect(tankVolumeGallons(TANK)).toBeGreaterThan(15);
  });
});

describe("surfaceArea", () => {
  it("computes surface area", () => {
    expect(surfaceArea(TANK)).toBe(1800);
  });
});

describe("glassThickness", () => {
  it("4mm for small tanks", () => {
    expect(glassThickness(25, 30)).toBe(4);
  });

  it("thicker for taller tanks", () => {
    expect(glassThickness(60, 90)).toBeGreaterThanOrEqual(10);
  });
});

describe("waterWeight", () => {
  it("1L = 1kg", () => {
    expect(waterWeight(100)).toBe(100);
  });
});

describe("totalWeight", () => {
  it("includes glass and water", () => {
    const total = totalWeight(TANK, 6);
    expect(total).toBeGreaterThan(tankVolumeLiters(TANK));
  });
});

describe("stockingLevel", () => {
  it("cm rule", () => {
    expect(stockingLevel(100)).toBe(50);
  });
});

describe("filterFlowRate", () => {
  it("4x turnover", () => {
    expect(filterFlowRate(100)).toBe(400);
  });
});

describe("heaterWatts", () => {
  it("positive wattage", () => {
    expect(heaterWatts(100)).toBeGreaterThan(0);
  });
});

describe("lightingWatts", () => {
  it("higher for high light", () => {
    const low = lightingWatts(TANK, "low");
    const high = lightingWatts(TANK, "high");
    expect(high).toBeGreaterThan(low);
  });
});

describe("waterChangeVolume", () => {
  it("25% of 100L = 25L", () => {
    expect(waterChangeVolume(100, 25)).toBe(25);
  });
});

describe("cyclingStatus", () => {
  it("beginning with ammonia only", () => {
    expect(cyclingStatus(2, 0, 0)).toBe("beginning");
  });

  it("cycled when only nitrate", () => {
    expect(cyclingStatus(0, 0, 20)).toBe("cycled");
  });
});

describe("waterQuality", () => {
  it("excellent for clean water", () => {
    expect(waterQuality({ temperature: 25, ph: 7, ammonia: 0, nitrite: 0, nitrate: 5, gh: 8, kh: 4 })).toBe("excellent");
  });

  it("dangerous with ammonia", () => {
    expect(waterQuality({ temperature: 25, ph: 7, ammonia: 1, nitrite: 0, nitrate: 5, gh: 8, kh: 4 })).toBe("dangerous");
  });
});

describe("co2Level", () => {
  it("positive result", () => {
    expect(co2Level(4, 6.8)).toBeGreaterThan(0);
  });
});

describe("substrateVolume", () => {
  it("computes substrate volume", () => {
    expect(substrateVolume(TANK, 5)).toBeGreaterThan(0);
  });
});

describe("compatibilityCheck", () => {
  it("compatible overlapping ranges", () => {
    expect(compatibilityCheck([22, 28], [24, 30], [6.5, 7.5], [6.8, 8.0])).toBe(true);
  });

  it("incompatible non-overlapping", () => {
    expect(compatibilityCheck([22, 24], [28, 32], [6.5, 7.5], [6.8, 8.0])).toBe(false);
  });
});
