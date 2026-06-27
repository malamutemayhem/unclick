import { describe, it, expect } from "vitest";
import {
  formSizeCm, tanningTimeDays, boraxWeightG, wireGauge,
  glassEyeSize, dryingDays, formaldehydeMl, mountingBoardCm2,
  fillMaterialG, projectHours, preservationMethods,
} from "../taxidermy-calc.js";

describe("formSizeCm", () => {
  it("returns three dimensions", () => {
    const size = formSizeCm(30, 50);
    expect(size.height).toBe(30);
    expect(size.width).toBeGreaterThan(0);
    expect(size.depth).toBeGreaterThan(0);
  });
});

describe("tanningTimeDays", () => {
  it("3 days per mm", () => {
    expect(tanningTimeDays(5)).toBe(15);
  });
});

describe("boraxWeightG", () => {
  it("positive grams", () => {
    expect(boraxWeightG(1000)).toBeGreaterThan(0);
  });
});

describe("wireGauge", () => {
  it("thinner for light specimens", () => {
    expect(wireGauge(30)).toBeGreaterThan(wireGauge(5000));
  });
  it("heaviest = 12 gauge", () => {
    expect(wireGauge(10000)).toBe(12);
  });
});

describe("glassEyeSize", () => {
  it("15% of head width", () => {
    expect(glassEyeSize(10)).toBe(1.5);
  });
});

describe("dryingDays", () => {
  it("wet specimen = 0", () => {
    expect(dryingDays("wet_specimen", 5)).toBe(0);
  });
  it("positive for traditional", () => {
    expect(dryingDays("traditional", 2)).toBeGreaterThan(0);
  });
});

describe("formaldehydeMl", () => {
  it("10% of volume", () => {
    expect(formaldehydeMl(1000)).toBe(100);
  });
});

describe("mountingBoardCm2", () => {
  it("1.5x base area", () => {
    expect(mountingBoardCm2(20, 10)).toBe(300);
  });
});

describe("fillMaterialG", () => {
  it("30% of volume", () => {
    expect(fillMaterialG(1000)).toBe(300);
  });
});

describe("projectHours", () => {
  it("freeze dry fastest", () => {
    expect(projectHours(5, "freeze_dry")).toBeLessThan(projectHours(5, "traditional"));
  });
});

describe("preservationMethods", () => {
  it("returns 5 methods", () => {
    expect(preservationMethods()).toHaveLength(5);
  });
});
