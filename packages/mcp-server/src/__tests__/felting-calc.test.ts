import { describe, it, expect } from "vitest";
import {
  shrinkagePercent, preFeltSize, woolWeight, layerCount,
  fullingTime, needleGauge, waterTempC, soapAmount,
  fiberMicrons, feltability, dryingHours, feltMethods,
} from "../felting-calc.js";

describe("shrinkagePercent", () => {
  it("cobweb shrinks most", () => {
    expect(shrinkagePercent("cobweb")).toBeGreaterThan(shrinkagePercent("needle"));
  });
});

describe("preFeltSize", () => {
  it("larger than finished", () => {
    expect(preFeltSize(30, "wet")).toBeGreaterThan(30);
  });
});

describe("woolWeight", () => {
  it("positive grams", () => {
    expect(woolWeight(900, 3)).toBeGreaterThan(0);
  });
});

describe("layerCount", () => {
  it("wet = 4 layers", () => {
    expect(layerCount("wet")).toBe(4);
  });
});

describe("fullingTime", () => {
  it("positive minutes", () => {
    expect(fullingTime(1000)).toBeGreaterThan(0);
  });
});

describe("needleGauge", () => {
  it("fine = 40", () => {
    expect(needleGauge("fine")).toBe(40);
  });
  it("coarse = 36", () => {
    expect(needleGauge("coarse")).toBe(36);
  });
});

describe("waterTempC", () => {
  it("wet = 60C", () => {
    expect(waterTempC("wet")).toBe(60);
  });
  it("needle = 0", () => {
    expect(waterTempC("needle")).toBe(0);
  });
});

describe("soapAmount", () => {
  it("5ml per liter", () => {
    expect(soapAmount(2)).toBe(10);
  });
});

describe("fiberMicrons", () => {
  it("merino finest", () => {
    expect(fiberMicrons("merino")).toBeLessThan(fiberMicrons("romney"));
  });
});

describe("feltability", () => {
  it("merino best", () => {
    expect(feltability("merino")).toBeGreaterThan(feltability("alpaca"));
  });
});

describe("dryingHours", () => {
  it("thicker takes longer", () => {
    expect(dryingHours(5)).toBeGreaterThan(dryingHours(2));
  });
});

describe("feltMethods", () => {
  it("returns 4 methods", () => {
    expect(feltMethods()).toHaveLength(4);
  });
});
