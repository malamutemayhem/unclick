import { describe, it, expect } from "vitest";
import {
  coneTemp, glazeThickness, glazeAmount, shrinkagePercent,
  finalSize, firingTime, electricityCost, batchCapacity,
  dryingDays, silicaFluxRatio, defectRisk, glazeTypes,
} from "../pottery-glaze.js";

describe("coneTemp", () => {
  it("cone 06 is 999C", () => {
    expect(coneTemp("06")).toBe(999);
  });
  it("cone 10 is 1285C", () => {
    expect(coneTemp("10")).toBe(1285);
  });
});

describe("glazeThickness", () => {
  it("positive mm", () => {
    expect(glazeThickness(2, 1.4)).toBeGreaterThan(0);
  });
  it("more coats = thicker", () => {
    expect(glazeThickness(3, 1.4)).toBeGreaterThan(glazeThickness(1, 1.4));
  });
});

describe("glazeAmount", () => {
  it("positive ml", () => {
    expect(glazeAmount(500, 2)).toBeGreaterThan(0);
  });
});

describe("shrinkagePercent", () => {
  it("higher cone = more shrinkage", () => {
    expect(shrinkagePercent("10")).toBeGreaterThan(shrinkagePercent("06"));
  });
});

describe("finalSize", () => {
  it("smaller than green", () => {
    expect(finalSize(10, 10)).toBeLessThan(10);
  });
  it("10cm with 10% = 9cm", () => {
    expect(finalSize(10, 10)).toBe(9);
  });
});

describe("firingTime", () => {
  it("positive hours", () => {
    expect(firingTime(100, "06")).toBeGreaterThan(0);
  });
});

describe("electricityCost", () => {
  it("positive cost", () => {
    expect(electricityCost(10, 8, 0.15)).toBeGreaterThan(0);
  });
});

describe("batchCapacity", () => {
  it("positive pieces", () => {
    expect(batchCapacity(50, 60, 10)).toBeGreaterThan(0);
  });
});

describe("dryingDays", () => {
  it("at least 1 day", () => {
    expect(dryingDays(0.5, 50)).toBeGreaterThanOrEqual(1);
  });
  it("higher humidity = more days", () => {
    expect(dryingDays(1, 80)).toBeGreaterThan(dryingDays(1, 20));
  });
});

describe("silicaFluxRatio", () => {
  it("computes ratio", () => {
    expect(silicaFluxRatio(300, 100)).toBe(3);
  });
  it("zero flux returns 0", () => {
    expect(silicaFluxRatio(300, 0)).toBe(0);
  });
});

describe("defectRisk", () => {
  it("too thick is high risk", () => {
    expect(defectRisk(3, "06")).toContain("high");
  });
  it("normal thickness is normal", () => {
    expect(defectRisk(1, "06")).toBe("normal");
  });
});

describe("glazeTypes", () => {
  it("returns 6 types", () => {
    expect(glazeTypes()).toHaveLength(6);
  });
});
