import { describe, it, expect } from "vitest";
import {
  gripVariety, weightLimit, installEase, stability,
  barCost, noDrillInstall, multiExercise, mountMethod,
  bestSetup, pullUpBars,
} from "../pull-up-bar-calc.js";

describe("gripVariety", () => {
  it("freestanding tower most grip variety", () => {
    expect(gripVariety("freestanding_tower")).toBeGreaterThan(gripVariety("portable_travel"));
  });
});

describe("weightLimit", () => {
  it("freestanding tower highest weight limit", () => {
    expect(weightLimit("freestanding_tower")).toBeGreaterThan(weightLimit("doorway_mount"));
  });
});

describe("installEase", () => {
  it("doorway mount easiest install", () => {
    expect(installEase("doorway_mount")).toBeGreaterThan(installEase("wall_ceiling"));
  });
});

describe("stability", () => {
  it("wall ceiling most stable", () => {
    expect(stability("wall_ceiling")).toBeGreaterThan(stability("doorway_mount"));
  });
});

describe("barCost", () => {
  it("outdoor park most expensive", () => {
    expect(barCost("outdoor_park")).toBeGreaterThan(barCost("doorway_mount"));
  });
});

describe("noDrillInstall", () => {
  it("doorway mount needs no drill", () => {
    expect(noDrillInstall("doorway_mount")).toBe(true);
  });
  it("wall ceiling needs drill", () => {
    expect(noDrillInstall("wall_ceiling")).toBe(false);
  });
});

describe("multiExercise", () => {
  it("freestanding tower is multi exercise", () => {
    expect(multiExercise("freestanding_tower")).toBe(true);
  });
  it("doorway mount is not", () => {
    expect(multiExercise("doorway_mount")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("wall ceiling uses bolt bracket fixed", () => {
    expect(mountMethod("wall_ceiling")).toBe("bolt_bracket_fixed");
  });
});

describe("bestSetup", () => {
  it("doorway mount for apartment no damage", () => {
    expect(bestSetup("doorway_mount")).toBe("apartment_no_damage");
  });
});

describe("pullUpBars", () => {
  it("returns 5 types", () => {
    expect(pullUpBars()).toHaveLength(5);
  });
});
