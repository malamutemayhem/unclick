import { describe, it, expect } from "vitest";
import {
  cakeDryness, throughput, automation, washability,
  pfCost, membraneSqueeze, forSlurry, plate,
  bestUse, pressFilterTypes,
} from "../press-filter-calc.js";

describe("cakeDryness", () => {
  it("membrane squeeze driest cake", () => {
    expect(cakeDryness("membrane_squeeze_dewater")).toBeGreaterThan(cakeDryness("plate_frame_manual"));
  });
});

describe("throughput", () => {
  it("tower press highest throughput", () => {
    expect(throughput("tower_press_automatic")).toBeGreaterThan(throughput("plate_frame_manual"));
  });
});

describe("automation", () => {
  it("tower press most automated", () => {
    expect(automation("tower_press_automatic")).toBeGreaterThan(automation("plate_frame_manual"));
  });
});

describe("washability", () => {
  it("membrane squeeze best washability", () => {
    expect(washability("membrane_squeeze_dewater")).toBeGreaterThan(washability("tube_press_high_press"));
  });
});

describe("pfCost", () => {
  it("tower press most expensive", () => {
    expect(pfCost("tower_press_automatic")).toBeGreaterThan(pfCost("plate_frame_manual"));
  });
});

describe("membraneSqueeze", () => {
  it("recessed plate has membrane squeeze", () => {
    expect(membraneSqueeze("recessed_plate_membrane")).toBe(true);
  });
  it("plate frame no membrane squeeze", () => {
    expect(membraneSqueeze("plate_frame_manual")).toBe(false);
  });
});

describe("forSlurry", () => {
  it("plate frame for slurry", () => {
    expect(forSlurry("plate_frame_manual")).toBe(true);
  });
  it("tower press not for slurry", () => {
    expect(forSlurry("tower_press_automatic")).toBe(false);
  });
});

describe("plate", () => {
  it("tube press uses porous tube hydraulic", () => {
    expect(plate("tube_press_high_press")).toBe("porous_tube_hydraulic_radial_press");
  });
});

describe("bestUse", () => {
  it("tower press for high volume coal mineral", () => {
    expect(bestUse("tower_press_automatic")).toBe("high_volume_continuous_coal_mineral");
  });
});

describe("pressFilterTypes", () => {
  it("returns 5 types", () => {
    expect(pressFilterTypes()).toHaveLength(5);
  });
});
