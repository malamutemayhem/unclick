import { describe, it, expect } from "vitest";
import {
  frictionHold, setAccuracy, adjustEase, wearLife,
  pinionCost, adjustable, splitDesign, fitMethod,
  bestUse, cannonPinions,
} from "../cannon-pinion-calc.js";

describe("frictionHold", () => {
  it("press fit tight strongest friction hold", () => {
    expect(frictionHold("press_fit_tight")).toBeGreaterThan(frictionHold("friction_fit_standard"));
  });
});

describe("setAccuracy", () => {
  it("precision ground fine best set accuracy", () => {
    expect(setAccuracy("precision_ground_fine")).toBeGreaterThan(setAccuracy("press_fit_tight"));
  });
});

describe("adjustEase", () => {
  it("spring loaded adjust easiest adjust", () => {
    expect(adjustEase("spring_loaded_adjust")).toBeGreaterThan(adjustEase("press_fit_tight"));
  });
});

describe("wearLife", () => {
  it("precision ground fine best wear life", () => {
    expect(wearLife("precision_ground_fine")).toBeGreaterThan(wearLife("friction_fit_standard"));
  });
});

describe("pinionCost", () => {
  it("precision ground fine most expensive", () => {
    expect(pinionCost("precision_ground_fine")).toBeGreaterThan(pinionCost("friction_fit_standard"));
  });
});

describe("adjustable", () => {
  it("spring loaded adjust is adjustable", () => {
    expect(adjustable("spring_loaded_adjust")).toBe(true);
  });
  it("friction fit standard not adjustable", () => {
    expect(adjustable("friction_fit_standard")).toBe(false);
  });
});

describe("splitDesign", () => {
  it("split sleeve flex has split design", () => {
    expect(splitDesign("split_sleeve_flex")).toBe(true);
  });
  it("friction fit standard no split design", () => {
    expect(splitDesign("friction_fit_standard")).toBe(false);
  });
});

describe("fitMethod", () => {
  it("precision ground fine uses ground taper fit", () => {
    expect(fitMethod("precision_ground_fine")).toBe("ground_taper_fit");
  });
});

describe("bestUse", () => {
  it("friction fit standard best for general hand drive", () => {
    expect(bestUse("friction_fit_standard")).toBe("general_hand_drive");
  });
});

describe("cannonPinions", () => {
  it("returns 5 types", () => {
    expect(cannonPinions()).toHaveLength(5);
  });
});
