import { describe, it, expect } from "vitest";
import {
  cutClean, controlAngle, bladeLife, handleGrip,
  knifeCost, doubleEdge, forFrog, bladeShape,
  bestUse, hoofKnives,
} from "../hoof-knife-calc.js";

describe("cutClean", () => {
  it("narrow blade sole cleanest cut", () => {
    expect(cutClean("narrow_blade_sole")).toBeGreaterThan(cutClean("wide_blade_frog"));
  });
});

describe("controlAngle", () => {
  it("right hand loop best control angle", () => {
    expect(controlAngle("right_hand_loop")).toBeGreaterThan(controlAngle("double_edge_straight"));
  });
});

describe("bladeLife", () => {
  it("double edge straight longest blade life", () => {
    expect(bladeLife("double_edge_straight")).toBeGreaterThan(bladeLife("narrow_blade_sole"));
  });
});

describe("handleGrip", () => {
  it("wide blade frog best handle grip", () => {
    expect(handleGrip("wide_blade_frog")).toBeGreaterThan(handleGrip("double_edge_straight"));
  });
});

describe("knifeCost", () => {
  it("double edge straight costs more than right hand loop", () => {
    expect(knifeCost("double_edge_straight")).toBeGreaterThan(knifeCost("right_hand_loop"));
  });
});

describe("doubleEdge", () => {
  it("double edge straight is double edge", () => {
    expect(doubleEdge("double_edge_straight")).toBe(true);
  });
  it("right hand loop not double edge", () => {
    expect(doubleEdge("right_hand_loop")).toBe(false);
  });
});

describe("forFrog", () => {
  it("wide blade frog is for frog", () => {
    expect(forFrog("wide_blade_frog")).toBe(true);
  });
  it("narrow blade sole not for frog", () => {
    expect(forFrog("narrow_blade_sole")).toBe(false);
  });
});

describe("bladeShape", () => {
  it("right hand loop uses right loop curve", () => {
    expect(bladeShape("right_hand_loop")).toBe("right_loop_curve");
  });
});

describe("bestUse", () => {
  it("narrow blade sole best for precision sole pare", () => {
    expect(bestUse("narrow_blade_sole")).toBe("precision_sole_pare");
  });
});

describe("hoofKnives", () => {
  it("returns 5 types", () => {
    expect(hoofKnives()).toHaveLength(5);
  });
});
