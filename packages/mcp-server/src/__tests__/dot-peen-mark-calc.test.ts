import { describe, it, expect } from "vitest";
import {
  depth, speed, readability, noise,
  dpCost, portable, forTraceability, actuator,
  bestUse, dotPeenMarkTypes,
} from "../dot-peen-mark-calc.js";

describe("depth", () => {
  it("pneumatic deepest mark", () => {
    expect(depth("pneumatic_single_pin")).toBeGreaterThan(depth("scribe_drag_continuous"));
  });
});

describe("speed", () => {
  it("integrated inline fastest", () => {
    expect(speed("integrated_inline_auto")).toBeGreaterThan(speed("portable_handheld_battery"));
  });
});

describe("readability", () => {
  it("integrated inline best readability", () => {
    expect(readability("integrated_inline_auto")).toBeGreaterThan(readability("scribe_drag_continuous"));
  });
});

describe("noise", () => {
  it("scribe quietest", () => {
    expect(noise("scribe_drag_continuous")).toBeGreaterThan(noise("pneumatic_single_pin"));
  });
});

describe("dpCost", () => {
  it("integrated inline most expensive", () => {
    expect(dpCost("integrated_inline_auto")).toBeGreaterThan(dpCost("scribe_drag_continuous"));
  });
});

describe("portable", () => {
  it("handheld is portable", () => {
    expect(portable("portable_handheld_battery")).toBe(true);
  });
  it("pneumatic not portable", () => {
    expect(portable("pneumatic_single_pin")).toBe(false);
  });
});

describe("forTraceability", () => {
  it("pneumatic for traceability", () => {
    expect(forTraceability("pneumatic_single_pin")).toBe(true);
  });
  it("scribe not for traceability", () => {
    expect(forTraceability("scribe_drag_continuous")).toBe(false);
  });
});

describe("actuator", () => {
  it("integrated uses servo driven conveyor", () => {
    expect(actuator("integrated_inline_auto")).toBe("servo_driven_inline_conveyor");
  });
});

describe("bestUse", () => {
  it("pneumatic for VIN chassis casting", () => {
    expect(bestUse("pneumatic_single_pin")).toBe("vin_number_chassis_casting_mark");
  });
});

describe("dotPeenMarkTypes", () => {
  it("returns 5 types", () => {
    expect(dotPeenMarkTypes()).toHaveLength(5);
  });
});
