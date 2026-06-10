import { describe, it, expect } from "vitest";
import {
  burnRate, maxDiameterCm, mushrooming,
  selfTrimming, crackling, sootProduction,
  bestWax, trimmingFrequency, costPerMeter, wickTypes,
} from "../candle-wick-calc.js";

describe("burnRate", () => {
  it("zinc core burns fastest", () => {
    expect(burnRate("zinc_core")).toBeGreaterThan(
      burnRate("hemp")
    );
  });
});

describe("maxDiameterCm", () => {
  it("wood handles largest diameter", () => {
    expect(maxDiameterCm("wood")).toBeGreaterThan(
      maxDiameterCm("hemp")
    );
  });
});

describe("mushrooming", () => {
  it("cotton flat mushrooms most", () => {
    expect(mushrooming("cotton_flat")).toBeGreaterThan(
      mushrooming("wood")
    );
  });
});

describe("selfTrimming", () => {
  it("wood is self trimming", () => {
    expect(selfTrimming("wood")).toBe(true);
  });
  it("cotton flat is not", () => {
    expect(selfTrimming("cotton_flat")).toBe(false);
  });
});

describe("crackling", () => {
  it("wood crackles", () => {
    expect(crackling("wood")).toBe(true);
  });
  it("cotton does not", () => {
    expect(crackling("cotton_flat")).toBe(false);
  });
});

describe("sootProduction", () => {
  it("zinc core produces most soot", () => {
    expect(sootProduction("zinc_core")).toBeGreaterThan(
      sootProduction("hemp")
    );
  });
});

describe("bestWax", () => {
  it("wood works best with soy", () => {
    expect(bestWax("wood")).toBe("soy");
  });
});

describe("trimmingFrequency", () => {
  it("cotton flat needs most trimming", () => {
    expect(trimmingFrequency("cotton_flat")).toBeGreaterThan(
      trimmingFrequency("wood")
    );
  });
});

describe("costPerMeter", () => {
  it("wood costs most", () => {
    expect(costPerMeter("wood")).toBeGreaterThan(
      costPerMeter("cotton_flat")
    );
  });
});

describe("wickTypes", () => {
  it("returns 5 types", () => {
    expect(wickTypes()).toHaveLength(5);
  });
});
