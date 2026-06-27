import { describe, it, expect } from "vitest";
import {
  outerRadius, lobeRadius, cuspLength, openAreaCm2,
  perimeterCm, stoneBarWidth, carvingHours, glazingPanelCount,
  symmetryAxes, lightTransmissionPercent, foilCounts,
} from "../quatrefoil-calc.js";

describe("outerRadius", () => {
  it("larger than inscribed", () => {
    expect(outerRadius(20)).toBeGreaterThan(20);
  });
});

describe("lobeRadius", () => {
  it("positive radius", () => {
    expect(lobeRadius(20, 4)).toBeGreaterThan(0);
  });
});

describe("cuspLength", () => {
  it("60% of lobe", () => {
    expect(cuspLength(10)).toBe(6);
  });
});

describe("openAreaCm2", () => {
  it("positive area", () => {
    expect(openAreaCm2(20, 4)).toBeGreaterThan(0);
  });
});

describe("perimeterCm", () => {
  it("positive perimeter", () => {
    expect(perimeterCm(20, 4)).toBeGreaterThan(0);
  });
});

describe("stoneBarWidth", () => {
  it("6% of radius", () => {
    expect(stoneBarWidth(100)).toBe(6);
  });
});

describe("carvingHours", () => {
  it("more foils = more hours", () => {
    expect(carvingHours(8, 20)).toBeGreaterThan(carvingHours(3, 20));
  });
});

describe("glazingPanelCount", () => {
  it("foils + 1", () => {
    expect(glazingPanelCount(4)).toBe(5);
  });
});

describe("symmetryAxes", () => {
  it("equals foils", () => {
    expect(symmetryAxes(4)).toBe(4);
  });
});

describe("lightTransmissionPercent", () => {
  it("positive percent", () => {
    expect(lightTransmissionPercent(800, 1257)).toBeGreaterThan(0);
  });
  it("zero total = 0", () => {
    expect(lightTransmissionPercent(800, 0)).toBe(0);
  });
});

describe("foilCounts", () => {
  it("returns 5 counts", () => {
    expect(foilCounts()).toHaveLength(5);
  });
});
