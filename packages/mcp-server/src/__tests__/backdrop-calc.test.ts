import { describe, it, expect } from "vitest";
import {
  imageQuality, portability, durability, cleanEase,
  backdropCost, washable, chromakeyReady, surfaceFinish,
  bestShoot, backdrops,
} from "../backdrop-calc.js";

describe("imageQuality", () => {
  it("canvas painted scenic best image quality", () => {
    expect(imageQuality("canvas_painted_scenic")).toBeGreaterThan(imageQuality("collapsible_popup_reversible"));
  });
});

describe("portability", () => {
  it("collapsible popup reversible most portable", () => {
    expect(portability("collapsible_popup_reversible")).toBeGreaterThan(portability("canvas_painted_scenic"));
  });
});

describe("durability", () => {
  it("vinyl matte smooth most durable", () => {
    expect(durability("vinyl_matte_smooth")).toBeGreaterThan(durability("paper_seamless_roll"));
  });
});

describe("cleanEase", () => {
  it("vinyl matte smooth easiest to clean", () => {
    expect(cleanEase("vinyl_matte_smooth")).toBeGreaterThan(cleanEase("paper_seamless_roll"));
  });
});

describe("backdropCost", () => {
  it("canvas painted scenic most expensive", () => {
    expect(backdropCost("canvas_painted_scenic")).toBeGreaterThan(backdropCost("paper_seamless_roll"));
  });
});

describe("washable", () => {
  it("muslin cotton wrinkle is washable", () => {
    expect(washable("muslin_cotton_wrinkle")).toBe(true);
  });
  it("paper seamless roll is not", () => {
    expect(washable("paper_seamless_roll")).toBe(false);
  });
});

describe("chromakeyReady", () => {
  it("vinyl matte smooth is chromakey ready", () => {
    expect(chromakeyReady("vinyl_matte_smooth")).toBe(true);
  });
  it("canvas painted scenic is not", () => {
    expect(chromakeyReady("canvas_painted_scenic")).toBe(false);
  });
});

describe("surfaceFinish", () => {
  it("paper seamless roll uses matte recycled pulp", () => {
    expect(surfaceFinish("paper_seamless_roll")).toBe("matte_recycled_pulp");
  });
});

describe("bestShoot", () => {
  it("vinyl matte smooth best for product food flat lay", () => {
    expect(bestShoot("vinyl_matte_smooth")).toBe("product_food_flat_lay");
  });
});

describe("backdrops", () => {
  it("returns 5 types", () => {
    expect(backdrops()).toHaveLength(5);
  });
});
