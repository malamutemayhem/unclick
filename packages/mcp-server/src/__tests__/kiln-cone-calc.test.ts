import { describe, it, expect } from "vitest";
import {
  targetTemp, accuracy, easeOfRead, availability,
  coneCost, freestanding, reusable, coneShape,
  bestFiring, kilnCones,
} from "../kiln-cone-calc.js";

describe("targetTemp", () => {
  it("high fire 10 cone highest target temp", () => {
    expect(targetTemp("high_fire_10_cone")).toBeGreaterThan(targetTemp("low_fire_06_cone"));
  });
});

describe("accuracy", () => {
  it("pyrometric witness most accurate", () => {
    expect(accuracy("pyrometric_witness")).toBeGreaterThan(accuracy("low_fire_06_cone"));
  });
});

describe("easeOfRead", () => {
  it("self support bar easiest to read", () => {
    expect(easeOfRead("self_support_bar")).toBeGreaterThan(easeOfRead("pyrometric_witness"));
  });
});

describe("availability", () => {
  it("low fire 06 cone most available", () => {
    expect(availability("low_fire_06_cone")).toBeGreaterThan(availability("pyrometric_witness"));
  });
});

describe("coneCost", () => {
  it("pyrometric witness most expensive", () => {
    expect(coneCost("pyrometric_witness")).toBeGreaterThan(coneCost("low_fire_06_cone"));
  });
});

describe("freestanding", () => {
  it("self support bar is freestanding", () => {
    expect(freestanding("self_support_bar")).toBe(true);
  });
  it("low fire 06 cone is not freestanding", () => {
    expect(freestanding("low_fire_06_cone")).toBe(false);
  });
});

describe("reusable", () => {
  it("no cone is reusable", () => {
    expect(reusable("low_fire_06_cone")).toBe(false);
  });
});

describe("coneShape", () => {
  it("pyrometric witness is ring disc shrink", () => {
    expect(coneShape("pyrometric_witness")).toBe("ring_disc_shrink");
  });
});

describe("bestFiring", () => {
  it("high fire 10 cone best for porcelain reduction", () => {
    expect(bestFiring("high_fire_10_cone")).toBe("porcelain_reduction");
  });
});

describe("kilnCones", () => {
  it("returns 5 types", () => {
    expect(kilnCones()).toHaveLength(5);
  });
});
