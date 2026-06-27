import { describe, it, expect } from "vitest";
import {
  actuationForce, typingFeedback, noiseLevel, durabilityMillion,
  switchCost, hotSwappable, rgbTransparent, mechanism,
  bestUse, keyboardSwitches,
} from "../keyboard-switch-calc.js";

describe("actuationForce", () => {
  it("cherry blue clicky heaviest actuation", () => {
    expect(actuationForce("cherry_blue_clicky")).toBeGreaterThan(actuationForce("cherry_red_linear"));
  });
});

describe("typingFeedback", () => {
  it("cherry blue clicky most feedback", () => {
    expect(typingFeedback("cherry_blue_clicky")).toBeGreaterThan(typingFeedback("cherry_red_linear"));
  });
});

describe("noiseLevel", () => {
  it("cherry blue clicky noisiest", () => {
    expect(noiseLevel("cherry_blue_clicky")).toBeGreaterThan(noiseLevel("topre_electro"));
  });
});

describe("durabilityMillion", () => {
  it("optical analog most durable", () => {
    expect(durabilityMillion("optical_analog")).toBeGreaterThan(durabilityMillion("cherry_red_linear"));
  });
});

describe("switchCost", () => {
  it("topre electro most expensive", () => {
    expect(switchCost("topre_electro")).toBeGreaterThan(switchCost("cherry_red_linear"));
  });
});

describe("hotSwappable", () => {
  it("cherry red linear is hot swappable", () => {
    expect(hotSwappable("cherry_red_linear")).toBe(true);
  });
  it("topre electro is not", () => {
    expect(hotSwappable("topre_electro")).toBe(false);
  });
});

describe("rgbTransparent", () => {
  it("optical analog is rgb transparent", () => {
    expect(rgbTransparent("optical_analog")).toBe(true);
  });
  it("cherry blue clicky is not", () => {
    expect(rgbTransparent("cherry_blue_clicky")).toBe(false);
  });
});

describe("mechanism", () => {
  it("topre electro uses rubber dome capacitive", () => {
    expect(mechanism("topre_electro")).toBe("rubber_dome_capacitive");
  });
});

describe("bestUse", () => {
  it("cherry red linear for gaming fast keypress", () => {
    expect(bestUse("cherry_red_linear")).toBe("gaming_fast_keypress");
  });
});

describe("keyboardSwitches", () => {
  it("returns 5 types", () => {
    expect(keyboardSwitches()).toHaveLength(5);
  });
});
