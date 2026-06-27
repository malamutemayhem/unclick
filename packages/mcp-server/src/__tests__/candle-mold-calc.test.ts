import { describe, it, expect } from "vitest";
import {
  detailCapture, releaseEase, durability, heatResist,
  moldCost, seesFillLevel, customShape, moldMaterial,
  bestCandle, candleMolds,
} from "../candle-mold-calc.js";

describe("detailCapture", () => {
  it("silicone flex detail best detail capture", () => {
    expect(detailCapture("silicone_flex_detail")).toBeGreaterThan(detailCapture("metal_pillar_round"));
  });
});

describe("releaseEase", () => {
  it("silicone flex detail easiest release", () => {
    expect(releaseEase("silicone_flex_detail")).toBeGreaterThan(releaseEase("plaster_carved_custom"));
  });
});

describe("durability", () => {
  it("metal pillar round most durable", () => {
    expect(durability("metal_pillar_round")).toBeGreaterThan(durability("plaster_carved_custom"));
  });
});

describe("heatResist", () => {
  it("metal pillar round best heat resist", () => {
    expect(heatResist("metal_pillar_round")).toBeGreaterThan(heatResist("rubber_latex_stretch"));
  });
});

describe("moldCost", () => {
  it("rubber latex stretch more expensive than plaster carved", () => {
    expect(moldCost("rubber_latex_stretch")).toBeGreaterThan(moldCost("plaster_carved_custom"));
  });
});

describe("seesFillLevel", () => {
  it("polycarbonate clear view sees fill level", () => {
    expect(seesFillLevel("polycarbonate_clear_view")).toBe(true);
  });
  it("silicone flex detail does not see fill level", () => {
    expect(seesFillLevel("silicone_flex_detail")).toBe(false);
  });
});

describe("customShape", () => {
  it("silicone flex detail supports custom shape", () => {
    expect(customShape("silicone_flex_detail")).toBe(true);
  });
  it("metal pillar round does not support custom shape", () => {
    expect(customShape("metal_pillar_round")).toBe(false);
  });
});

describe("moldMaterial", () => {
  it("metal pillar round uses seamless aluminum tube", () => {
    expect(moldMaterial("metal_pillar_round")).toBe("seamless_aluminum_tube");
  });
});

describe("bestCandle", () => {
  it("silicone flex detail best for sculpted figure candle", () => {
    expect(bestCandle("silicone_flex_detail")).toBe("sculpted_figure_candle");
  });
});

describe("candleMolds", () => {
  it("returns 5 types", () => {
    expect(candleMolds()).toHaveLength(5);
  });
});
