import { describe, it, expect } from "vitest";
import {
  coilControl, easeOfUse, shapeVariety, speedOutput,
  toolCost, forBeginners, makesTexture, toolAction,
  bestShape, quillingTools,
} from "../quilling-tool-calc.js";

describe("coilControl", () => {
  it("needle fine tight best coil control", () => {
    expect(coilControl("needle_fine_tight")).toBeGreaterThan(coilControl("crimper_wave_texture"));
  });
});

describe("easeOfUse", () => {
  it("slotted needle basic easiest to use", () => {
    expect(easeOfUse("slotted_needle_basic")).toBeGreaterThan(easeOfUse("needle_fine_tight"));
  });
});

describe("shapeVariety", () => {
  it("circle sizer board most shape variety", () => {
    expect(shapeVariety("circle_sizer_board")).toBeGreaterThan(shapeVariety("fringe_cutter_strip"));
  });
});

describe("speedOutput", () => {
  it("fringe cutter strip fastest speed", () => {
    expect(speedOutput("fringe_cutter_strip")).toBeGreaterThan(speedOutput("needle_fine_tight"));
  });
});

describe("toolCost", () => {
  it("crimper wave texture more expensive than slotted needle", () => {
    expect(toolCost("crimper_wave_texture")).toBeGreaterThan(toolCost("slotted_needle_basic"));
  });
});

describe("forBeginners", () => {
  it("slotted needle basic is for beginners", () => {
    expect(forBeginners("slotted_needle_basic")).toBe(true);
  });
  it("needle fine tight is not for beginners", () => {
    expect(forBeginners("needle_fine_tight")).toBe(false);
  });
});

describe("makesTexture", () => {
  it("crimper wave texture makes texture", () => {
    expect(makesTexture("crimper_wave_texture")).toBe(true);
  });
  it("slotted needle basic does not make texture", () => {
    expect(makesTexture("slotted_needle_basic")).toBe(false);
  });
});

describe("toolAction", () => {
  it("slotted needle basic uses slot insert wind", () => {
    expect(toolAction("slotted_needle_basic")).toBe("slot_insert_wind");
  });
});

describe("bestShape", () => {
  it("fringe cutter strip best for flower petal fringe", () => {
    expect(bestShape("fringe_cutter_strip")).toBe("flower_petal_fringe");
  });
});

describe("quillingTools", () => {
  it("returns 5 types", () => {
    expect(quillingTools()).toHaveLength(5);
  });
});
