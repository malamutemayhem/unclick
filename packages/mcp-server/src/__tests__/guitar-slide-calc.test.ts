import { describe, it, expect } from "vitest";
import {
  toneWarmth, sustain, controlEase, slideWeight,
  slideCost, noiseFree, breakResist, slideMaterial,
  bestGenre, guitarSlides,
} from "../guitar-slide-calc.js";

describe("toneWarmth", () => {
  it("brass heavy warm most tone warmth", () => {
    expect(toneWarmth("brass_heavy_warm")).toBeGreaterThan(toneWarmth("chrome_steel_bright"));
  });
});

describe("sustain", () => {
  it("brass heavy warm most sustain", () => {
    expect(sustain("brass_heavy_warm")).toBeGreaterThan(sustain("bone_natural_vintage"));
  });
});

describe("controlEase", () => {
  it("glass pyrex smooth best control ease", () => {
    expect(controlEase("glass_pyrex_smooth")).toBeGreaterThan(controlEase("bone_natural_vintage"));
  });
});

describe("slideWeight", () => {
  it("brass heavy warm heaviest", () => {
    expect(slideWeight("brass_heavy_warm")).toBeGreaterThan(slideWeight("glass_pyrex_smooth"));
  });
});

describe("slideCost", () => {
  it("ceramic porcelain mellow most expensive", () => {
    expect(slideCost("ceramic_porcelain_mellow")).toBeGreaterThan(slideCost("glass_pyrex_smooth"));
  });
});

describe("noiseFree", () => {
  it("glass pyrex smooth is noise free", () => {
    expect(noiseFree("glass_pyrex_smooth")).toBe(true);
  });
  it("brass heavy warm is not noise free", () => {
    expect(noiseFree("brass_heavy_warm")).toBe(false);
  });
});

describe("breakResist", () => {
  it("brass heavy warm is break resistant", () => {
    expect(breakResist("brass_heavy_warm")).toBe(true);
  });
  it("glass pyrex smooth is not break resistant", () => {
    expect(breakResist("glass_pyrex_smooth")).toBe(false);
  });
});

describe("slideMaterial", () => {
  it("brass heavy warm uses solid brass machined", () => {
    expect(slideMaterial("brass_heavy_warm")).toBe("solid_brass_machined");
  });
});

describe("bestGenre", () => {
  it("glass pyrex smooth best for delta blues acoustic", () => {
    expect(bestGenre("glass_pyrex_smooth")).toBe("delta_blues_acoustic");
  });
});

describe("guitarSlides", () => {
  it("returns 5 types", () => {
    expect(guitarSlides()).toHaveLength(5);
  });
});
