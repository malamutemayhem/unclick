import { describe, it, expect } from "vitest";
import {
  airControl, heatEven, adjustEase, durability,
  ventCost, powered, topMount, ventStyle,
  bestUse, damperVents,
} from "../damper-vent-calc.js";

describe("airControl", () => {
  it("powered fan force best air control", () => {
    expect(airControl("powered_fan_force")).toBeGreaterThan(airControl("side_vent_cross"));
  });
});

describe("heatEven", () => {
  it("side vent cross most even heat", () => {
    expect(heatEven("side_vent_cross")).toBeGreaterThan(heatEven("damper_plate_slide"));
  });
});

describe("adjustEase", () => {
  it("damper plate slide easiest adjust", () => {
    expect(adjustEase("damper_plate_slide")).toBeGreaterThan(adjustEase("side_vent_cross"));
  });
});

describe("durability", () => {
  it("damper plate slide most durable", () => {
    expect(durability("damper_plate_slide")).toBeGreaterThan(durability("powered_fan_force"));
  });
});

describe("ventCost", () => {
  it("powered fan force most expensive", () => {
    expect(ventCost("powered_fan_force")).toBeGreaterThan(ventCost("bottom_vent_intake"));
  });
});

describe("powered", () => {
  it("powered fan force is powered", () => {
    expect(powered("powered_fan_force")).toBe(true);
  });
  it("top vent chimney not powered", () => {
    expect(powered("top_vent_chimney")).toBe(false);
  });
});

describe("topMount", () => {
  it("top vent chimney is top mount", () => {
    expect(topMount("top_vent_chimney")).toBe(true);
  });
  it("bottom vent intake not top mount", () => {
    expect(topMount("bottom_vent_intake")).toBe(false);
  });
});

describe("ventStyle", () => {
  it("powered fan force uses electric blower fan", () => {
    expect(ventStyle("powered_fan_force")).toBe("electric_blower_fan");
  });
});

describe("bestUse", () => {
  it("top vent chimney best for general exhaust draw", () => {
    expect(bestUse("top_vent_chimney")).toBe("general_exhaust_draw");
  });
});

describe("damperVents", () => {
  it("returns 5 types", () => {
    expect(damperVents()).toHaveLength(5);
  });
});
