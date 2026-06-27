import { describe, it, expect } from "vitest";
import {
  speed, flexibility, footprint, reliability,
  plCost, multiSku, forHeavyCase, method,
  bestUse, palletizerTypes,
} from "../palletizer-calc.js";

describe("speed", () => {
  it("conventional high level fastest", () => {
    expect(speed("conventional_high_level")).toBeGreaterThan(speed("column_stacking_inline"));
  });
});

describe("flexibility", () => {
  it("robotic arm most flexible", () => {
    expect(flexibility("robotic_articulated_arm")).toBeGreaterThan(flexibility("conventional_high_level"));
  });
});

describe("footprint", () => {
  it("column stacking smallest footprint", () => {
    expect(footprint("column_stacking_inline")).toBeGreaterThan(footprint("conventional_high_level"));
  });
});

describe("reliability", () => {
  it("conventional high level most reliable", () => {
    expect(reliability("conventional_high_level")).toBeGreaterThan(reliability("robotic_articulated_arm"));
  });
});

describe("plCost", () => {
  it("robotic arm most expensive", () => {
    expect(plCost("robotic_articulated_arm")).toBeGreaterThan(plCost("column_stacking_inline"));
  });
});

describe("multiSku", () => {
  it("robotic arm handles multi sku", () => {
    expect(multiSku("robotic_articulated_arm")).toBe(true);
  });
  it("conventional not multi sku", () => {
    expect(multiSku("conventional_high_level")).toBe(false);
  });
});

describe("forHeavyCase", () => {
  it("conventional high level for heavy case", () => {
    expect(forHeavyCase("conventional_high_level")).toBe(true);
  });
  it("column stacking not for heavy case", () => {
    expect(forHeavyCase("column_stacking_inline")).toBe(false);
  });
});

describe("method", () => {
  it("robotic uses 6 axis vacuum gripper", () => {
    expect(method("robotic_articulated_arm")).toBe("6_axis_robot_vacuum_gripper");
  });
});

describe("bestUse", () => {
  it("layer forming for canned goods", () => {
    expect(bestUse("layer_forming_sweep")).toBe("canned_goods_tray_layer_stack");
  });
});

describe("palletizerTypes", () => {
  it("returns 5 types", () => {
    expect(palletizerTypes()).toHaveLength(5);
  });
});
