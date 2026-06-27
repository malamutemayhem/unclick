import { describe, it, expect } from "vitest";
import {
  colorShift, patternDetail, brightness, fuseEase,
  glassCost, transparent, textured, coatingType,
  bestUse, dichroicGlass,
} from "../dichroic-calc.js";

describe("colorShift", () => {
  it("thin film clear most color shift", () => {
    expect(colorShift("thin_film_clear")).toBeGreaterThan(colorShift("slide_film_art"));
  });
});

describe("patternDetail", () => {
  it("pattern cap texture most pattern detail", () => {
    expect(patternDetail("pattern_cap_texture")).toBeGreaterThan(patternDetail("thin_film_clear"));
  });
});

describe("brightness", () => {
  it("solid black back brightest", () => {
    expect(brightness("solid_black_back")).toBeGreaterThan(brightness("slide_film_art"));
  });
});

describe("fuseEase", () => {
  it("thin film clear easiest to fuse", () => {
    expect(fuseEase("thin_film_clear")).toBeGreaterThan(fuseEase("slide_film_art"));
  });
});

describe("glassCost", () => {
  it("pattern cap texture most expensive", () => {
    expect(glassCost("pattern_cap_texture")).toBeGreaterThan(glassCost("crinkle_foil_shimmer"));
  });
});

describe("transparent", () => {
  it("thin film clear is transparent", () => {
    expect(transparent("thin_film_clear")).toBe(true);
  });
  it("solid black back not transparent", () => {
    expect(transparent("solid_black_back")).toBe(false);
  });
});

describe("textured", () => {
  it("pattern cap texture is textured", () => {
    expect(textured("pattern_cap_texture")).toBe(true);
  });
  it("thin film clear not textured", () => {
    expect(textured("thin_film_clear")).toBe(false);
  });
});

describe("coatingType", () => {
  it("thin film clear uses metallic oxide layer", () => {
    expect(coatingType("thin_film_clear")).toBe("metallic_oxide_layer");
  });
});

describe("bestUse", () => {
  it("solid black back best for bold color display", () => {
    expect(bestUse("solid_black_back")).toBe("bold_color_display");
  });
});

describe("dichroicGlass", () => {
  it("returns 5 types", () => {
    expect(dichroicGlass()).toHaveLength(5);
  });
});
