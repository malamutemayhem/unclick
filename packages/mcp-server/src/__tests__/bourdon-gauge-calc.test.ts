import { describe, it, expect } from "vitest";
import {
  accuracy, pressureRange, vibrationResist, readability,
  bgCost, localRead, forHighPress, tube,
  bestUse, bourdonGaugeTypes,
} from "../bourdon-gauge-calc.js";

describe("accuracy", () => {
  it("spiral tube most accurate", () => {
    expect(accuracy("spiral_tube_recorder")).toBeGreaterThan(accuracy("c_tube_standard"));
  });
});

describe("pressureRange", () => {
  it("helical tube highest pressure range", () => {
    expect(pressureRange("helical_tube_high_press")).toBeGreaterThan(pressureRange("spiral_tube_recorder"));
  });
});

describe("vibrationResist", () => {
  it("liquid filled best vibration resistance", () => {
    expect(vibrationResist("liquid_filled_damped")).toBeGreaterThan(vibrationResist("c_tube_standard"));
  });
});

describe("readability", () => {
  it("liquid filled best readability", () => {
    expect(readability("liquid_filled_damped")).toBeGreaterThan(readability("duplex_differential"));
  });
});

describe("bgCost", () => {
  it("duplex differential most expensive", () => {
    expect(bgCost("duplex_differential")).toBeGreaterThan(bgCost("c_tube_standard"));
  });
});

describe("localRead", () => {
  it("all bourdon gauges are local read", () => {
    expect(localRead("c_tube_standard")).toBe(true);
    expect(localRead("liquid_filled_damped")).toBe(true);
  });
});

describe("forHighPress", () => {
  it("helical tube for high pressure", () => {
    expect(forHighPress("helical_tube_high_press")).toBe(true);
  });
  it("c tube not for high pressure", () => {
    expect(forHighPress("c_tube_standard")).toBe(false);
  });
});

describe("tube", () => {
  it("liquid filled uses glycerin filled case", () => {
    expect(tube("liquid_filled_damped")).toBe("c_tube_glycerin_filled_case_dampen");
  });
});

describe("bestUse", () => {
  it("liquid filled for pump compressor", () => {
    expect(bestUse("liquid_filled_damped")).toBe("pump_compressor_vibrate_pulsate_smooth");
  });
});

describe("bourdonGaugeTypes", () => {
  it("returns 5 types", () => {
    expect(bourdonGaugeTypes()).toHaveLength(5);
  });
});
