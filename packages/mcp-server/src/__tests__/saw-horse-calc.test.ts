import { describe, it, expect } from "vitest";
import {
  loadCapacity, portability, stability, setupSpeed,
  horseCost, foldFlat, hasClamp, legMaterial,
  bestTask, sawHorses,
} from "../saw-horse-calc.js";

describe("loadCapacity", () => {
  it("heavy duty fixed highest load capacity", () => {
    expect(loadCapacity("heavy_duty_fixed")).toBeGreaterThan(loadCapacity("plastic_stack_nest"));
  });
});

describe("portability", () => {
  it("plastic stack nest most portable", () => {
    expect(portability("plastic_stack_nest")).toBeGreaterThan(portability("heavy_duty_fixed"));
  });
});

describe("stability", () => {
  it("heavy duty fixed most stable", () => {
    expect(stability("heavy_duty_fixed")).toBeGreaterThan(stability("plastic_stack_nest"));
  });
});

describe("setupSpeed", () => {
  it("plastic stack nest fastest setup", () => {
    expect(setupSpeed("plastic_stack_nest")).toBeGreaterThan(setupSpeed("heavy_duty_fixed"));
  });
});

describe("horseCost", () => {
  it("adjustable height clamp most expensive", () => {
    expect(horseCost("adjustable_height_clamp")).toBeGreaterThan(horseCost("plastic_stack_nest"));
  });
});

describe("foldFlat", () => {
  it("folding steel light folds flat", () => {
    expect(foldFlat("folding_steel_light")).toBe(true);
  });
  it("heavy duty fixed does not", () => {
    expect(foldFlat("heavy_duty_fixed")).toBe(false);
  });
});

describe("hasClamp", () => {
  it("adjustable height clamp has clamp", () => {
    expect(hasClamp("adjustable_height_clamp")).toBe(true);
  });
  it("folding steel light does not", () => {
    expect(hasClamp("folding_steel_light")).toBe(false);
  });
});

describe("legMaterial", () => {
  it("heavy duty fixed uses solid steel welded frame", () => {
    expect(legMaterial("heavy_duty_fixed")).toBe("solid_steel_welded_frame");
  });
});

describe("bestTask", () => {
  it("plastic stack nest best for painting drying rack", () => {
    expect(bestTask("plastic_stack_nest")).toBe("painting_drying_rack");
  });
});

describe("sawHorses", () => {
  it("returns 5 types", () => {
    expect(sawHorses()).toHaveLength(5);
  });
});
