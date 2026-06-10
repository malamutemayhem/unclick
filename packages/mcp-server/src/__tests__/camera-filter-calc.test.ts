import { describe, it, expect } from "vitest";
import {
  opticalClarity, effectStrength, versatilityRange, easeOfUse,
  filterCostLevel, stackable, needsWhiteBalance, mountStyle,
  bestScene, cameraFilters,
} from "../camera-filter-calc.js";

describe("opticalClarity", () => {
  it("uv clear protect best clarity", () => {
    expect(opticalClarity("uv_clear_protect")).toBeGreaterThan(opticalClarity("infrared_pass"));
  });
});

describe("effectStrength", () => {
  it("infrared pass strongest effect", () => {
    expect(effectStrength("infrared_pass")).toBeGreaterThan(effectStrength("uv_clear_protect"));
  });
});

describe("versatilityRange", () => {
  it("nd variable most versatile range", () => {
    expect(versatilityRange("nd_variable")).toBeGreaterThan(versatilityRange("infrared_pass"));
  });
});

describe("easeOfUse", () => {
  it("uv clear protect easiest to use", () => {
    expect(easeOfUse("uv_clear_protect")).toBeGreaterThan(easeOfUse("infrared_pass"));
  });
});

describe("filterCostLevel", () => {
  it("nd variable most expensive", () => {
    expect(filterCostLevel("nd_variable")).toBeGreaterThan(filterCostLevel("uv_clear_protect"));
  });
});

describe("stackable", () => {
  it("circular polarizer is stackable", () => {
    expect(stackable("circular_polarizer")).toBe(true);
  });
  it("nd variable is not", () => {
    expect(stackable("nd_variable")).toBe(false);
  });
});

describe("needsWhiteBalance", () => {
  it("infrared pass needs white balance", () => {
    expect(needsWhiteBalance("infrared_pass")).toBe(true);
  });
  it("circular polarizer does not", () => {
    expect(needsWhiteBalance("circular_polarizer")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("graduated nd uses square holder slide", () => {
    expect(mountStyle("graduated_nd")).toBe("square_holder_slide");
  });
});

describe("bestScene", () => {
  it("circular polarizer for sky water reflection control", () => {
    expect(bestScene("circular_polarizer")).toBe("sky_water_reflection_control");
  });
});

describe("cameraFilters", () => {
  it("returns 5 types", () => {
    expect(cameraFilters()).toHaveLength(5);
  });
});
