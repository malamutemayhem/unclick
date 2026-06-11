import { describe, it, expect } from "vitest";
import {
  breathable, colorDepth, durability, applyEase,
  washCost, traditional, tinted, baseComp,
  bestUse, limeWashs,
} from "../lime-wash-calc.js";

describe("breathable", () => {
  it("slaked lime standard most breathable", () => {
    expect(breathable("slaked_lime_standard")).toBeGreaterThan(breathable("mineral_paint_modern"));
  });
});

describe("colorDepth", () => {
  it("mineral paint modern deepest color", () => {
    expect(colorDepth("mineral_paint_modern")).toBeGreaterThan(colorDepth("distemper_chalk_soft"));
  });
});

describe("durability", () => {
  it("mineral paint modern most durable", () => {
    expect(durability("mineral_paint_modern")).toBeGreaterThan(durability("distemper_chalk_soft"));
  });
});

describe("applyEase", () => {
  it("mineral paint modern easiest apply", () => {
    expect(applyEase("mineral_paint_modern")).toBeGreaterThan(applyEase("casein_lime_durable"));
  });
});

describe("washCost", () => {
  it("mineral paint modern most expensive", () => {
    expect(washCost("mineral_paint_modern")).toBeGreaterThan(washCost("distemper_chalk_soft"));
  });
});

describe("traditional", () => {
  it("slaked lime standard is traditional", () => {
    expect(traditional("slaked_lime_standard")).toBe(true);
  });
  it("mineral paint modern not traditional", () => {
    expect(traditional("mineral_paint_modern")).toBe(false);
  });
});

describe("tinted", () => {
  it("tinted lime color is tinted", () => {
    expect(tinted("tinted_lime_color")).toBe(true);
  });
  it("slaked lime standard not tinted", () => {
    expect(tinted("slaked_lime_standard")).toBe(false);
  });
});

describe("baseComp", () => {
  it("casein lime durable uses casein lime protein", () => {
    expect(baseComp("casein_lime_durable")).toBe("casein_lime_protein");
  });
});

describe("bestUse", () => {
  it("slaked lime standard best for classic white lime coat", () => {
    expect(bestUse("slaked_lime_standard")).toBe("classic_white_lime_coat");
  });
});

describe("limeWashs", () => {
  it("returns 5 types", () => {
    expect(limeWashs()).toHaveLength(5);
  });
});
