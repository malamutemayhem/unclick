import { describe, it, expect } from "vitest";
import {
  precision, pointCount, distance, reliability,
  lsCost_, oilMist, forCnc, pump,
  bestUse, lubricantSystemTypes,
} from "../lubricant-system-calc.js";

describe("precision", () => {
  it("MQL most precise", () => {
    expect(precision("minimal_quantity_mql")).toBeGreaterThan(precision("circulating_splash_bath"));
  });
});

describe("pointCount", () => {
  it("dual line highest point count", () => {
    expect(pointCount("dual_line_parallel")).toBeGreaterThan(pointCount("minimal_quantity_mql"));
  });
});

describe("distance", () => {
  it("dual line longest distance", () => {
    expect(distance("dual_line_parallel")).toBeGreaterThan(distance("minimal_quantity_mql"));
  });
});

describe("reliability", () => {
  it("circulating splash most reliable", () => {
    expect(reliability("circulating_splash_bath")).toBeGreaterThan(reliability("oil_mist_centralized"));
  });
});

describe("lsCost_", () => {
  it("dual line most expensive", () => {
    expect(lsCost_("dual_line_parallel")).toBeGreaterThan(lsCost_("circulating_splash_bath"));
  });
});

describe("oilMist", () => {
  it("oil mist centralized uses oil mist", () => {
    expect(oilMist("oil_mist_centralized")).toBe(true);
  });
  it("single line progressive no oil mist", () => {
    expect(oilMist("single_line_progressive")).toBe(false);
  });
});

describe("forCnc", () => {
  it("single line progressive for CNC", () => {
    expect(forCnc("single_line_progressive")).toBe(true);
  });
  it("dual line not for CNC", () => {
    expect(forCnc("dual_line_parallel")).toBe(false);
  });
});

describe("pump", () => {
  it("circulating splash uses gear pump", () => {
    expect(pump("circulating_splash_bath")).toBe("gear_pump_reservoir_filter_cooler");
  });
});

describe("bestUse", () => {
  it("oil mist for bearing housing spindle", () => {
    expect(bestUse("oil_mist_centralized")).toBe("bearing_housing_coupling_spindle");
  });
});

describe("lubricantSystemTypes", () => {
  it("returns 5 types", () => {
    expect(lubricantSystemTypes()).toHaveLength(5);
  });
});
