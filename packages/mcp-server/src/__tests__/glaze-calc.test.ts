import { describe, it, expect } from "vitest";
import {
  batchWeightG, waterMl, specificGravity, firingTemperatureCelsius,
  applicationCoats, dryingTimeHours, shrinkagePercent, crazingRisk,
  foodSafe, costPerKg, glazeFinishes,
} from "../glaze-calc.js";

describe("batchWeightG", () => {
  it("larger area = more weight", () => {
    expect(batchWeightG(500, 1)).toBeGreaterThan(batchWeightG(200, 1));
  });
  it("thicker = more weight", () => {
    expect(batchWeightG(300, 2)).toBeGreaterThan(batchWeightG(300, 1));
  });
});

describe("waterMl", () => {
  it("half dry weight", () => {
    expect(waterMl(100)).toBe(50);
  });
});

describe("specificGravity", () => {
  it("crystalline highest", () => {
    expect(specificGravity("crystalline")).toBeGreaterThan(specificGravity("ash"));
  });
});

describe("firingTemperatureCelsius", () => {
  it("ash highest temperature", () => {
    expect(firingTemperatureCelsius("ash")).toBeGreaterThan(firingTemperatureCelsius("matte"));
  });
});

describe("applicationCoats", () => {
  it("glossy needs most coats", () => {
    expect(applicationCoats("glossy")).toBeGreaterThan(applicationCoats("crystalline"));
  });
});

describe("dryingTimeHours", () => {
  it("more coats = longer drying", () => {
    expect(dryingTimeHours(3)).toBeGreaterThan(dryingTimeHours(2));
  });
});

describe("shrinkagePercent", () => {
  it("ash shrinks most", () => {
    expect(shrinkagePercent("ash")).toBeGreaterThan(shrinkagePercent("crystalline"));
  });
});

describe("crazingRisk", () => {
  it("crystalline highest risk", () => {
    expect(crazingRisk("crystalline")).toBeGreaterThan(crazingRisk("matte"));
  });
});

describe("foodSafe", () => {
  it("lead-free non-crystalline is safe", () => {
    expect(foodSafe("glossy", true)).toBe(true);
  });
  it("crystalline is not food safe", () => {
    expect(foodSafe("crystalline", true)).toBe(false);
  });
  it("leaded is not food safe", () => {
    expect(foodSafe("glossy", false)).toBe(false);
  });
});

describe("costPerKg", () => {
  it("crystalline most expensive", () => {
    expect(costPerKg("crystalline", 10)).toBeGreaterThan(costPerKg("matte", 10));
  });
});

describe("glazeFinishes", () => {
  it("returns 5 finishes", () => {
    expect(glazeFinishes()).toHaveLength(5);
  });
});
