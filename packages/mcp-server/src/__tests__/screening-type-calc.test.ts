import { describe, it, expect } from "vitest";
import {
  capacity, accuracy, wearLife, moisture,
  scCost, moving, forWet, motion,
  bestUse, screeningTypes,
} from "../screening-type-calc.js";

describe("capacity", () => {
  it("banana highest capacity", () => {
    expect(capacity("banana_multi_slope")).toBeGreaterThan(capacity("dewatering_linear_motion"));
  });
});

describe("accuracy", () => {
  it("banana most accurate", () => {
    expect(accuracy("banana_multi_slope")).toBeGreaterThan(accuracy("grizzly_bar_static"));
  });
});

describe("wearLife", () => {
  it("grizzly longest wear life", () => {
    expect(wearLife("grizzly_bar_static")).toBeGreaterThan(wearLife("vibrating_inclined_wire"));
  });
});

describe("moisture", () => {
  it("dewatering best moisture removal", () => {
    expect(moisture("dewatering_linear_motion")).toBeGreaterThan(moisture("grizzly_bar_static"));
  });
});

describe("scCost", () => {
  it("banana most expensive", () => {
    expect(scCost("banana_multi_slope")).toBeGreaterThan(scCost("grizzly_bar_static"));
  });
});

describe("moving", () => {
  it("vibrating is moving", () => {
    expect(moving("vibrating_inclined_wire")).toBe(true);
  });
  it("grizzly not moving", () => {
    expect(moving("grizzly_bar_static")).toBe(false);
  });
});

describe("forWet", () => {
  it("banana for wet", () => {
    expect(forWet("banana_multi_slope")).toBe(true);
  });
  it("vibrating not for wet", () => {
    expect(forWet("vibrating_inclined_wire")).toBe(false);
  });
});

describe("motion", () => {
  it("trommel uses rotating drum tumble", () => {
    expect(motion("trommel_rotary_drum")).toBe("rotating_drum_tumble_screen");
  });
});

describe("bestUse", () => {
  it("dewatering best for tailings sand recovery", () => {
    expect(bestUse("dewatering_linear_motion")).toBe("tailings_dewater_sand_recovery");
  });
});

describe("screeningTypes", () => {
  it("returns 5 types", () => {
    expect(screeningTypes()).toHaveLength(5);
  });
});
