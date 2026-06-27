import { describe, it, expect } from "vitest";
import {
  speed, loadStability, filmSaving, flexibility,
  swwCost, automated, forHeavyLoad, wrap,
  bestUse, stretchWrapperTypes,
} from "../stretch-wrapper-calc.js";

describe("speed", () => {
  it("orbital ring fastest", () => {
    expect(speed("orbital_ring")).toBeGreaterThan(speed("turntable_semi"));
  });
});

describe("loadStability", () => {
  it("rotary arm and orbital ring best stability", () => {
    expect(loadStability("rotary_arm")).toBeGreaterThan(loadStability("turntable_semi"));
    expect(loadStability("orbital_ring")).toBeGreaterThan(loadStability("turntable_semi"));
  });
});

describe("filmSaving", () => {
  it("orbital ring best film saving", () => {
    expect(filmSaving("orbital_ring")).toBeGreaterThan(filmSaving("turntable_semi"));
  });
});

describe("flexibility", () => {
  it("robotic mobile most flexible", () => {
    expect(flexibility("robotic_mobile")).toBeGreaterThan(flexibility("orbital_ring"));
  });
});

describe("swwCost", () => {
  it("robotic mobile most expensive", () => {
    expect(swwCost("robotic_mobile")).toBeGreaterThan(swwCost("turntable_semi"));
  });
});

describe("automated", () => {
  it("turntable auto is automated", () => {
    expect(automated("turntable_auto")).toBe(true);
  });
  it("turntable semi not automated", () => {
    expect(automated("turntable_semi")).toBe(false);
  });
});

describe("forHeavyLoad", () => {
  it("rotary arm for heavy load", () => {
    expect(forHeavyLoad("rotary_arm")).toBe(true);
  });
  it("turntable semi not for heavy load", () => {
    expect(forHeavyLoad("turntable_semi")).toBe(false);
  });
});

describe("wrap", () => {
  it("robotic mobile uses agv mounted wrapper", () => {
    expect(wrap("robotic_mobile")).toBe("agv_mounted_wrapper_robot_drive_around_pallet_any_location");
  });
});

describe("bestUse", () => {
  it("orbital ring for long product", () => {
    expect(bestUse("orbital_ring")).toBe("long_product_lumber_pipe_profile_extrusion_horizontal_wrap");
  });
});

describe("stretchWrapperTypes", () => {
  it("returns 5 types", () => {
    expect(stretchWrapperTypes()).toHaveLength(5);
  });
});
