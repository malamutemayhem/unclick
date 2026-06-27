import { describe, it, expect } from "vitest";
import {
  efficiency, headRange, flowRange, capacity,
  htCost, adjustable, forLowHead, runner,
  bestUse, hydroelectricTurbineTypes,
} from "../hydroelectric-turbine-calc.js";

describe("efficiency", () => {
  it("francis most efficient", () => {
    expect(efficiency("francis")).toBeGreaterThan(efficiency("crossflow_banki"));
  });
});

describe("headRange", () => {
  it("pelton widest head range", () => {
    expect(headRange("pelton")).toBeGreaterThan(headRange("bulb_tubular"));
  });
});

describe("flowRange", () => {
  it("kaplan and bulb tubular widest flow range", () => {
    expect(flowRange("kaplan")).toBeGreaterThan(flowRange("pelton"));
    expect(flowRange("bulb_tubular")).toBeGreaterThan(flowRange("pelton"));
  });
});

describe("capacity", () => {
  it("francis highest capacity", () => {
    expect(capacity("francis")).toBeGreaterThan(capacity("crossflow_banki"));
  });
});

describe("htCost", () => {
  it("bulb tubular most expensive", () => {
    expect(htCost("bulb_tubular")).toBeGreaterThan(htCost("crossflow_banki"));
  });
});

describe("adjustable", () => {
  it("kaplan is adjustable", () => {
    expect(adjustable("kaplan")).toBe(true);
  });
  it("pelton not adjustable", () => {
    expect(adjustable("pelton")).toBe(false);
  });
});

describe("forLowHead", () => {
  it("kaplan for low head", () => {
    expect(forLowHead("kaplan")).toBe(true);
  });
  it("francis not for low head", () => {
    expect(forLowHead("francis")).toBe(false);
  });
});

describe("runner", () => {
  it("pelton uses impulse bucket wheel", () => {
    expect(runner("pelton")).toBe("impulse_bucket_wheel_nozzle_jet_deflector_high_head");
  });
});

describe("bestUse", () => {
  it("crossflow banki for small micro hydro", () => {
    expect(bestUse("crossflow_banki")).toBe("small_hydro_micro_hydro_irrigation_canal_remote_village");
  });
});

describe("hydroelectricTurbineTypes", () => {
  it("returns 5 types", () => {
    expect(hydroelectricTurbineTypes()).toHaveLength(5);
  });
});
