import { describe, it, expect } from "vitest";
import {
  capacity, flexibility, safety, installEase,
  bdCost, tapOff, forHighVoltage, conductor,
  bestUse, busDuctTypes,
} from "../bus-duct-calc.js";

describe("capacity", () => {
  it("isolated phase highest capacity", () => {
    expect(capacity("isolated_phase_ipb")).toBeGreaterThan(capacity("plug_in_tap_off"));
  });
});

describe("flexibility", () => {
  it("plug in most flexible", () => {
    expect(flexibility("plug_in_tap_off")).toBeGreaterThan(flexibility("isolated_phase_ipb"));
  });
});

describe("safety", () => {
  it("isolated phase safest", () => {
    expect(safety("isolated_phase_ipb")).toBeGreaterThan(safety("feeder_nonsegregated"));
  });
});

describe("installEase", () => {
  it("lighting track easiest", () => {
    expect(installEase("lighting_track_trolley")).toBeGreaterThan(installEase("isolated_phase_ipb"));
  });
});

describe("bdCost", () => {
  it("isolated phase most expensive", () => {
    expect(bdCost("isolated_phase_ipb")).toBeGreaterThan(bdCost("lighting_track_trolley"));
  });
});

describe("tapOff", () => {
  it("plug in has tap off", () => {
    expect(tapOff("plug_in_tap_off")).toBe(true);
  });
  it("feeder no tap off", () => {
    expect(tapOff("feeder_nonsegregated")).toBe(false);
  });
});

describe("forHighVoltage", () => {
  it("isolated phase for high voltage", () => {
    expect(forHighVoltage("isolated_phase_ipb")).toBe(true);
  });
  it("plug in not high voltage", () => {
    expect(forHighVoltage("plug_in_tap_off")).toBe(false);
  });
});

describe("conductor", () => {
  it("isolated uses aluminum tube", () => {
    expect(conductor("isolated_phase_ipb")).toBe("aluminum_tube_isolated_phase");
  });
});

describe("bestUse", () => {
  it("plug in for manufacturing", () => {
    expect(bestUse("plug_in_tap_off")).toBe("manufacturing_floor_flexible");
  });
});

describe("busDuctTypes", () => {
  it("returns 5 types", () => {
    expect(busDuctTypes()).toHaveLength(5);
  });
});
