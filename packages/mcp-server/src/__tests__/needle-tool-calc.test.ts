import { describe, it, expect } from "vitest";
import {
  cutPrecision, versatility, decorateAbility, controlFeel,
  toolCost, forGreenware, patternMaking, tipShape,
  bestTask, needleTools,
} from "../needle-tool-calc.js";

describe("cutPrecision", () => {
  it("hole cutter circle most precise cuts", () => {
    expect(cutPrecision("hole_cutter_circle")).toBeGreaterThan(cutPrecision("chattering_tool_trim"));
  });
});

describe("versatility", () => {
  it("pottery needle steel most versatile", () => {
    expect(versatility("pottery_needle_steel")).toBeGreaterThan(versatility("chattering_tool_trim"));
  });
});

describe("decorateAbility", () => {
  it("sgrafitto loop carve best decorating", () => {
    expect(decorateAbility("sgrafitto_loop_carve")).toBeGreaterThan(decorateAbility("hole_cutter_circle"));
  });
});

describe("controlFeel", () => {
  it("pottery needle steel best control feel", () => {
    expect(controlFeel("pottery_needle_steel")).toBeGreaterThan(controlFeel("chattering_tool_trim"));
  });
});

describe("toolCost", () => {
  it("hole cutter circle more expensive than pottery needle", () => {
    expect(toolCost("hole_cutter_circle")).toBeGreaterThan(toolCost("pottery_needle_steel"));
  });
});

describe("forGreenware", () => {
  it("pottery needle steel is for greenware", () => {
    expect(forGreenware("pottery_needle_steel")).toBe(true);
  });
  it("chattering tool trim is not for greenware", () => {
    expect(forGreenware("chattering_tool_trim")).toBe(false);
  });
});

describe("patternMaking", () => {
  it("sgrafitto loop carve is pattern making", () => {
    expect(patternMaking("sgrafitto_loop_carve")).toBe(true);
  });
  it("pottery needle steel is not pattern making", () => {
    expect(patternMaking("pottery_needle_steel")).toBe(false);
  });
});

describe("tipShape", () => {
  it("chattering tool trim uses spring steel vibrate", () => {
    expect(tipShape("chattering_tool_trim")).toBe("spring_steel_vibrate");
  });
});

describe("bestTask", () => {
  it("sgrafitto loop carve best for carve through glaze", () => {
    expect(bestTask("sgrafitto_loop_carve")).toBe("carve_through_glaze");
  });
});

describe("needleTools", () => {
  it("returns 5 types", () => {
    expect(needleTools()).toHaveLength(5);
  });
});
