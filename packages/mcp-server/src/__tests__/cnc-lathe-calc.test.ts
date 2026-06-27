import { describe, it, expect } from "vitest";
import {
  precision, speed, complexity, throughput,
  clCost, multiAxis, forSmallParts, spindle,
  bestUse, cncLatheTypes,
} from "../cnc-lathe-calc.js";

describe("precision", () => {
  it("swiss most precise", () => {
    expect(precision("swiss_type_sliding_head")).toBeGreaterThan(precision("vertical_turret_lathe"));
  });
});

describe("speed", () => {
  it("multi spindle fastest", () => {
    expect(speed("multi_spindle_automatic")).toBeGreaterThan(speed("vertical_turret_lathe"));
  });
});

describe("complexity", () => {
  it("live tooling most complex", () => {
    expect(complexity("live_tooling_mill_turn")).toBeGreaterThan(complexity("horizontal_turning_center"));
  });
});

describe("throughput", () => {
  it("multi spindle highest throughput", () => {
    expect(throughput("multi_spindle_automatic")).toBeGreaterThan(throughput("horizontal_turning_center"));
  });
});

describe("clCost", () => {
  it("multi spindle most expensive", () => {
    expect(clCost("multi_spindle_automatic")).toBeGreaterThan(clCost("horizontal_turning_center"));
  });
});

describe("multiAxis", () => {
  it("swiss is multi axis", () => {
    expect(multiAxis("swiss_type_sliding_head")).toBe(true);
  });
  it("horizontal not multi axis", () => {
    expect(multiAxis("horizontal_turning_center")).toBe(false);
  });
});

describe("forSmallParts", () => {
  it("swiss for small parts", () => {
    expect(forSmallParts("swiss_type_sliding_head")).toBe(true);
  });
  it("vertical not small parts", () => {
    expect(forSmallParts("vertical_turret_lathe")).toBe(false);
  });
});

describe("spindle", () => {
  it("live tooling uses main sub spindle", () => {
    expect(spindle("live_tooling_mill_turn")).toBe("main_sub_spindle_c_y_axis");
  });
});

describe("bestUse", () => {
  it("swiss for medical implant", () => {
    expect(bestUse("swiss_type_sliding_head")).toBe("medical_implant_watch_component");
  });
});

describe("cncLatheTypes", () => {
  it("returns 5 types", () => {
    expect(cncLatheTypes()).toHaveLength(5);
  });
});
