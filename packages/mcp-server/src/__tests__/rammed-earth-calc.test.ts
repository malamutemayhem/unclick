import { describe, it, expect } from "vitest";
import {
  wallThicknessCm, compactionLayers, moistureContentPercent, compressiveStrengthMpa,
  dryingTimeDays, thermalMassKjPerM3K, shrinkagePercent, erosionResistance,
  costPerM3, soilMixes,
} from "../rammed-earth-calc.js";

describe("wallThicknessCm", () => {
  it("taller wall is thicker", () => {
    expect(wallThicknessCm(3)).toBeGreaterThan(wallThicknessCm(2));
  });
});

describe("compactionLayers", () => {
  it("taller wall has more layers", () => {
    expect(compactionLayers(3)).toBeGreaterThan(compactionLayers(1));
  });
});

describe("moistureContentPercent", () => {
  it("clay loam needs most moisture", () => {
    expect(moistureContentPercent("clay_loam")).toBeGreaterThan(
      moistureContentPercent("sandy_loam")
    );
  });
});

describe("compressiveStrengthMpa", () => {
  it("stabilized is strongest", () => {
    expect(compressiveStrengthMpa("stabilized")).toBeGreaterThan(
      compressiveStrengthMpa("chalky")
    );
  });
});

describe("dryingTimeDays", () => {
  it("thicker wall dries slower", () => {
    expect(dryingTimeDays(50)).toBeGreaterThan(dryingTimeDays(30));
  });
});

describe("thermalMassKjPerM3K", () => {
  it("clay loam has highest thermal mass", () => {
    expect(thermalMassKjPerM3K("clay_loam")).toBeGreaterThan(
      thermalMassKjPerM3K("chalky")
    );
  });
});

describe("shrinkagePercent", () => {
  it("clay loam shrinks most", () => {
    expect(shrinkagePercent("clay_loam")).toBeGreaterThan(
      shrinkagePercent("stabilized")
    );
  });
});

describe("erosionResistance", () => {
  it("stabilized has best erosion resistance", () => {
    expect(erosionResistance("stabilized")).toBeGreaterThan(
      erosionResistance("chalky")
    );
  });
});

describe("costPerM3", () => {
  it("stabilized is most expensive", () => {
    expect(costPerM3("stabilized")).toBeGreaterThan(costPerM3("chalky"));
  });
});

describe("soilMixes", () => {
  it("returns 5 mixes", () => {
    expect(soilMixes()).toHaveLength(5);
  });
});
