import { describe, it, expect } from "vitest";
import {
  visibility, pressureRate, safety, maintenance,
  sgCost, nonContact, forHighPress, glass,
  bestUse, sightGlassTypes,
} from "../sight-glass-calc.js";

describe("visibility", () => {
  it("camera sight best visibility", () => {
    expect(visibility("camera_sight_remote")).toBeGreaterThan(visibility("bicolor_steam_boiler"));
  });
});

describe("pressureRate", () => {
  it("bicolor steam boiler highest pressure rating", () => {
    expect(pressureRate("bicolor_steam_boiler")).toBeGreaterThan(pressureRate("transparent_tubular"));
  });
});

describe("safety", () => {
  it("camera sight safest", () => {
    expect(safety("camera_sight_remote")).toBeGreaterThan(safety("transparent_tubular"));
  });
});

describe("maintenance", () => {
  it("magnetic level gauge easiest maintenance", () => {
    expect(maintenance("magnetic_level_gauge")).toBeGreaterThan(maintenance("camera_sight_remote"));
  });
});

describe("sgCost", () => {
  it("camera sight most expensive", () => {
    expect(sgCost("camera_sight_remote")).toBeGreaterThan(sgCost("transparent_tubular"));
  });
});

describe("nonContact", () => {
  it("magnetic level gauge is non contact", () => {
    expect(nonContact("magnetic_level_gauge")).toBe(true);
  });
  it("reflex flat glass not non contact", () => {
    expect(nonContact("reflex_flat_glass")).toBe(false);
  });
});

describe("forHighPress", () => {
  it("bicolor for high pressure", () => {
    expect(forHighPress("bicolor_steam_boiler")).toBe(true);
  });
  it("transparent tubular not for high pressure", () => {
    expect(forHighPress("transparent_tubular")).toBe(false);
  });
});

describe("glass", () => {
  it("magnetic uses no glass magnetic float", () => {
    expect(glass("magnetic_level_gauge")).toBe("no_glass_magnetic_float_indicator_flag");
  });
});

describe("bestUse", () => {
  it("camera sight for remote hazard zone", () => {
    expect(bestUse("camera_sight_remote")).toBe("remote_view_furnace_reactor_hazard_zone");
  });
});

describe("sightGlassTypes", () => {
  it("returns 5 types", () => {
    expect(sightGlassTypes()).toHaveLength(5);
  });
});
