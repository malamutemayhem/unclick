import { describe, it, expect } from "vitest";
import {
  heightM, widthM, bayCount, traceryPanelCount,
  loftDepthCm, crucifixHeightM, timberVolumeM3, paintedPanelCount,
  carvingHours, restorationBudget, roodScreenStyles,
} from "../rood-screen-calc.js";

describe("heightM", () => {
  it("70% of chancel arch", () => {
    expect(heightM(5)).toBe(3.5);
  });
});

describe("widthM", () => {
  it("equals nave width", () => {
    expect(widthM(8)).toBe(8);
  });
});

describe("bayCount", () => {
  it("positive count", () => {
    expect(bayCount(8, 80)).toBeGreaterThan(0);
  });
  it("zero bay width = 0", () => {
    expect(bayCount(8, 0)).toBe(0);
  });
});

describe("traceryPanelCount", () => {
  it("bays times tiers", () => {
    expect(traceryPanelCount(10, 3)).toBe(30);
  });
});

describe("loftDepthCm", () => {
  it("20% of height", () => {
    expect(loftDepthCm(3.5)).toBe(70);
  });
});

describe("crucifixHeightM", () => {
  it("60% of screen height", () => {
    expect(crucifixHeightM(3.5)).toBe(2.1);
  });
});

describe("timberVolumeM3", () => {
  it("positive volume", () => {
    expect(timberVolumeM3(8, 3.5, 30)).toBeGreaterThan(0);
  });
});

describe("paintedPanelCount", () => {
  it("2x bay count", () => {
    expect(paintedPanelCount(10)).toBe(20);
  });
});

describe("carvingHours", () => {
  it("flamboyant longest", () => {
    expect(carvingHours("flamboyant", 8)).toBeGreaterThan(carvingHours("early_english", 8));
  });
});

describe("restorationBudget", () => {
  it("flamboyant most expensive", () => {
    expect(restorationBudget("flamboyant", 8, 50)).toBeGreaterThan(
      restorationBudget("early_english", 8, 50)
    );
  });
});

describe("roodScreenStyles", () => {
  it("returns 5 styles", () => {
    expect(roodScreenStyles()).toHaveLength(5);
  });
});
