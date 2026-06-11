import { describe, it, expect } from "vitest";
import {
  throwForce, noiseQuiet, durability, adjustRange,
  stickCost, adjustable, springBuffer, tipMaterial,
  bestUse, pickerSticks,
} from "../picker-stick-calc.js";

describe("throwForce", () => {
  it("adjustable weight set strongest throw", () => {
    expect(throwForce("adjustable_weight_set")).toBeGreaterThan(throwForce("buffer_spring_soft"));
  });
});

describe("noiseQuiet", () => {
  it("rubber tip quiet quietest", () => {
    expect(noiseQuiet("rubber_tip_quiet")).toBeGreaterThan(noiseQuiet("adjustable_weight_set"));
  });
});

describe("durability", () => {
  it("nylon tip durable most durable", () => {
    expect(durability("nylon_tip_durable")).toBeGreaterThan(durability("buffer_spring_soft"));
  });
});

describe("adjustRange", () => {
  it("adjustable weight set widest range", () => {
    expect(adjustRange("adjustable_weight_set")).toBeGreaterThan(adjustRange("leather_tip_standard"));
  });
});

describe("stickCost", () => {
  it("adjustable weight set most expensive", () => {
    expect(stickCost("adjustable_weight_set")).toBeGreaterThan(stickCost("leather_tip_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable weight set is adjustable", () => {
    expect(adjustable("adjustable_weight_set")).toBe(true);
  });
  it("leather tip standard not adjustable", () => {
    expect(adjustable("leather_tip_standard")).toBe(false);
  });
});

describe("springBuffer", () => {
  it("buffer spring soft has spring buffer", () => {
    expect(springBuffer("buffer_spring_soft")).toBe(true);
  });
  it("leather tip standard no spring buffer", () => {
    expect(springBuffer("leather_tip_standard")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("rubber tip quiet uses rubber cushion tip", () => {
    expect(tipMaterial("rubber_tip_quiet")).toBe("rubber_cushion_tip");
  });
});

describe("bestUse", () => {
  it("leather tip standard best for general shuttle throw", () => {
    expect(bestUse("leather_tip_standard")).toBe("general_shuttle_throw");
  });
});

describe("pickerSticks", () => {
  it("returns 5 types", () => {
    expect(pickerSticks()).toHaveLength(5);
  });
});
