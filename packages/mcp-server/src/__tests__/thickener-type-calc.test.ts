import { describe, it, expect } from "vitest";
import {
  underflow, overflow, footprint, energy,
  thCost, mechanical, forTailings, dewatering,
  bestUse, thickenerTypes,
} from "../thickener-type-calc.js";

describe("underflow", () => {
  it("paste thickener highest underflow", () => {
    expect(underflow("paste_deep_cone_ultra")).toBeGreaterThan(underflow("conventional_gravity_rake"));
  });
});

describe("overflow", () => {
  it("paste best overflow clarity", () => {
    expect(overflow("paste_deep_cone_ultra")).toBeGreaterThan(overflow("belt_filter_gravity_press"));
  });
});

describe("footprint", () => {
  it("centrifugal smallest footprint", () => {
    expect(footprint("centrifugal_decanter_scroll")).toBeGreaterThan(footprint("conventional_gravity_rake"));
  });
});

describe("energy", () => {
  it("conventional lowest energy", () => {
    expect(energy("conventional_gravity_rake")).toBeGreaterThan(energy("centrifugal_decanter_scroll"));
  });
});

describe("thCost", () => {
  it("paste most expensive", () => {
    expect(thCost("paste_deep_cone_ultra")).toBeGreaterThan(thCost("conventional_gravity_rake"));
  });
});

describe("mechanical", () => {
  it("belt filter is mechanical", () => {
    expect(mechanical("belt_filter_gravity_press")).toBe(true);
  });
  it("conventional not mechanical", () => {
    expect(mechanical("conventional_gravity_rake")).toBe(false);
  });
});

describe("forTailings", () => {
  it("paste for tailings", () => {
    expect(forTailings("paste_deep_cone_ultra")).toBe(true);
  });
  it("belt filter not for tailings", () => {
    expect(forTailings("belt_filter_gravity_press")).toBe(false);
  });
});

describe("dewatering", () => {
  it("centrifugal uses high g scroll", () => {
    expect(dewatering("centrifugal_decanter_scroll")).toBe("high_g_scroll_conveyor_bowl");
  });
});

describe("bestUse", () => {
  it("conventional for mineral tailings", () => {
    expect(bestUse("conventional_gravity_rake")).toBe("mineral_tailings_water_recovery");
  });
});

describe("thickenerTypes", () => {
  it("returns 5 types", () => {
    expect(thickenerTypes()).toHaveLength(5);
  });
});
