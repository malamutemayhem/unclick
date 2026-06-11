import { describe, it, expect } from "vitest";
import {
  speed, inkDeposit, versatility, registration,
  spCost, multiColor, forTextile, mesh,
  bestUse, screenPrintingPressTypes,
} from "../screen-printing-press-calc.js";

describe("speed", () => {
  it("inline industrial fastest", () => {
    expect(speed("inline_industrial")).toBeGreaterThan(speed("flatbed"));
  });
});

describe("inkDeposit", () => {
  it("flatbed thickest ink deposit", () => {
    expect(inkDeposit("flatbed")).toBeGreaterThan(inkDeposit("rotary"));
  });
});

describe("versatility", () => {
  it("flatbed most versatile", () => {
    expect(versatility("flatbed")).toBeGreaterThan(versatility("inline_industrial"));
  });
});

describe("registration", () => {
  it("rotary best registration", () => {
    expect(registration("rotary")).toBeGreaterThan(registration("flatbed"));
  });
});

describe("spCost", () => {
  it("inline industrial most expensive", () => {
    expect(spCost("inline_industrial")).toBeGreaterThan(spCost("flatbed"));
  });
});

describe("multiColor", () => {
  it("carousel textile is multi color", () => {
    expect(multiColor("carousel_textile")).toBe(true);
  });
  it("flatbed not multi color", () => {
    expect(multiColor("flatbed")).toBe(false);
  });
});

describe("forTextile", () => {
  it("carousel textile for textile", () => {
    expect(forTextile("carousel_textile")).toBe(true);
  });
  it("rotary not for textile", () => {
    expect(forTextile("rotary")).toBe(false);
  });
});

describe("mesh", () => {
  it("rotary uses nickel rotary screen", () => {
    expect(mesh("rotary")).toBe("nickel_rotary_screen_continuous_web_inline_stations");
  });
});

describe("bestUse", () => {
  it("carousel textile for t-shirt garment", () => {
    expect(bestUse("carousel_textile")).toBe("t_shirt_garment_apparel_spot_color_plastisol_ink");
  });
});

describe("screenPrintingPressTypes", () => {
  it("returns 5 types", () => {
    expect(screenPrintingPressTypes()).toHaveLength(5);
  });
});
