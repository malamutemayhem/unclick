import { describe, it, expect } from "vitest";
import {
  efficiency, monitoring, shadeHandle, reliability,
  siCost, batteryReady, forResidential, topology,
  bestUse, solarInverters,
} from "../solar-inverter-calc.js";

describe("efficiency", () => {
  it("central utility most efficient", () => {
    expect(efficiency("central_utility_scale")).toBeGreaterThan(efficiency("micro_panel_level"));
  });
});

describe("monitoring", () => {
  it("micro panel best monitoring", () => {
    expect(monitoring("micro_panel_level")).toBeGreaterThan(monitoring("string_central_mppt"));
  });
});

describe("shadeHandle", () => {
  it("micro panel best shade handling", () => {
    expect(shadeHandle("micro_panel_level")).toBeGreaterThan(shadeHandle("central_utility_scale"));
  });
});

describe("reliability", () => {
  it("central utility most reliable", () => {
    expect(reliability("central_utility_scale")).toBeGreaterThan(reliability("micro_panel_level"));
  });
});

describe("siCost", () => {
  it("micro panel most expensive", () => {
    expect(siCost("micro_panel_level")).toBeGreaterThan(siCost("central_utility_scale"));
  });
});

describe("batteryReady", () => {
  it("hybrid is battery ready", () => {
    expect(batteryReady("hybrid_battery_coupled")).toBe(true);
  });
  it("string not battery ready", () => {
    expect(batteryReady("string_central_mppt")).toBe(false);
  });
});

describe("forResidential", () => {
  it("string for residential", () => {
    expect(forResidential("string_central_mppt")).toBe(true);
  });
  it("central utility not for residential", () => {
    expect(forResidential("central_utility_scale")).toBe(false);
  });
});

describe("topology", () => {
  it("hybrid uses bidirectional dc ac bms", () => {
    expect(topology("hybrid_battery_coupled")).toBe("bidirectional_dc_ac_bms");
  });
});

describe("bestUse", () => {
  it("micro panel best for complex roof", () => {
    expect(bestUse("micro_panel_level")).toBe("complex_roof_partial_shade");
  });
});

describe("solarInverters", () => {
  it("returns 5 types", () => {
    expect(solarInverters()).toHaveLength(5);
  });
});
