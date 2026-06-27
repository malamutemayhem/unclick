import { describe, it, expect } from "vitest";
import {
  basinDiameterCm, basinDepthCm, basinVolumeMl, drainDiameterCm,
  nicheHeightCm, shelfWidthCm, carvingHours, stoneWeightKg,
  consecrationRequired, restorationCost, piscinaShapes,
} from "../piscina-calc.js";

describe("basinDiameterCm", () => {
  it("60% of niche width", () => {
    expect(basinDiameterCm(30)).toBe(18);
  });
});

describe("basinDepthCm", () => {
  it("40% of diameter", () => {
    expect(basinDepthCm(18)).toBe(7.2);
  });
});

describe("basinVolumeMl", () => {
  it("positive volume", () => {
    expect(basinVolumeMl(18, 7.2, "round")).toBeGreaterThan(0);
  });
  it("rectangular differs from round", () => {
    expect(basinVolumeMl(18, 7.2, "rectangular")).not.toBe(basinVolumeMl(18, 7.2, "round"));
  });
});

describe("drainDiameterCm", () => {
  it("10% of basin", () => {
    expect(drainDiameterCm(18)).toBe(1.8);
  });
});

describe("nicheHeightCm", () => {
  it("1.8x width", () => {
    expect(nicheHeightCm(30)).toBe(54);
  });
});

describe("shelfWidthCm", () => {
  it("15% of niche width", () => {
    expect(shelfWidthCm(30)).toBe(4.5);
  });
});

describe("carvingHours", () => {
  it("quatrefoil longest", () => {
    expect(carvingHours("quatrefoil")).toBeGreaterThan(carvingHours("rectangular"));
  });
});

describe("stoneWeightKg", () => {
  it("positive weight", () => {
    expect(stoneWeightKg(30, 54, 20)).toBeGreaterThan(0);
  });
});

describe("consecrationRequired", () => {
  it("always true", () => {
    expect(consecrationRequired()).toBe(true);
  });
});

describe("restorationCost", () => {
  it("quatrefoil most expensive", () => {
    expect(restorationCost("quatrefoil", 500)).toBeGreaterThan(restorationCost("rectangular", 500));
  });
});

describe("piscinaShapes", () => {
  it("returns 5 shapes", () => {
    expect(piscinaShapes()).toHaveLength(5);
  });
});
