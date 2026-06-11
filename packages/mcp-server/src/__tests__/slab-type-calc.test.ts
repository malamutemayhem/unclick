import { describe, it, expect } from "vitest";
import {
  span, loadCapacity, depth, formwork,
  slCost, prestressed, forLongSpan, reinforcement,
  bestUse, slabTypeTypes,
} from "../slab-type-calc.js";

describe("span", () => {
  it("post tension longest span", () => {
    expect(span("post_tension_unbonded")).toBeGreaterThan(span("flat_plate_no_beam"));
  });
});

describe("loadCapacity", () => {
  it("post tension highest load", () => {
    expect(loadCapacity("post_tension_unbonded")).toBeGreaterThan(loadCapacity("flat_plate_no_beam"));
  });
});

describe("depth", () => {
  it("post tension thinnest (highest score)", () => {
    expect(depth("post_tension_unbonded")).toBeGreaterThan(depth("waffle_slab_two_way"));
  });
});

describe("formwork", () => {
  it("flat plate simplest formwork", () => {
    expect(formwork("flat_plate_no_beam")).toBeGreaterThan(formwork("waffle_slab_two_way"));
  });
});

describe("slCost", () => {
  it("waffle slab most expensive", () => {
    expect(slCost("waffle_slab_two_way")).toBeGreaterThan(slCost("flat_plate_no_beam"));
  });
});

describe("prestressed", () => {
  it("post tension is prestressed", () => {
    expect(prestressed("post_tension_unbonded")).toBe(true);
  });
  it("flat plate not prestressed", () => {
    expect(prestressed("flat_plate_no_beam")).toBe(false);
  });
});

describe("forLongSpan", () => {
  it("waffle for long span", () => {
    expect(forLongSpan("waffle_slab_two_way")).toBe(true);
  });
  it("flat plate not for long span", () => {
    expect(forLongSpan("flat_plate_no_beam")).toBe(false);
  });
});

describe("reinforcement", () => {
  it("waffle uses dome void", () => {
    expect(reinforcement("waffle_slab_two_way")).toBe("two_way_rib_dome_void");
  });
});

describe("bestUse", () => {
  it("flat plate for residential", () => {
    expect(bestUse("flat_plate_no_beam")).toBe("residential_apartment_light_load");
  });
});

describe("slabTypeTypes", () => {
  it("returns 5 types", () => {
    expect(slabTypeTypes()).toHaveLength(5);
  });
});
