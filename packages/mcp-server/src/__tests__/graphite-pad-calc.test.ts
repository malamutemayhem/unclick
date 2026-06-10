import { describe, it, expect } from "vitest";
import {
  shapeRange, heatResist, releaseEase, durability,
  padCost, forMolding, handheld, padShape,
  bestUse, graphitePads,
} from "../graphite-pad-calc.js";

describe("shapeRange", () => {
  it("paddle handle shape widest shape range", () => {
    expect(shapeRange("paddle_handle_shape")).toBeGreaterThan(shapeRange("rod_point_detail"));
  });
});

describe("heatResist", () => {
  it("flat press slab best heat resist", () => {
    expect(heatResist("flat_press_slab")).toBeGreaterThan(heatResist("paddle_handle_shape"));
  });
});

describe("releaseEase", () => {
  it("flat press slab easiest release", () => {
    expect(releaseEase("flat_press_slab")).toBeGreaterThan(releaseEase("groove_channel_form"));
  });
});

describe("durability", () => {
  it("flat press slab most durable", () => {
    expect(durability("flat_press_slab")).toBeGreaterThan(durability("rod_point_detail"));
  });
});

describe("padCost", () => {
  it("dome cup shape most expensive", () => {
    expect(padCost("dome_cup_shape")).toBeGreaterThan(padCost("rod_point_detail"));
  });
});

describe("forMolding", () => {
  it("dome cup shape is for molding", () => {
    expect(forMolding("dome_cup_shape")).toBe(true);
  });
  it("flat press slab not for molding", () => {
    expect(forMolding("flat_press_slab")).toBe(false);
  });
});

describe("handheld", () => {
  it("paddle handle shape is handheld", () => {
    expect(handheld("paddle_handle_shape")).toBe(true);
  });
  it("flat press slab not handheld", () => {
    expect(handheld("flat_press_slab")).toBe(false);
  });
});

describe("padShape", () => {
  it("flat press slab uses flat square block", () => {
    expect(padShape("flat_press_slab")).toBe("flat_square_block");
  });
});

describe("bestUse", () => {
  it("dome cup shape best for cab dome shape", () => {
    expect(bestUse("dome_cup_shape")).toBe("cab_dome_shape");
  });
});

describe("graphitePads", () => {
  it("returns 5 types", () => {
    expect(graphitePads()).toHaveLength(5);
  });
});
