import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, windRange, reliability,
  wtCost, gearbox, forOffshore, generator,
  bestUse, windTurbineGenTypes,
} from "../wind-turbine-gen-calc.js";

describe("efficiency", () => {
  it("horizontal axis most efficient", () => {
    expect(efficiency("horizontal_axis_geared")).toBeGreaterThan(efficiency("vertical_axis_savonius"));
  });
});

describe("capacity", () => {
  it("horizontal axis direct and offshore floating highest capacity", () => {
    expect(capacity("horizontal_axis_direct")).toBeGreaterThan(capacity("vertical_axis_darrieus"));
    expect(capacity("offshore_floating")).toBeGreaterThan(capacity("vertical_axis_darrieus"));
  });
});

describe("windRange", () => {
  it("vertical axis savonius widest wind range", () => {
    expect(windRange("vertical_axis_savonius")).toBeGreaterThan(windRange("horizontal_axis_geared"));
  });
});

describe("reliability", () => {
  it("horizontal axis direct most reliable", () => {
    expect(reliability("horizontal_axis_direct")).toBeGreaterThan(reliability("horizontal_axis_geared"));
  });
});

describe("wtCost", () => {
  it("offshore floating most expensive", () => {
    expect(wtCost("offshore_floating")).toBeGreaterThan(wtCost("vertical_axis_savonius"));
  });
});

describe("gearbox", () => {
  it("horizontal axis geared has gearbox", () => {
    expect(gearbox("horizontal_axis_geared")).toBe(true);
  });
  it("horizontal axis direct no gearbox", () => {
    expect(gearbox("horizontal_axis_direct")).toBe(false);
  });
});

describe("forOffshore", () => {
  it("offshore floating for offshore", () => {
    expect(forOffshore("offshore_floating")).toBe(true);
  });
  it("vertical axis darrieus not for offshore", () => {
    expect(forOffshore("vertical_axis_darrieus")).toBe(false);
  });
});

describe("generator", () => {
  it("vertical axis savonius uses small permanent magnet", () => {
    expect(generator("vertical_axis_savonius")).toBe("small_permanent_magnet_savonius_drag_driven_self_start");
  });
});

describe("bestUse", () => {
  it("horizontal axis direct for offshore wind farm", () => {
    expect(bestUse("horizontal_axis_direct")).toBe("offshore_wind_farm_high_reliability_low_maintenance_8_15mw");
  });
});

describe("windTurbineGenTypes", () => {
  it("returns 5 types", () => {
    expect(windTurbineGenTypes()).toHaveLength(5);
  });
});
