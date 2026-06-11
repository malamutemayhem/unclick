import { describe, it, expect } from "vitest";
import {
  speed, holeDepth, holeDiameter, accuracy,
  bdCost, autonomous, forHardRock, drilling,
  bestUse, blastHoleDrillTypes,
} from "../blast-hole-drill-calc.js";

describe("speed", () => {
  it("rotary air blast fastest", () => {
    expect(speed("rotary_air_blast")).toBeGreaterThan(speed("down_the_hole"));
  });
});

describe("holeDepth", () => {
  it("rotary tricone deepest hole", () => {
    expect(holeDepth("rotary_tricone")).toBeGreaterThan(holeDepth("rotary_air_blast"));
  });
});

describe("holeDiameter", () => {
  it("rotary tricone largest diameter", () => {
    expect(holeDiameter("rotary_tricone")).toBeGreaterThan(holeDiameter("top_hammer"));
  });
});

describe("accuracy", () => {
  it("down the hole most accurate", () => {
    expect(accuracy("down_the_hole")).toBeGreaterThan(accuracy("rotary_air_blast"));
  });
});

describe("bdCost", () => {
  it("rotary tricone most expensive", () => {
    expect(bdCost("rotary_tricone")).toBeGreaterThan(bdCost("rotary_air_blast"));
  });
});

describe("autonomous", () => {
  it("rotary tricone is autonomous capable", () => {
    expect(autonomous("rotary_tricone")).toBe(true);
  });
  it("top hammer not autonomous", () => {
    expect(autonomous("top_hammer")).toBe(false);
  });
});

describe("forHardRock", () => {
  it("rotary tricone for hard rock", () => {
    expect(forHardRock("rotary_tricone")).toBe(true);
  });
  it("rotary air blast not for hard rock", () => {
    expect(forHardRock("rotary_air_blast")).toBe(false);
  });
});

describe("drilling", () => {
  it("down the hole uses pneumatic hammer", () => {
    expect(drilling("down_the_hole")).toBe("pneumatic_hammer_at_bit_face_rotation_from_surface_air");
  });
});

describe("bestUse", () => {
  it("rotary tricone for large open pit", () => {
    expect(bestUse("rotary_tricone")).toBe("large_open_pit_blast_hole_200_400mm_overburden_ore_bench");
  });
});

describe("blastHoleDrillTypes", () => {
  it("returns 5 types", () => {
    expect(blastHoleDrillTypes()).toHaveLength(5);
  });
});
