import { describe, it, expect } from "vitest";
import {
  sightClarity, levelStability, rotateSmooth, fieldDurable,
  dumpyCost, fullRotation, removableScope, bodyFinish,
  bestUse, dumpyLevels,
} from "../dumpy-level-calc.js";

describe("sightClarity", () => {
  it("quick set auto clearest sight", () => {
    expect(sightClarity("quick_set_auto")).toBeGreaterThan(sightClarity("classic_brass_scope"));
  });
});

describe("levelStability", () => {
  it("quick set auto most stable level", () => {
    expect(levelStability("quick_set_auto")).toBeGreaterThan(levelStability("wye_level_removable"));
  });
});

describe("rotateSmooth", () => {
  it("quick set auto smoothest rotation", () => {
    expect(rotateSmooth("quick_set_auto")).toBeGreaterThan(rotateSmooth("classic_brass_scope"));
  });
});

describe("fieldDurable", () => {
  it("classic brass scope most field durable", () => {
    expect(fieldDurable("classic_brass_scope")).toBeGreaterThan(fieldDurable("wye_level_removable"));
  });
});

describe("dumpyCost", () => {
  it("quick set auto most expensive", () => {
    expect(dumpyCost("quick_set_auto")).toBeGreaterThan(dumpyCost("modern_alloy_sealed"));
  });
});

describe("fullRotation", () => {
  it("transit rotate full has full rotation", () => {
    expect(fullRotation("transit_rotate_full")).toBe(true);
  });
  it("modern alloy sealed no full rotation", () => {
    expect(fullRotation("modern_alloy_sealed")).toBe(false);
  });
});

describe("removableScope", () => {
  it("wye level removable has removable scope", () => {
    expect(removableScope("wye_level_removable")).toBe(true);
  });
  it("modern alloy sealed no removable scope", () => {
    expect(removableScope("modern_alloy_sealed")).toBe(false);
  });
});

describe("bodyFinish", () => {
  it("classic brass scope uses lacquered brass", () => {
    expect(bodyFinish("classic_brass_scope")).toBe("lacquered_brass");
  });
});

describe("bestUse", () => {
  it("quick set auto best for rapid grade set", () => {
    expect(bestUse("quick_set_auto")).toBe("rapid_grade_set");
  });
});

describe("dumpyLevels", () => {
  it("returns 5 types", () => {
    expect(dumpyLevels()).toHaveLength(5);
  });
});
