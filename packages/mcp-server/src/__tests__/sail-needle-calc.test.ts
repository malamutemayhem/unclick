import { describe, it, expect } from "vitest";
import {
  penetrate, controlStitch, durability, fabricRange,
  needleCost, curved, forMachine, pointStyle,
  bestUse, sailNeedles,
} from "../sail-needle-calc.js";

describe("penetrate", () => {
  it("heavy gauge canvas best penetrate", () => {
    expect(penetrate("heavy_gauge_canvas")).toBeGreaterThan(penetrate("round_point_light"));
  });
});

describe("controlStitch", () => {
  it("curved needle patch best stitch control", () => {
    expect(controlStitch("curved_needle_patch")).toBeGreaterThan(controlStitch("machine_needle_power"));
  });
});

describe("durability", () => {
  it("heavy gauge canvas most durable", () => {
    expect(durability("heavy_gauge_canvas")).toBeGreaterThan(durability("curved_needle_patch"));
  });
});

describe("fabricRange", () => {
  it("machine needle power widest fabric range", () => {
    expect(fabricRange("machine_needle_power")).toBeGreaterThan(fabricRange("heavy_gauge_canvas"));
  });
});

describe("needleCost", () => {
  it("machine needle power most expensive", () => {
    expect(needleCost("machine_needle_power")).toBeGreaterThan(needleCost("round_point_light"));
  });
});

describe("curved", () => {
  it("curved needle patch is curved", () => {
    expect(curved("curved_needle_patch")).toBe(true);
  });
  it("triangular point standard not curved", () => {
    expect(curved("triangular_point_standard")).toBe(false);
  });
});

describe("forMachine", () => {
  it("machine needle power is for machine", () => {
    expect(forMachine("machine_needle_power")).toBe(true);
  });
  it("triangular point standard not for machine", () => {
    expect(forMachine("triangular_point_standard")).toBe(false);
  });
});

describe("pointStyle", () => {
  it("curved needle patch uses curved arc point", () => {
    expect(pointStyle("curved_needle_patch")).toBe("curved_arc_point");
  });
});

describe("bestUse", () => {
  it("triangular point standard best for general sail stitch", () => {
    expect(bestUse("triangular_point_standard")).toBe("general_sail_stitch");
  });
});

describe("sailNeedles", () => {
  it("returns 5 types", () => {
    expect(sailNeedles()).toHaveLength(5);
  });
});
