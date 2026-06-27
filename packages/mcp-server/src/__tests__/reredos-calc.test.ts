import { describe, it, expect } from "vitest";
import {
  heightM, widthM, panelCount, nicheCount, figureCount,
  gildingAreaM2, weightKg, carvingHoursPerPanel,
  totalCarvingHours, restorationBudget, reredosMaterials,
} from "../reredos-calc.js";

describe("heightM", () => {
  it("60% of chancel", () => {
    expect(heightM(8)).toBe(4.8);
  });
});

describe("widthM", () => {
  it("1.5x altar", () => {
    expect(widthM(2)).toBe(3);
  });
});

describe("panelCount", () => {
  it("positive count", () => {
    expect(panelCount(3, 50)).toBeGreaterThan(0);
  });
  it("zero panel width = 0", () => {
    expect(panelCount(3, 0)).toBe(0);
  });
});

describe("nicheCount", () => {
  it("positive count", () => {
    expect(nicheCount(6)).toBeGreaterThan(0);
  });
});

describe("figureCount", () => {
  it("equals niches", () => {
    expect(figureCount(2)).toBe(2);
  });
});

describe("gildingAreaM2", () => {
  it("positive area", () => {
    expect(gildingAreaM2(14.4, 30)).toBeGreaterThan(0);
  });
});

describe("weightKg", () => {
  it("marble heaviest", () => {
    expect(weightKg(3, 4.8, 20, "marble")).toBeGreaterThan(weightKg(3, 4.8, 20, "wood"));
  });
});

describe("carvingHoursPerPanel", () => {
  it("marble slowest", () => {
    expect(carvingHoursPerPanel("marble")).toBeGreaterThan(carvingHoursPerPanel("painted"));
  });
});

describe("totalCarvingHours", () => {
  it("positive hours", () => {
    expect(totalCarvingHours(6, "stone")).toBeGreaterThan(0);
  });
});

describe("restorationBudget", () => {
  it("marble most expensive", () => {
    expect(restorationBudget(14.4, "marble")).toBeGreaterThan(restorationBudget(14.4, "wood"));
  });
});

describe("reredosMaterials", () => {
  it("returns 5 materials", () => {
    expect(reredosMaterials()).toHaveLength(5);
  });
});
