import { describe, it, expect } from "vitest";
import {
  radiusCm, arcDegrees, graduationCount, plumbLineLengthCm,
  sightVaneLengthCm, altitudeAccuracyArcMin, weightKg,
  materialRequired, constructionHours, costEstimate, quadrantTypes,
} from "../quadrant-calc.js";

describe("radiusCm", () => {
  it("mural is largest", () => {
    expect(radiusCm("mural")).toBeGreaterThan(radiusCm("portable"));
  });
});

describe("arcDegrees", () => {
  it("mural covers 90 degrees", () => {
    expect(arcDegrees("mural")).toBe(90);
  });
  it("gunners covers 45 degrees", () => {
    expect(arcDegrees("gunners")).toBe(45);
  });
});

describe("graduationCount", () => {
  it("quarter resolution has most marks", () => {
    expect(graduationCount(90, "quarter")).toBeGreaterThan(graduationCount(90, "degree"));
  });
  it("90 degrees at degree resolution = 90", () => {
    expect(graduationCount(90, "degree")).toBe(90);
  });
});

describe("plumbLineLengthCm", () => {
  it("10% longer than radius", () => {
    expect(plumbLineLengthCm(100)).toBeCloseTo(110, 0);
  });
});

describe("sightVaneLengthCm", () => {
  it("60% of radius", () => {
    expect(sightVaneLengthCm(100)).toBeCloseTo(60, 0);
  });
});

describe("altitudeAccuracyArcMin", () => {
  it("mural most accurate", () => {
    expect(altitudeAccuracyArcMin("mural")).toBeLessThan(altitudeAccuracyArcMin("horary"));
  });
});

describe("weightKg", () => {
  it("mural heaviest", () => {
    expect(weightKg("mural")).toBeGreaterThan(weightKg("portable"));
  });
});

describe("materialRequired", () => {
  it("mural uses stone", () => {
    expect(materialRequired("mural")).toBe("stone");
  });
  it("davis uses ebony", () => {
    expect(materialRequired("davis")).toBe("ebony");
  });
});

describe("constructionHours", () => {
  it("mural takes longest", () => {
    expect(constructionHours("mural")).toBeGreaterThan(constructionHours("horary"));
  });
});

describe("costEstimate", () => {
  it("mural most expensive", () => {
    expect(costEstimate("mural", 100)).toBeGreaterThan(costEstimate("horary", 100));
  });
});

describe("quadrantTypes", () => {
  it("returns 5 types", () => {
    expect(quadrantTypes()).toHaveLength(5);
  });
});
