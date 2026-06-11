import { describe, it, expect } from "vitest";
import {
  filmClarity, throughput, thicknessControl, barrierProperty,
  feCost, oriented, forFood, extruderConfig,
  bestUse, filmExtruderTypes,
} from "../film-extruder-calc.js";

describe("filmClarity", () => {
  it("biaxial stretch best film clarity", () => {
    expect(filmClarity("biaxial_stretch")).toBeGreaterThanOrEqual(filmClarity("nano_layer"));
  });
});

describe("throughput", () => {
  it("cast film highest throughput", () => {
    expect(throughput("cast_film")).toBeGreaterThan(throughput("nano_layer"));
  });
});

describe("thicknessControl", () => {
  it("biaxial stretch best thickness control", () => {
    expect(thicknessControl("biaxial_stretch")).toBeGreaterThanOrEqual(thicknessControl("nano_layer"));
  });
});

describe("barrierProperty", () => {
  it("nano layer best barrier property", () => {
    expect(barrierProperty("nano_layer")).toBeGreaterThanOrEqual(barrierProperty("multi_layer"));
  });
});

describe("feCost", () => {
  it("nano layer most expensive", () => {
    expect(feCost("nano_layer")).toBeGreaterThan(feCost("blown_film"));
  });
});

describe("oriented", () => {
  it("biaxial stretch is oriented", () => {
    expect(oriented("biaxial_stretch")).toBe(true);
  });
  it("blown film not oriented", () => {
    expect(oriented("blown_film")).toBe(false);
  });
});

describe("forFood", () => {
  it("blown film for food", () => {
    expect(forFood("blown_film")).toBe(true);
  });
  it("nano layer not for food", () => {
    expect(forFood("nano_layer")).toBe(false);
  });
});

describe("extruderConfig", () => {
  it("multi layer uses coextrude feedblock combine", () => {
    expect(extruderConfig("multi_layer")).toBe("multi_layer_film_extruder_coextrude_feedblock_combine_barrier");
  });
});

describe("bestUse", () => {
  it("cast film for clear cling wrap lamination optical", () => {
    expect(bestUse("cast_film")).toBe("clear_film_cast_extruder_cling_wrap_lamination_optical_clarity");
  });
});

describe("filmExtruderTypes", () => {
  it("returns 5 types", () => {
    expect(filmExtruderTypes()).toHaveLength(5);
  });
});
