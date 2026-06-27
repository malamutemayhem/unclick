import { describe, it, expect } from "vitest";
import {
  liftCapacity, setupSpeed, portability, stability,
  poleCost, telescopic, forHeavy, poleLength,
  bestUse, ginPoles,
} from "../gin-pole-calc.js";

describe("liftCapacity", () => {
  it("steel tube telescopic highest capacity", () => {
    expect(liftCapacity("steel_tube_telescopic")).toBeGreaterThan(liftCapacity("bamboo_lash_field"));
  });
});

describe("setupSpeed", () => {
  it("aluminum light portable fastest setup", () => {
    expect(setupSpeed("aluminum_light_portable")).toBeGreaterThan(setupSpeed("tripod_spread_stable"));
  });
});

describe("portability", () => {
  it("aluminum light portable most portable", () => {
    expect(portability("aluminum_light_portable")).toBeGreaterThan(portability("tripod_spread_stable"));
  });
});

describe("stability", () => {
  it("tripod spread stable most stable", () => {
    expect(stability("tripod_spread_stable")).toBeGreaterThan(stability("bamboo_lash_field"));
  });
});

describe("poleCost", () => {
  it("tripod spread stable most expensive", () => {
    expect(poleCost("tripod_spread_stable")).toBeGreaterThan(poleCost("bamboo_lash_field"));
  });
});

describe("telescopic", () => {
  it("steel tube telescopic is telescopic", () => {
    expect(telescopic("steel_tube_telescopic")).toBe(true);
  });
  it("wood mast standard not telescopic", () => {
    expect(telescopic("wood_mast_standard")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("steel tube telescopic is for heavy", () => {
    expect(forHeavy("steel_tube_telescopic")).toBe(true);
  });
  it("bamboo lash field not for heavy", () => {
    expect(forHeavy("bamboo_lash_field")).toBe(false);
  });
});

describe("poleLength", () => {
  it("tripod spread stable uses eighteen foot tri", () => {
    expect(poleLength("tripod_spread_stable")).toBe("eighteen_foot_tri");
  });
});

describe("bestUse", () => {
  it("tripod spread stable best for centered load lift", () => {
    expect(bestUse("tripod_spread_stable")).toBe("centered_load_lift");
  });
});

describe("ginPoles", () => {
  it("returns 5 types", () => {
    expect(ginPoles()).toHaveLength(5);
  });
});
