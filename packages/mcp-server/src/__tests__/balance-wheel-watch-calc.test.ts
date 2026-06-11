import { describe, it, expect } from "vitest";
import {
  timekeep, tempStable, adjustEase, durability,
  wheelCost, compensated, freeSpring, material,
  bestUse, balanceWheelWatches,
} from "../balance-wheel-watch-calc.js";

describe("timekeep", () => {
  it("gyromax variable inertia best timekeep", () => {
    expect(timekeep("gyromax_variable_inertia")).toBeGreaterThan(timekeep("plain_brass_standard"));
  });
});

describe("tempStable", () => {
  it("glucydur alloy modern most temp stable", () => {
    expect(tempStable("glucydur_alloy_modern")).toBeGreaterThan(tempStable("plain_brass_standard"));
  });
});

describe("adjustEase", () => {
  it("plain brass standard easiest adjust", () => {
    expect(adjustEase("plain_brass_standard")).toBeGreaterThan(adjustEase("free_sprung_precision"));
  });
});

describe("durability", () => {
  it("glucydur alloy modern most durable", () => {
    expect(durability("glucydur_alloy_modern")).toBeGreaterThan(durability("plain_brass_standard"));
  });
});

describe("wheelCost", () => {
  it("gyromax variable inertia most expensive", () => {
    expect(wheelCost("gyromax_variable_inertia")).toBeGreaterThan(wheelCost("plain_brass_standard"));
  });
});

describe("compensated", () => {
  it("bimetallic comp temp is compensated", () => {
    expect(compensated("bimetallic_comp_temp")).toBe(true);
  });
  it("plain brass standard not compensated", () => {
    expect(compensated("plain_brass_standard")).toBe(false);
  });
});

describe("freeSpring", () => {
  it("free sprung precision is free spring", () => {
    expect(freeSpring("free_sprung_precision")).toBe(true);
  });
  it("plain brass standard not free spring", () => {
    expect(freeSpring("plain_brass_standard")).toBe(false);
  });
});

describe("material", () => {
  it("gyromax variable inertia uses silinvar composite", () => {
    expect(material("gyromax_variable_inertia")).toBe("silinvar_composite");
  });
});

describe("bestUse", () => {
  it("plain brass standard best for basic time regulate", () => {
    expect(bestUse("plain_brass_standard")).toBe("basic_time_regulate");
  });
});

describe("balanceWheelWatches", () => {
  it("returns 5 types", () => {
    expect(balanceWheelWatches()).toHaveLength(5);
  });
});
