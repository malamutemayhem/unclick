import { describe, it, expect } from "vitest";
import {
  capacity, adjustability, weight, speed,
  shCost, adjustable, forSlab, mechanism,
  bestUse, shoringPropTypes,
} from "../shoring-prop-calc.js";

describe("capacity", () => {
  it("hydraulic jack highest capacity", () => {
    expect(capacity("hydraulic_jack_heavy_lift")).toBeGreaterThan(capacity("timber_deadshore_needle"));
  });
});

describe("adjustability", () => {
  it("hydraulic jack most adjustable", () => {
    expect(adjustability("hydraulic_jack_heavy_lift")).toBeGreaterThan(adjustability("timber_deadshore_needle"));
  });
});

describe("weight", () => {
  it("aluminum lightest", () => {
    expect(weight("aluminum_post_shore_light")).toBeGreaterThan(weight("hydraulic_jack_heavy_lift"));
  });
});

describe("speed", () => {
  it("flying table fastest", () => {
    expect(speed("flying_table_form_slab")).toBeGreaterThan(speed("timber_deadshore_needle"));
  });
});

describe("shCost", () => {
  it("hydraulic jack most expensive", () => {
    expect(shCost("hydraulic_jack_heavy_lift")).toBeGreaterThan(shCost("timber_deadshore_needle"));
  });
});

describe("adjustable", () => {
  it("steel acrow is adjustable", () => {
    expect(adjustable("steel_acrow_adjustable")).toBe(true);
  });
  it("timber deadshore not adjustable", () => {
    expect(adjustable("timber_deadshore_needle")).toBe(false);
  });
});

describe("forSlab", () => {
  it("flying table for slab", () => {
    expect(forSlab("flying_table_form_slab")).toBe(true);
  });
  it("hydraulic jack not for slab", () => {
    expect(forSlab("hydraulic_jack_heavy_lift")).toBe(false);
  });
});

describe("mechanism", () => {
  it("aluminum uses trigger release", () => {
    expect(mechanism("aluminum_post_shore_light")).toBe("trigger_release_rapid_adjust");
  });
});

describe("bestUse", () => {
  it("flying table for repetitive floor", () => {
    expect(bestUse("flying_table_form_slab")).toBe("repetitive_floor_slab_cycle_fast");
  });
});

describe("shoringPropTypes", () => {
  it("returns 5 types", () => {
    expect(shoringPropTypes()).toHaveLength(5);
  });
});
