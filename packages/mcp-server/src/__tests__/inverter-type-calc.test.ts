import { describe, it, expect } from "vitest";
import {
  efficiency, reliability, monitoring, scalability,
  ivCost, batteryReady, forResidential, topology,
  bestUse, inverterTypes,
} from "../inverter-type-calc.js";

describe("efficiency", () => {
  it("microinverter high efficiency", () => {
    expect(efficiency("microinverter_panel_level")).toBeGreaterThan(efficiency("off_grid_standalone"));
  });
});

describe("reliability", () => {
  it("string central most reliable", () => {
    expect(reliability("string_central_utility")).toBeGreaterThan(reliability("off_grid_standalone"));
  });
});

describe("monitoring", () => {
  it("microinverter best monitoring", () => {
    expect(monitoring("microinverter_panel_level")).toBeGreaterThan(monitoring("off_grid_standalone"));
  });
});

describe("scalability", () => {
  it("string central most scalable", () => {
    expect(scalability("string_central_utility")).toBeGreaterThan(scalability("off_grid_standalone"));
  });
});

describe("ivCost", () => {
  it("hybrid most expensive", () => {
    expect(ivCost("hybrid_battery_ready")).toBeGreaterThan(ivCost("string_central_utility"));
  });
});

describe("batteryReady", () => {
  it("hybrid is battery ready", () => {
    expect(batteryReady("hybrid_battery_ready")).toBe(true);
  });
  it("string not battery ready", () => {
    expect(batteryReady("string_central_utility")).toBe(false);
  });
});

describe("forResidential", () => {
  it("microinverter for residential", () => {
    expect(forResidential("microinverter_panel_level")).toBe(true);
  });
  it("string not residential", () => {
    expect(forResidential("string_central_utility")).toBe(false);
  });
});

describe("topology", () => {
  it("hybrid uses dc coupled", () => {
    expect(topology("hybrid_battery_ready")).toBe("hybrid_dc_coupled_batt_mppt");
  });
});

describe("bestUse", () => {
  it("off grid for remote cabin", () => {
    expect(bestUse("off_grid_standalone")).toBe("remote_cabin_off_grid_power");
  });
});

describe("inverterTypes", () => {
  it("returns 5 types", () => {
    expect(inverterTypes()).toHaveLength(5);
  });
});
