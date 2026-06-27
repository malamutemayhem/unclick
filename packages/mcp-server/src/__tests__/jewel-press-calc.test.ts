import { describe, it, expect } from "vitest";
import {
  pressForce, alignAccuracy, controlFine, jewelRange,
  pressCost, powered, forDelicate, ramStyle,
  bestUse, jewelPresses,
} from "../jewel-press-calc.js";

describe("pressForce", () => {
  it("pneumatic press power strongest press", () => {
    expect(pressForce("pneumatic_press_power")).toBeGreaterThan(pressForce("micro_press_delicate"));
  });
});

describe("alignAccuracy", () => {
  it("micro press delicate best alignment", () => {
    expect(alignAccuracy("micro_press_delicate")).toBeGreaterThan(alignAccuracy("lever_press_heavy"));
  });
});

describe("controlFine", () => {
  it("micro press delicate finest control", () => {
    expect(controlFine("micro_press_delicate")).toBeGreaterThan(controlFine("pneumatic_press_power"));
  });
});

describe("jewelRange", () => {
  it("pneumatic press power best jewel range", () => {
    expect(jewelRange("pneumatic_press_power")).toBeGreaterThan(jewelRange("micro_press_delicate"));
  });
});

describe("pressCost", () => {
  it("pneumatic press power most expensive", () => {
    expect(pressCost("pneumatic_press_power")).toBeGreaterThan(pressCost("hand_press_standard"));
  });
});

describe("powered", () => {
  it("pneumatic press power is powered", () => {
    expect(powered("pneumatic_press_power")).toBe(true);
  });
  it("hand press standard not powered", () => {
    expect(powered("hand_press_standard")).toBe(false);
  });
});

describe("forDelicate", () => {
  it("micro press delicate is for delicate", () => {
    expect(forDelicate("micro_press_delicate")).toBe(true);
  });
  it("hand press standard not for delicate", () => {
    expect(forDelicate("hand_press_standard")).toBe(false);
  });
});

describe("ramStyle", () => {
  it("screw press precise uses fine thread screw", () => {
    expect(ramStyle("screw_press_precise")).toBe("fine_thread_screw");
  });
});

describe("bestUse", () => {
  it("hand press standard best for general jewel set", () => {
    expect(bestUse("hand_press_standard")).toBe("general_jewel_set");
  });
});

describe("jewelPresses", () => {
  it("returns 5 types", () => {
    expect(jewelPresses()).toHaveLength(5);
  });
});
