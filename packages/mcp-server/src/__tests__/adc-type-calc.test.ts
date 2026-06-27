import { describe, it, expect } from "vitest";
import {
  resolution, speed, powerEff, linearity,
  adcCost, multiplexed, forSensor, architecture,
  bestUse, adcTypes,
} from "../adc-type-calc.js";

describe("resolution", () => {
  it("delta sigma oversampled highest resolution", () => {
    expect(resolution("delta_sigma_oversampled")).toBeGreaterThan(resolution("flash_parallel"));
  });
});

describe("speed", () => {
  it("flash parallel fastest", () => {
    expect(speed("flash_parallel")).toBeGreaterThan(speed("dual_slope_integrating"));
  });
});

describe("powerEff", () => {
  it("sar successive most power efficient", () => {
    expect(powerEff("sar_successive")).toBeGreaterThan(powerEff("flash_parallel"));
  });
});

describe("linearity", () => {
  it("delta sigma oversampled best linearity", () => {
    expect(linearity("delta_sigma_oversampled")).toBeGreaterThan(linearity("flash_parallel"));
  });
});

describe("adcCost", () => {
  it("flash parallel most expensive", () => {
    expect(adcCost("flash_parallel")).toBeGreaterThan(adcCost("sar_successive"));
  });
});

describe("multiplexed", () => {
  it("sar successive is multiplexed", () => {
    expect(multiplexed("sar_successive")).toBe(true);
  });
  it("delta sigma oversampled not multiplexed", () => {
    expect(multiplexed("delta_sigma_oversampled")).toBe(false);
  });
});

describe("forSensor", () => {
  it("delta sigma oversampled for sensor", () => {
    expect(forSensor("delta_sigma_oversampled")).toBe(true);
  });
  it("flash parallel not for sensor", () => {
    expect(forSensor("flash_parallel")).toBe(false);
  });
});

describe("architecture", () => {
  it("flash parallel uses comparator ladder decode", () => {
    expect(architecture("flash_parallel")).toBe("comparator_ladder_decode");
  });
});

describe("bestUse", () => {
  it("dual slope integrating best for multimeter slow precision", () => {
    expect(bestUse("dual_slope_integrating")).toBe("multimeter_slow_precision");
  });
});

describe("adcTypes", () => {
  it("returns 5 types", () => {
    expect(adcTypes()).toHaveLength(5);
  });
});
