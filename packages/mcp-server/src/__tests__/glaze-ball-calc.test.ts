import { describe, it, expect } from "vitest";
import {
  grindEfficiency, wearResist, contaminationLow, sizeRange,
  ballCost, synthetic, forStoneware, mediaDensity,
  bestUse, glazeBalls,
} from "../glaze-ball-calc.js";

describe("grindEfficiency", () => {
  it("zirconia ball dense most efficient grind", () => {
    expect(grindEfficiency("zirconia_ball_dense")).toBeGreaterThan(grindEfficiency("flint_pebble_natural"));
  });
});

describe("wearResist", () => {
  it("zirconia ball dense best wear resist", () => {
    expect(wearResist("zirconia_ball_dense")).toBeGreaterThan(wearResist("flint_pebble_natural"));
  });
});

describe("contaminationLow", () => {
  it("zirconia ball dense lowest contamination", () => {
    expect(contaminationLow("zirconia_ball_dense")).toBeGreaterThan(contaminationLow("steatite_ball_standard"));
  });
});

describe("sizeRange", () => {
  it("steatite ball standard widest size range", () => {
    expect(sizeRange("steatite_ball_standard")).toBeGreaterThan(sizeRange("flint_pebble_natural"));
  });
});

describe("ballCost", () => {
  it("zirconia ball dense most expensive", () => {
    expect(ballCost("zirconia_ball_dense")).toBeGreaterThan(ballCost("flint_pebble_natural"));
  });
});

describe("synthetic", () => {
  it("alumina ball hard is synthetic", () => {
    expect(synthetic("alumina_ball_hard")).toBe(true);
  });
  it("flint pebble natural not synthetic", () => {
    expect(synthetic("flint_pebble_natural")).toBe(false);
  });
});

describe("forStoneware", () => {
  it("alumina ball hard is for stoneware", () => {
    expect(forStoneware("alumina_ball_hard")).toBe(true);
  });
  it("flint pebble natural not for stoneware", () => {
    expect(forStoneware("flint_pebble_natural")).toBe(false);
  });
});

describe("mediaDensity", () => {
  it("zirconia ball dense uses ultra high density zrc", () => {
    expect(mediaDensity("zirconia_ball_dense")).toBe("ultra_high_density_zrc");
  });
});

describe("bestUse", () => {
  it("porcelain ball smooth best for general glaze mill", () => {
    expect(bestUse("porcelain_ball_smooth")).toBe("general_glaze_mill");
  });
});

describe("glazeBalls", () => {
  it("returns 5 types", () => {
    expect(glazeBalls()).toHaveLength(5);
  });
});
