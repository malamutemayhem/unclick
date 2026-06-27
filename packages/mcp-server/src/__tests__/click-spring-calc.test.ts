import { describe, it, expect } from "vitest";
import {
  clickForce, returnSnap, wearLife, fitEase,
  springCost, coiled, forBarrel, springShape,
  bestUse, clickSprings,
} from "../click-spring-calc.js";

describe("clickForce", () => {
  it("leaf spring curved strongest click force", () => {
    expect(clickForce("leaf_spring_curved")).toBeGreaterThan(clickForce("hairpin_spring_fold"));
  });
});

describe("returnSnap", () => {
  it("coil spring round best return snap", () => {
    expect(returnSnap("coil_spring_round")).toBeGreaterThan(returnSnap("hairpin_spring_fold"));
  });
});

describe("wearLife", () => {
  it("coil spring round best wear life", () => {
    expect(wearLife("coil_spring_round")).toBeGreaterThan(wearLife("hairpin_spring_fold"));
  });
});

describe("fitEase", () => {
  it("hairpin spring fold easiest fit", () => {
    expect(fitEase("hairpin_spring_fold")).toBeGreaterThan(fitEase("coil_spring_round"));
  });
});

describe("springCost", () => {
  it("leaf spring curved most expensive", () => {
    expect(springCost("leaf_spring_curved")).toBeGreaterThan(springCost("hairpin_spring_fold"));
  });
});

describe("coiled", () => {
  it("coil spring round is coiled", () => {
    expect(coiled("coil_spring_round")).toBe(true);
  });
  it("flat spring standard not coiled", () => {
    expect(coiled("flat_spring_standard")).toBe(false);
  });
});

describe("forBarrel", () => {
  it("leaf spring curved is for barrel", () => {
    expect(forBarrel("leaf_spring_curved")).toBe(true);
  });
  it("flat spring standard not for barrel", () => {
    expect(forBarrel("flat_spring_standard")).toBe(false);
  });
});

describe("springShape", () => {
  it("wire spring form uses formed wire bend", () => {
    expect(springShape("wire_spring_form")).toBe("formed_wire_bend");
  });
});

describe("bestUse", () => {
  it("flat spring standard best for general click hold", () => {
    expect(bestUse("flat_spring_standard")).toBe("general_click_hold");
  });
});

describe("clickSprings", () => {
  it("returns 5 types", () => {
    expect(clickSprings()).toHaveLength(5);
  });
});
