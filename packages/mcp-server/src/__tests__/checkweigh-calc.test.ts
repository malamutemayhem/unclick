import { describe, it, expect } from "vitest";
import {
  accuracy, speed, range, rejection,
  cwCost, dynamic, forHighSpeed, loadCell,
  bestUse, checkweighTypes,
} from "../checkweigh-calc.js";

describe("accuracy", () => {
  it("static platform most accurate", () => {
    expect(accuracy("static_platform_bench")).toBeGreaterThan(accuracy("in_motion_belt_conveyor"));
  });
});

describe("speed", () => {
  it("combination multi-head fastest", () => {
    expect(speed("combination_multi_head")).toBeGreaterThan(speed("static_platform_bench"));
  });
});

describe("range", () => {
  it("statistical sampling widest range", () => {
    expect(range("statistical_sampling_batch")).toBeGreaterThan(range("combination_multi_head"));
  });
});

describe("rejection", () => {
  it("in-motion belt best rejection", () => {
    expect(rejection("in_motion_belt_conveyor")).toBeGreaterThan(rejection("static_platform_bench"));
  });
});

describe("cwCost", () => {
  it("combination multi-head most expensive", () => {
    expect(cwCost("combination_multi_head")).toBeGreaterThan(cwCost("static_platform_bench"));
  });
});

describe("dynamic", () => {
  it("in-motion belt is dynamic", () => {
    expect(dynamic("in_motion_belt_conveyor")).toBe(true);
  });
  it("static platform not dynamic", () => {
    expect(dynamic("static_platform_bench")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("combination multi-head for high speed", () => {
    expect(forHighSpeed("combination_multi_head")).toBe(true);
  });
  it("catchweight not for high speed", () => {
    expect(forHighSpeed("catchweight_price_label")).toBe(false);
  });
});

describe("loadCell", () => {
  it("in-motion belt uses EMFR cell", () => {
    expect(loadCell("in_motion_belt_conveyor")).toBe("electromagnetic_force_restoration");
  });
});

describe("bestUse", () => {
  it("combination for snack mixed product", () => {
    expect(bestUse("combination_multi_head")).toBe("snack_salad_mixed_product_weigh");
  });
});

describe("checkweighTypes", () => {
  it("returns 5 types", () => {
    expect(checkweighTypes()).toHaveLength(5);
  });
});
