import { describe, it, expect } from "vitest";
import {
  edgeFirm, shapeHold, durability, installEase,
  rollCost, synthetic, hasWire, coreMaterial,
  bestUse, edgeRollUpholsts,
} from "../edge-roll-upholst-calc.js";

describe("edgeFirm", () => {
  it("spring edge wire firmest edge", () => {
    expect(edgeFirm("spring_edge_wire")).toBeGreaterThan(edgeFirm("foam_roll_soft"));
  });
});

describe("shapeHold", () => {
  it("spring edge wire best shape hold", () => {
    expect(shapeHold("spring_edge_wire")).toBeGreaterThan(shapeHold("foam_roll_soft"));
  });
});

describe("durability", () => {
  it("synthetic roll durable most durable", () => {
    expect(durability("synthetic_roll_durable")).toBeGreaterThan(durability("foam_roll_soft"));
  });
});

describe("installEase", () => {
  it("foam roll soft easiest install", () => {
    expect(installEase("foam_roll_soft")).toBeGreaterThan(installEase("spring_edge_wire"));
  });
});

describe("rollCost", () => {
  it("spring edge wire most expensive", () => {
    expect(rollCost("spring_edge_wire")).toBeGreaterThan(rollCost("foam_roll_soft"));
  });
});

describe("synthetic", () => {
  it("foam roll soft is synthetic", () => {
    expect(synthetic("foam_roll_soft")).toBe(true);
  });
  it("fiber roll standard not synthetic", () => {
    expect(synthetic("fiber_roll_standard")).toBe(false);
  });
});

describe("hasWire", () => {
  it("spring edge wire has wire", () => {
    expect(hasWire("spring_edge_wire")).toBe(true);
  });
  it("fiber roll standard has no wire", () => {
    expect(hasWire("fiber_roll_standard")).toBe(false);
  });
});

describe("coreMaterial", () => {
  it("cotton roll firm uses dense cotton roll", () => {
    expect(coreMaterial("cotton_roll_firm")).toBe("dense_cotton_roll");
  });
});

describe("bestUse", () => {
  it("fiber roll standard best for general edge build", () => {
    expect(bestUse("fiber_roll_standard")).toBe("general_edge_build");
  });
});

describe("edgeRollUpholsts", () => {
  it("returns 5 types", () => {
    expect(edgeRollUpholsts()).toHaveLength(5);
  });
});
