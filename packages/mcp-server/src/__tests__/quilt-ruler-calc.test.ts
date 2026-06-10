import { describe, it, expect } from "vitest";
import {
  accuracy, versatility, easeOfUse, markingClarity,
  rulerCost, nonSlip, forSpecialShape, rulerMaterial,
  bestUse, quiltRulers,
} from "../quilt-ruler-calc.js";

describe("accuracy", () => {
  it("rectangle long wide most accurate", () => {
    expect(accuracy("rectangle_long_wide")).toBeGreaterThan(accuracy("wedge_dresden_fan"));
  });
});

describe("versatility", () => {
  it("square basic clear most versatile", () => {
    expect(versatility("square_basic_clear")).toBeGreaterThan(versatility("wedge_dresden_fan"));
  });
});

describe("easeOfUse", () => {
  it("square basic clear easiest to use", () => {
    expect(easeOfUse("square_basic_clear")).toBeGreaterThan(easeOfUse("circle_curve_set"));
  });
});

describe("markingClarity", () => {
  it("square basic clear clearest markings", () => {
    expect(markingClarity("square_basic_clear")).toBeGreaterThan(markingClarity("wedge_dresden_fan"));
  });
});

describe("rulerCost", () => {
  it("circle curve set most expensive", () => {
    expect(rulerCost("circle_curve_set")).toBeGreaterThan(rulerCost("square_basic_clear"));
  });
});

describe("nonSlip", () => {
  it("square basic clear is non slip", () => {
    expect(nonSlip("square_basic_clear")).toBe(true);
  });
  it("wedge dresden fan is not non slip", () => {
    expect(nonSlip("wedge_dresden_fan")).toBe(false);
  });
});

describe("forSpecialShape", () => {
  it("triangle half square is for special shape", () => {
    expect(forSpecialShape("triangle_half_square")).toBe(true);
  });
  it("square basic clear is not for special shape", () => {
    expect(forSpecialShape("square_basic_clear")).toBe(false);
  });
});

describe("rulerMaterial", () => {
  it("wedge dresden fan uses acrylic wedge shaped", () => {
    expect(rulerMaterial("wedge_dresden_fan")).toBe("acrylic_wedge_shaped");
  });
});

describe("bestUse", () => {
  it("rectangle long wide best for strip cutting border", () => {
    expect(bestUse("rectangle_long_wide")).toBe("strip_cutting_border");
  });
});

describe("quiltRulers", () => {
  it("returns 5 types", () => {
    expect(quiltRulers()).toHaveLength(5);
  });
});
