import { describe, it, expect } from "vitest";
import {
  lineVisibility, eraseEase, linePrecision, fabricRange,
  markerCost, selfErasing, needsWater, markMethod,
  bestTask, fabricMarkers,
} from "../fabric-marker-calc.js";

describe("lineVisibility", () => {
  it("water soluble pen most visible lines", () => {
    expect(lineVisibility("water_soluble_pen")).toBeGreaterThan(lineVisibility("tailor_chalk_wheel"));
  });
});

describe("eraseEase", () => {
  it("air erasable fade easiest to erase", () => {
    expect(eraseEase("air_erasable_fade")).toBeGreaterThan(eraseEase("chalk_pencil_wax"));
  });
});

describe("linePrecision", () => {
  it("water soluble pen most precise", () => {
    expect(linePrecision("water_soluble_pen")).toBeGreaterThan(linePrecision("tailor_chalk_wheel"));
  });
});

describe("fabricRange", () => {
  it("heat erasable iron widest fabric range", () => {
    expect(fabricRange("heat_erasable_iron")).toBeGreaterThan(fabricRange("water_soluble_pen"));
  });
});

describe("markerCost", () => {
  it("air erasable fade more expensive than chalk pencil", () => {
    expect(markerCost("air_erasable_fade")).toBeGreaterThan(markerCost("chalk_pencil_wax"));
  });
});

describe("selfErasing", () => {
  it("air erasable fade is self erasing", () => {
    expect(selfErasing("air_erasable_fade")).toBe(true);
  });
  it("water soluble pen is not self erasing", () => {
    expect(selfErasing("water_soluble_pen")).toBe(false);
  });
});

describe("needsWater", () => {
  it("water soluble pen needs water", () => {
    expect(needsWater("water_soluble_pen")).toBe(true);
  });
  it("air erasable fade does not need water", () => {
    expect(needsWater("air_erasable_fade")).toBe(false);
  });
});

describe("markMethod", () => {
  it("heat erasable iron uses friction ink heat clear", () => {
    expect(markMethod("heat_erasable_iron")).toBe("friction_ink_heat_clear");
  });
});

describe("bestTask", () => {
  it("chalk pencil wax best for dark fabric general", () => {
    expect(bestTask("chalk_pencil_wax")).toBe("dark_fabric_general");
  });
});

describe("fabricMarkers", () => {
  it("returns 5 types", () => {
    expect(fabricMarkers()).toHaveLength(5);
  });
});
