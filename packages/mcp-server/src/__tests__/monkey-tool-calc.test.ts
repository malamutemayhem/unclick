import { describe, it, expect } from "vitest";
import {
  centerTrue, finishClean, speedWork, sizeRange,
  toolCost, adjustable, springLoaded, holeShape,
  bestUse, monkeyTools,
} from "../monkey-tool-calc.js";

describe("centerTrue", () => {
  it("hex hole bolt truest center", () => {
    expect(centerTrue("hex_hole_bolt")).toBeGreaterThan(centerTrue("adjustable_hole_set"));
  });
});

describe("finishClean", () => {
  it("hex hole bolt cleanest finish", () => {
    expect(finishClean("hex_hole_bolt")).toBeGreaterThan(finishClean("adjustable_hole_set"));
  });
});

describe("speedWork", () => {
  it("spring loaded grip fastest work", () => {
    expect(speedWork("spring_loaded_grip")).toBeGreaterThan(speedWork("square_hole_carriage"));
  });
});

describe("sizeRange", () => {
  it("adjustable hole set widest size range", () => {
    expect(sizeRange("adjustable_hole_set")).toBeGreaterThan(sizeRange("hex_hole_bolt"));
  });
});

describe("toolCost", () => {
  it("adjustable hole set most expensive", () => {
    expect(toolCost("adjustable_hole_set")).toBeGreaterThan(toolCost("round_hole_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable hole set is adjustable", () => {
    expect(adjustable("adjustable_hole_set")).toBe(true);
  });
  it("round hole standard not adjustable", () => {
    expect(adjustable("round_hole_standard")).toBe(false);
  });
});

describe("springLoaded", () => {
  it("spring loaded grip is spring loaded", () => {
    expect(springLoaded("spring_loaded_grip")).toBe(true);
  });
  it("round hole standard not spring loaded", () => {
    expect(springLoaded("round_hole_standard")).toBe(false);
  });
});

describe("holeShape", () => {
  it("hex hole bolt uses hex bore hole", () => {
    expect(holeShape("hex_hole_bolt")).toBe("hex_bore_hole");
  });
});

describe("bestUse", () => {
  it("round hole standard best for general bolt center", () => {
    expect(bestUse("round_hole_standard")).toBe("general_bolt_center");
  });
});

describe("monkeyTools", () => {
  it("returns 5 types", () => {
    expect(monkeyTools()).toHaveLength(5);
  });
});
