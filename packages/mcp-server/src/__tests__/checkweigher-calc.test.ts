import { describe, it, expect } from "vitest";
import {
  speed, accuracy, productRange, rejection,
  cwCost, dynamic, forFood, sensor,
  bestUse, checkweigherTypes,
} from "../checkweigher-calc.js";

describe("speed", () => {
  it("combination multihead fastest", () => {
    expect(speed("combination_multihead")).toBeGreaterThan(speed("static_platform"));
  });
});

describe("accuracy", () => {
  it("combination multihead and static platform most accurate", () => {
    expect(accuracy("combination_multihead")).toBeGreaterThan(accuracy("dynamic_high_speed"));
    expect(accuracy("static_platform")).toBeGreaterThan(accuracy("dynamic_high_speed"));
  });
});

describe("productRange", () => {
  it("static platform widest product range", () => {
    expect(productRange("static_platform")).toBeGreaterThan(productRange("dynamic_high_speed"));
  });
});

describe("rejection", () => {
  it("combination multihead best rejection", () => {
    expect(rejection("combination_multihead")).toBeGreaterThan(rejection("static_platform"));
  });
});

describe("cwCost", () => {
  it("combination multihead most expensive", () => {
    expect(cwCost("combination_multihead")).toBeGreaterThan(cwCost("static_platform"));
  });
});

describe("dynamic", () => {
  it("inline belt is dynamic", () => {
    expect(dynamic("inline_belt")).toBe(true);
  });
  it("static platform not dynamic", () => {
    expect(dynamic("static_platform")).toBe(false);
  });
});

describe("forFood", () => {
  it("inline belt for food", () => {
    expect(forFood("inline_belt")).toBe(true);
  });
  it("static platform not for food", () => {
    expect(forFood("static_platform")).toBe(false);
  });
});

describe("sensor", () => {
  it("dynamic high speed uses emfr", () => {
    expect(sensor("dynamic_high_speed")).toBe("emfr_electromagnetic_force_restoration_high_speed_cell");
  });
});

describe("bestUse", () => {
  it("in motion conveyor for parcel logistics", () => {
    expect(bestUse("in_motion_conveyor")).toBe("parcel_logistics_postal_dim_weight_sorting_auto_label");
  });
});

describe("checkweigherTypes", () => {
  it("returns 5 types", () => {
    expect(checkweigherTypes()).toHaveLength(5);
  });
});
