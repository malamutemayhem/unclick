import { describe, it, expect } from "vitest";
import {
  dustBlock, breathable, durability, attachEase,
  cambricCost, adhesive, mesh, weaveType,
  bestUse, cambricDusts,
} from "../cambric-dust-calc.js";

describe("dustBlock", () => {
  it("black cambric standard best dust block", () => {
    expect(dustBlock("black_cambric_standard")).toBeGreaterThan(dustBlock("mesh_cambric_breathe"));
  });
});

describe("breathable", () => {
  it("mesh cambric breathe most breathable", () => {
    expect(breathable("mesh_cambric_breathe")).toBeGreaterThan(breathable("adhesive_back_easy"));
  });
});

describe("durability", () => {
  it("black cambric standard most durable", () => {
    expect(durability("black_cambric_standard")).toBeGreaterThan(durability("nonwoven_fabric_budget"));
  });
});

describe("attachEase", () => {
  it("adhesive back easy easiest attach", () => {
    expect(attachEase("adhesive_back_easy")).toBeGreaterThan(attachEase("black_cambric_standard"));
  });
});

describe("cambricCost", () => {
  it("adhesive back easy most expensive", () => {
    expect(cambricCost("adhesive_back_easy")).toBeGreaterThan(cambricCost("nonwoven_fabric_budget"));
  });
});

describe("adhesive", () => {
  it("adhesive back easy has adhesive", () => {
    expect(adhesive("adhesive_back_easy")).toBe(true);
  });
  it("black cambric standard no adhesive", () => {
    expect(adhesive("black_cambric_standard")).toBe(false);
  });
});

describe("mesh", () => {
  it("mesh cambric breathe is mesh", () => {
    expect(mesh("mesh_cambric_breathe")).toBe(true);
  });
  it("black cambric standard not mesh", () => {
    expect(mesh("black_cambric_standard")).toBe(false);
  });
});

describe("weaveType", () => {
  it("mesh cambric breathe uses open mesh weave", () => {
    expect(weaveType("mesh_cambric_breathe")).toBe("open_mesh_weave");
  });
});

describe("bestUse", () => {
  it("black cambric standard best for general bottom cover", () => {
    expect(bestUse("black_cambric_standard")).toBe("general_bottom_cover");
  });
});

describe("cambricDusts", () => {
  it("returns 5 types", () => {
    expect(cambricDusts()).toHaveLength(5);
  });
});
