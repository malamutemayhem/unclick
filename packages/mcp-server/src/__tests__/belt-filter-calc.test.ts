import { describe, it, expect } from "vitest";
import {
  cakeDryness, throughput, washability, footprint,
  bfCost, continuous, forSludge, belt,
  bestUse, beltFilterTypes,
} from "../belt-filter-calc.js";

describe("cakeDryness", () => {
  it("belt press combo driest cake", () => {
    expect(cakeDryness("belt_press_combo")).toBeGreaterThan(cakeDryness("gravity_belt_thicken"));
  });
});

describe("throughput", () => {
  it("vacuum belt highest throughput", () => {
    expect(throughput("vacuum_belt_horizontal")).toBeGreaterThan(throughput("enclosed_belt_fume"));
  });
});

describe("washability", () => {
  it("vacuum belt best washability", () => {
    expect(washability("vacuum_belt_horizontal")).toBeGreaterThan(washability("gravity_belt_thicken"));
  });
});

describe("footprint", () => {
  it("gravity belt smallest footprint", () => {
    expect(footprint("gravity_belt_thicken")).toBeGreaterThan(footprint("vacuum_belt_horizontal"));
  });
});

describe("bfCost", () => {
  it("enclosed belt most expensive", () => {
    expect(bfCost("enclosed_belt_fume")).toBeGreaterThan(bfCost("gravity_belt_thicken"));
  });
});

describe("continuous", () => {
  it("all belt filters are continuous", () => {
    expect(continuous("gravity_belt_thicken")).toBe(true);
    expect(continuous("belt_press_combo")).toBe(true);
  });
});

describe("forSludge", () => {
  it("pressure belt for sludge", () => {
    expect(forSludge("pressure_belt_dewater")).toBe(true);
  });
  it("vacuum belt not for sludge", () => {
    expect(forSludge("vacuum_belt_horizontal")).toBe(false);
  });
});

describe("belt", () => {
  it("belt press combo uses dual belt", () => {
    expect(belt("belt_press_combo")).toBe("dual_belt_gravity_then_pressure_zone");
  });
});

describe("bestUse", () => {
  it("vacuum belt for mineral concentrate wash", () => {
    expect(bestUse("vacuum_belt_horizontal")).toBe("mineral_concentrate_wash_countercurrent");
  });
});

describe("beltFilterTypes", () => {
  it("returns 5 types", () => {
    expect(beltFilterTypes()).toHaveLength(5);
  });
});
