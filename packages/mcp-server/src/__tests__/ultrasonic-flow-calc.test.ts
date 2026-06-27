import { describe, it, expect } from "vitest";
import {
  accuracy, turndown, noObstruction, dirtHandle,
  ufCost, clampOn, forDirty, transducer,
  bestUse, ultrasonicFlowTypes,
} from "../ultrasonic-flow-calc.js";

describe("accuracy", () => {
  it("transit time inline most accurate", () => {
    expect(accuracy("transit_time_inline")).toBeGreaterThan(accuracy("doppler_suspended"));
  });
});

describe("turndown", () => {
  it("transit time inline best turndown", () => {
    expect(turndown("transit_time_inline")).toBeGreaterThan(turndown("doppler_suspended"));
  });
});

describe("noObstruction", () => {
  it("all ultrasonic types have high no-obstruction scores", () => {
    expect(noObstruction("transit_time_inline")).toBeGreaterThanOrEqual(8);
    expect(noObstruction("doppler_suspended")).toBeGreaterThanOrEqual(8);
  });
});

describe("dirtHandle", () => {
  it("doppler best at handling dirty fluids", () => {
    expect(dirtHandle("doppler_suspended")).toBeGreaterThan(dirtHandle("transit_time_inline"));
  });
});

describe("ufCost", () => {
  it("cross correlation most expensive", () => {
    expect(ufCost("cross_correlation")).toBeGreaterThan(ufCost("doppler_suspended"));
  });
});

describe("clampOn", () => {
  it("transit time clamp on is clamp on", () => {
    expect(clampOn("transit_time_clamp_on")).toBe(true);
  });
  it("transit time inline not clamp on", () => {
    expect(clampOn("transit_time_inline")).toBe(false);
  });
});

describe("forDirty", () => {
  it("doppler for dirty fluids", () => {
    expect(forDirty("doppler_suspended")).toBe(true);
  });
  it("transit time inline not for dirty", () => {
    expect(forDirty("transit_time_inline")).toBe(false);
  });
});

describe("transducer", () => {
  it("clamp on uses external transducer", () => {
    expect(transducer("transit_time_clamp_on")).toBe("external_clamp_on_no_process_intrusion");
  });
});

describe("bestUse", () => {
  it("doppler for slurry wastewater", () => {
    expect(bestUse("doppler_suspended")).toBe("slurry_wastewater_aerated_dirty_liquid");
  });
});

describe("ultrasonicFlowTypes", () => {
  it("returns 5 types", () => {
    expect(ultrasonicFlowTypes()).toHaveLength(5);
  });
});
