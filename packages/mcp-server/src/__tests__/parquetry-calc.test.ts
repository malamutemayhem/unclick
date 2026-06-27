import { describe, it, expect } from "vitest";
import {
  piecesPerM2, wastePercent, totalPieces, adhesiveKg,
  sandingGrit, finishCoats, expansionGapMm, acclimatizationDays,
  thicknessAfterSanding, installTimeHours, parquetPatterns,
} from "../parquetry-calc.js";

describe("piecesPerM2", () => {
  it("positive count", () => {
    expect(piecesPerM2(7, 50)).toBeGreaterThan(0);
  });
  it("zero width = 0", () => {
    expect(piecesPerM2(0, 50)).toBe(0);
  });
});

describe("wastePercent", () => {
  it("versailles most waste", () => {
    expect(wastePercent("versailles")).toBeGreaterThan(wastePercent("brick"));
  });
});

describe("totalPieces", () => {
  it("more than base", () => {
    expect(totalPieces(10, 30, 10)).toBeGreaterThan(300);
  });
});

describe("adhesiveKg", () => {
  it("1.2 kg per m2", () => {
    expect(adhesiveKg(10)).toBe(12);
  });
});

describe("sandingGrit", () => {
  it("coarser for first coat", () => {
    expect(sandingGrit(1)).toBeLessThan(sandingGrit(3));
  });
});

describe("finishCoats", () => {
  it("heavy traffic = 4", () => {
    expect(finishCoats("heavy")).toBe(4);
  });
});

describe("expansionGapMm", () => {
  it("1.5mm per meter", () => {
    expect(expansionGapMm(10)).toBe(15);
  });
});

describe("acclimatizationDays", () => {
  it("more for large humidity diff", () => {
    expect(acclimatizationDays(30)).toBeGreaterThan(acclimatizationDays(5));
  });
});

describe("thicknessAfterSanding", () => {
  it("decreases with sandings", () => {
    expect(thicknessAfterSanding(15, 3)).toBeLessThan(15);
  });
});

describe("installTimeHours", () => {
  it("versailles slowest", () => {
    expect(installTimeHours(20, "versailles")).toBeGreaterThan(installTimeHours(20, "brick"));
  });
});

describe("parquetPatterns", () => {
  it("returns 5 patterns", () => {
    expect(parquetPatterns()).toHaveLength(5);
  });
});
