import { describe, it, expect } from "vitest";
import {
  holeCount, drawSmooth, sizeRange, durability,
  plateCost, carbideInsert, specialProfile, plateMetal,
  bestUse, drawPlates,
} from "../draw-plate-calc.js";

describe("holeCount", () => {
  it("round hole standard most holes", () => {
    expect(holeCount("round_hole_standard")).toBeGreaterThan(holeCount("oval_hole_flat"));
  });
});

describe("drawSmooth", () => {
  it("round hole standard smoothest draw", () => {
    expect(drawSmooth("round_hole_standard")).toBeGreaterThan(drawSmooth("triangle_hole_form"));
  });
});

describe("sizeRange", () => {
  it("round hole standard widest size range", () => {
    expect(sizeRange("round_hole_standard")).toBeGreaterThan(sizeRange("square_hole_wire"));
  });
});

describe("durability", () => {
  it("round hole standard most durable", () => {
    expect(durability("round_hole_standard")).toBeGreaterThan(durability("triangle_hole_form"));
  });
});

describe("plateCost", () => {
  it("half round shape more expensive", () => {
    expect(plateCost("half_round_shape")).toBeGreaterThan(plateCost("round_hole_standard"));
  });
});

describe("carbideInsert", () => {
  it("round hole standard has carbide insert", () => {
    expect(carbideInsert("round_hole_standard")).toBe(true);
  });
  it("square hole wire no carbide insert", () => {
    expect(carbideInsert("square_hole_wire")).toBe(false);
  });
});

describe("specialProfile", () => {
  it("square hole wire has special profile", () => {
    expect(specialProfile("square_hole_wire")).toBe(true);
  });
  it("round hole standard no special profile", () => {
    expect(specialProfile("round_hole_standard")).toBe(false);
  });
});

describe("plateMetal", () => {
  it("round hole standard uses hardened tool steel", () => {
    expect(plateMetal("round_hole_standard")).toBe("hardened_tool_steel");
  });
});

describe("bestUse", () => {
  it("round hole standard best for round wire reduce", () => {
    expect(bestUse("round_hole_standard")).toBe("round_wire_reduce");
  });
});

describe("drawPlates", () => {
  it("returns 5 types", () => {
    expect(drawPlates()).toHaveLength(5);
  });
});
