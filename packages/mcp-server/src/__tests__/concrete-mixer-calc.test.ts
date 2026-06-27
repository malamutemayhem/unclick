import { describe, it, expect } from "vitest";
import {
  capacity, homogeneity, speed, flexibility,
  cmCost, mobile, forPrecast, action,
  bestUse, concreteMixerTypes,
} from "../concrete-mixer-calc.js";

describe("capacity", () => {
  it("twin shaft highest capacity", () => {
    expect(capacity("twin_shaft_horizontal")).toBeGreaterThan(capacity("pan_mixer_vertical"));
  });
});

describe("homogeneity", () => {
  it("twin shaft best homogeneity", () => {
    expect(homogeneity("twin_shaft_horizontal")).toBeGreaterThan(homogeneity("drum_truck_transit"));
  });
});

describe("speed", () => {
  it("twin shaft fastest", () => {
    expect(speed("twin_shaft_horizontal")).toBeGreaterThan(speed("drum_truck_transit"));
  });
});

describe("flexibility", () => {
  it("planetary most flexible", () => {
    expect(flexibility("planetary_counter_current")).toBeGreaterThan(flexibility("continuous_pugmill_flow"));
  });
});

describe("cmCost", () => {
  it("twin shaft most expensive", () => {
    expect(cmCost("twin_shaft_horizontal")).toBeGreaterThan(cmCost("pan_mixer_vertical"));
  });
});

describe("mobile", () => {
  it("drum truck is mobile", () => {
    expect(mobile("drum_truck_transit")).toBe(true);
  });
  it("twin shaft not mobile", () => {
    expect(mobile("twin_shaft_horizontal")).toBe(false);
  });
});

describe("forPrecast", () => {
  it("planetary for precast", () => {
    expect(forPrecast("planetary_counter_current")).toBe(true);
  });
  it("drum truck not for precast", () => {
    expect(forPrecast("drum_truck_transit")).toBe(false);
  });
});

describe("action", () => {
  it("planetary uses star counter revolve", () => {
    expect(action("planetary_counter_current")).toBe("planetary_star_counter_revolve");
  });
});

describe("bestUse", () => {
  it("drum truck for ready mix", () => {
    expect(bestUse("drum_truck_transit")).toBe("ready_mix_delivery_job_site");
  });
});

describe("concreteMixerTypes", () => {
  it("returns 5 types", () => {
    expect(concreteMixerTypes()).toHaveLength(5);
  });
});
