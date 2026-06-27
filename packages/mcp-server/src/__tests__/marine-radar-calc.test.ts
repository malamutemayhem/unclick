import { describe, it, expect } from "vitest";
import {
  range, resolution, clutterReject, targetTracking,
  mrCost, solidState, forCommercial, technology,
  bestUse, marineRadarTypes,
} from "../marine-radar-calc.js";

describe("range", () => {
  it("s band magnetron longest range", () => {
    expect(range("s_band_magnetron")).toBeGreaterThan(range("fmcw_broadband"));
  });
});

describe("resolution", () => {
  it("fmcw broadband best resolution", () => {
    expect(resolution("fmcw_broadband")).toBeGreaterThan(resolution("s_band_magnetron"));
  });
});

describe("clutterReject", () => {
  it("s band best clutter rejection", () => {
    expect(clutterReject("s_band_magnetron")).toBeGreaterThan(clutterReject("x_band_magnetron"));
  });
});

describe("targetTracking", () => {
  it("dual band best target tracking", () => {
    expect(targetTracking("dual_band")).toBeGreaterThan(targetTracking("x_band_magnetron"));
  });
});

describe("mrCost", () => {
  it("dual band most expensive", () => {
    expect(mrCost("dual_band")).toBeGreaterThan(mrCost("x_band_magnetron"));
  });
});

describe("solidState", () => {
  it("solid state x band is solid state", () => {
    expect(solidState("solid_state_x_band")).toBe(true);
  });
  it("x band magnetron not solid state", () => {
    expect(solidState("x_band_magnetron")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("s band magnetron for commercial", () => {
    expect(forCommercial("s_band_magnetron")).toBe(true);
  });
  it("fmcw broadband not for commercial", () => {
    expect(forCommercial("fmcw_broadband")).toBe(false);
  });
});

describe("technology", () => {
  it("dual band uses combined x s band", () => {
    expect(technology("dual_band")).toBe("combined_x_s_band_solid_state_integrated_display_arpa");
  });
});

describe("bestUse", () => {
  it("fmcw broadband for yacht leisure", () => {
    expect(bestUse("fmcw_broadband")).toBe("yacht_leisure_craft_low_power_bird_mode_close_range_detail");
  });
});

describe("marineRadarTypes", () => {
  it("returns 5 types", () => {
    expect(marineRadarTypes()).toHaveLength(5);
  });
});
