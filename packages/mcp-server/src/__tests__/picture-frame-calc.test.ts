import { describe, it, expect } from "vitest";
import {
  aestheticAppeal, durability, versatility, easySwap,
  frameCost, uvGlass, matIncluded, frameMaterial,
  bestDisplay, pictureFrames,
} from "../picture-frame-calc.js";

describe("aestheticAppeal", () => {
  it("shadow box deep highest aesthetic appeal", () => {
    expect(aestheticAppeal("shadow_box_deep")).toBeGreaterThan(aestheticAppeal("clip_frameless_glass"));
  });
});

describe("durability", () => {
  it("metal modern thin most durable", () => {
    expect(durability("metal_modern_thin")).toBeGreaterThan(durability("floating_acrylic"));
  });
});

describe("versatility", () => {
  it("shadow box deep most versatile", () => {
    expect(versatility("shadow_box_deep")).toBeGreaterThan(versatility("clip_frameless_glass"));
  });
});

describe("easySwap", () => {
  it("clip frameless glass easiest to swap", () => {
    expect(easySwap("clip_frameless_glass")).toBeGreaterThan(easySwap("shadow_box_deep"));
  });
});

describe("frameCost", () => {
  it("shadow box deep most expensive", () => {
    expect(frameCost("shadow_box_deep")).toBeGreaterThan(frameCost("clip_frameless_glass"));
  });
});

describe("uvGlass", () => {
  it("wood gallery classic has uv glass", () => {
    expect(uvGlass("wood_gallery_classic")).toBe(true);
  });
  it("metal modern thin does not", () => {
    expect(uvGlass("metal_modern_thin")).toBe(false);
  });
});

describe("matIncluded", () => {
  it("wood gallery classic includes mat", () => {
    expect(matIncluded("wood_gallery_classic")).toBe(true);
  });
  it("floating acrylic does not", () => {
    expect(matIncluded("floating_acrylic")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("wood gallery classic uses solid hardwood stained", () => {
    expect(frameMaterial("wood_gallery_classic")).toBe("solid_hardwood_stained");
  });
});

describe("bestDisplay", () => {
  it("shadow box deep best for memorabilia 3d object", () => {
    expect(bestDisplay("shadow_box_deep")).toBe("memorabilia_3d_object");
  });
});

describe("pictureFrames", () => {
  it("returns 5 types", () => {
    expect(pictureFrames()).toHaveLength(5);
  });
});
