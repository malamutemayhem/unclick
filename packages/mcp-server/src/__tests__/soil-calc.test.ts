import { describe, it, expect } from "vitest";
import {
  classifySoil, soilProperties, availableWater, irrigationNeed,
  phCategory, limeNeeded, organicMatterRatio, compactionRisk,
  drainageClass, waterHoldingCapacity, percolationRate, soilTemperature,
} from "../soil-calc.js";

describe("classifySoil", () => {
  it("classifies sandy soil", () => {
    expect(classifySoil(92, 5, 3)).toBe("sand");
  });

  it("classifies clay soil", () => {
    expect(classifySoil(20, 20, 60)).toBe("clay");
  });

  it("classifies loam", () => {
    expect(classifySoil(40, 40, 20)).toBe("loam");
  });
});

describe("soilProperties", () => {
  it("returns properties for clay", () => {
    const props = soilProperties(20, 20, 60);
    expect(props.texture).toBe("clay");
    expect(props.fieldCapacity).toBeGreaterThan(0);
    expect(props.porosity).toBeGreaterThan(0);
  });

  it("sand has lower field capacity", () => {
    const sand = soilProperties(90, 5, 5);
    const clay = soilProperties(20, 20, 60);
    expect(sand.fieldCapacity).toBeLessThan(clay.fieldCapacity);
  });
});

describe("availableWater", () => {
  it("computes mm of available water", () => {
    const aw = availableWater(0.3, 0.1, 30);
    expect(aw).toBeCloseTo(60);
  });
});

describe("irrigationNeed", () => {
  it("returns positive when below field capacity", () => {
    expect(irrigationNeed(0.15, 0.3, 30)).toBeGreaterThan(0);
  });

  it("returns 0 when at field capacity", () => {
    expect(irrigationNeed(0.3, 0.3, 30)).toBe(0);
  });
});

describe("phCategory", () => {
  it("neutral at 7.0", () => {
    expect(phCategory(7.0)).toBe("neutral");
  });

  it("strongly acidic below 5.5", () => {
    expect(phCategory(5.0)).toBe("strongly acidic");
  });

  it("moderately alkaline at 8.0", () => {
    expect(phCategory(8.0)).toBe("moderately alkaline");
  });
});

describe("limeNeeded", () => {
  it("positive when pH too low", () => {
    expect(limeNeeded(5.5, 6.5, 100, 15)).toBeGreaterThan(0);
  });

  it("0 when at or above target", () => {
    expect(limeNeeded(7.0, 6.5, 100, 15)).toBe(0);
  });
});

describe("organicMatterRatio", () => {
  it("computes percentage", () => {
    expect(organicMatterRatio(5, 100)).toBe(5.0);
  });

  it("0 for empty", () => {
    expect(organicMatterRatio(0, 100)).toBe(0);
  });
});

describe("compactionRisk", () => {
  it("high for dense clay", () => {
    expect(compactionRisk(1.5, "clay")).toBe("high");
  });

  it("low for light sand", () => {
    expect(compactionRisk(1.4, "sand")).toBe("low");
  });
});

describe("drainageClass", () => {
  it("well drained for high conductivity", () => {
    expect(drainageClass(20)).toBe("well drained");
  });

  it("poorly drained for low conductivity", () => {
    expect(drainageClass(1)).toBe("poorly drained");
  });
});

describe("waterHoldingCapacity", () => {
  it("high for silt loam", () => {
    expect(waterHoldingCapacity("silt loam")).toBe("high");
  });

  it("low for sand", () => {
    expect(waterHoldingCapacity("sand")).toBe("low");
  });
});

describe("percolationRate", () => {
  it("higher for sandy soil", () => {
    const sandy = percolationRate(90, 5);
    const clayey = percolationRate(20, 60);
    expect(sandy).toBeGreaterThan(clayey);
  });
});

describe("soilTemperature", () => {
  it("returns a temperature", () => {
    const temp = soilTemperature(20, 10, 180);
    expect(typeof temp).toBe("number");
    expect(temp).toBeGreaterThan(-10);
    expect(temp).toBeLessThan(40);
  });
});
