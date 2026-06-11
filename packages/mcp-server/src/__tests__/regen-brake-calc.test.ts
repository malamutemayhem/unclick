import { describe, it, expect } from "vitest";
import {
  recovery, response, efficiency, smoothness,
  rbCost, gridFeed, forEv, storage,
  bestUse, regenBrakeTypes,
} from "../regen-brake-calc.js";

describe("recovery", () => {
  it("supercap kinetic highest recovery", () => {
    expect(recovery("supercap_kinetic")).toBeGreaterThan(recovery("series_dc_motor"));
  });
});

describe("response", () => {
  it("permanent magnet bldc fastest response", () => {
    expect(response("permanent_magnet_bldc")).toBeGreaterThan(response("series_dc_motor"));
  });
});

describe("efficiency", () => {
  it("supercap kinetic most efficient", () => {
    expect(efficiency("supercap_kinetic")).toBeGreaterThan(efficiency("series_dc_motor"));
  });
});

describe("smoothness", () => {
  it("permanent magnet bldc smoothest", () => {
    expect(smoothness("permanent_magnet_bldc")).toBeGreaterThan(smoothness("switched_reluctance"));
  });
});

describe("rbCost", () => {
  it("supercap kinetic most expensive", () => {
    expect(rbCost("supercap_kinetic")).toBeGreaterThan(rbCost("series_dc_motor"));
  });
});

describe("gridFeed", () => {
  it("ac induction vfd feeds grid", () => {
    expect(gridFeed("ac_induction_vfd")).toBe(true);
  });
  it("permanent magnet bldc no grid feed", () => {
    expect(gridFeed("permanent_magnet_bldc")).toBe(false);
  });
});

describe("forEv", () => {
  it("permanent magnet bldc for EV", () => {
    expect(forEv("permanent_magnet_bldc")).toBe(true);
  });
  it("series dc motor not for EV", () => {
    expect(forEv("series_dc_motor")).toBe(false);
  });
});

describe("storage", () => {
  it("supercap uses ultracapacitor flywheel", () => {
    expect(storage("supercap_kinetic")).toBe("ultracapacitor_flywheel_hybrid");
  });
});

describe("bestUse", () => {
  it("ac induction for elevator crane", () => {
    expect(bestUse("ac_induction_vfd")).toBe("elevator_crane_hoist_industrial");
  });
});

describe("regenBrakeTypes", () => {
  it("returns 5 types", () => {
    expect(regenBrakeTypes()).toHaveLength(5);
  });
});
