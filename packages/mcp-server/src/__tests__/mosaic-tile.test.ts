import { describe, it, expect } from "vitest";
import {
  tesseraeCount, groutKg, adhesiveLiters, colorCount,
  cuttingWaste, installTimeHours, weightKg, sealerCoats,
  patternRepeatCm, tesseraMaterials,
} from "../mosaic-tile.js";

describe("tesseraeCount", () => {
  it("positive count", () => {
    expect(tesseraeCount(10000, 10)).toBeGreaterThan(0);
  });
  it("zero size = 0", () => {
    expect(tesseraeCount(10000, 0)).toBe(0);
  });
});

describe("groutKg", () => {
  it("positive kg", () => {
    expect(groutKg(10000, 2, 5)).toBeGreaterThan(0);
  });
});

describe("adhesiveLiters", () => {
  it("positive liters", () => {
    expect(adhesiveLiters(10000, 3)).toBeGreaterThan(0);
  });
});

describe("colorCount", () => {
  it("photorealistic most colors", () => {
    expect(colorCount("photorealistic")).toBeGreaterThan(colorCount("simple"));
  });
});

describe("cuttingWaste", () => {
  it("stone most waste", () => {
    expect(cuttingWaste("stone")).toBeGreaterThan(cuttingWaste("ceramic"));
  });
});

describe("installTimeHours", () => {
  it("master fastest", () => {
    expect(installTimeHours(1000, "master")).toBeLessThan(installTimeHours(1000, "novice"));
  });
});

describe("weightKg", () => {
  it("positive kg", () => {
    expect(weightKg(10000, "marble", 8)).toBeGreaterThan(0);
  });
});

describe("sealerCoats", () => {
  it("underwater most coats", () => {
    expect(sealerCoats("underwater")).toBeGreaterThan(sealerCoats("indoor"));
  });
});

describe("patternRepeatCm", () => {
  it("halved with 2-fold symmetry", () => {
    expect(patternRepeatCm(20, 2)).toBe(10);
  });
});

describe("tesseraMaterials", () => {
  it("returns 5 materials", () => {
    expect(tesseraMaterials()).toHaveLength(5);
  });
});
