import { describe, it, expect } from "vitest";
import {
  volumeLiters, wallThicknessCm, dryWeightKg, handleCount,
  neckDiameterCm, firingTemp, firingHours, sealantCoats,
  stackingCapacity, ageEstimate, clayTypes,
} from "../amphora-calc.js";

describe("volumeLiters", () => {
  it("positive liters", () => {
    expect(volumeLiters(60, 30)).toBeGreaterThan(0);
  });
});

describe("wallThicknessCm", () => {
  it("porcelain thinnest", () => {
    expect(wallThicknessCm(60, "porcelain")).toBeLessThan(wallThicknessCm(60, "earthenware"));
  });
});

describe("dryWeightKg", () => {
  it("positive kg", () => {
    expect(dryWeightKg(20, "stoneware")).toBeGreaterThan(0);
  });
});

describe("handleCount", () => {
  it("small = no handles", () => {
    expect(handleCount(3)).toBe(0);
  });
  it("large = 2 handles", () => {
    expect(handleCount(25)).toBe(2);
  });
});

describe("neckDiameterCm", () => {
  it("30% of body", () => {
    expect(neckDiameterCm(30)).toBeCloseTo(9, 0);
  });
});

describe("firingTemp", () => {
  it("porcelain hottest", () => {
    expect(firingTemp("porcelain")).toBeGreaterThan(firingTemp("terracotta"));
  });
});

describe("firingHours", () => {
  it("positive hours", () => {
    expect(firingHours(1)).toBeGreaterThan(0);
  });
});

describe("sealantCoats", () => {
  it("high porosity most coats", () => {
    expect(sealantCoats("high")).toBeGreaterThan(sealantCoats("low"));
  });
});

describe("stackingCapacity", () => {
  it("pointed base = 0", () => {
    expect(stackingCapacity(10, true)).toBe(0);
  });
  it("flat base positive", () => {
    expect(stackingCapacity(20, false)).toBeGreaterThan(0);
  });
});

describe("ageEstimate", () => {
  it("heavy patina = ancient", () => {
    expect(ageEstimate("heavy")).toBe("ancient");
  });
});

describe("clayTypes", () => {
  it("returns 4 types", () => {
    expect(clayTypes()).toHaveLength(4);
  });
});
