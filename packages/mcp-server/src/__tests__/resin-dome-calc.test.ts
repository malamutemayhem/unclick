import { describe, it, expect } from "vitest";
import {
  clarityDome, bubbleFree, demoldEase, sizeRange,
  domeCost, flexible, custom, moldShape,
  bestUse, resinDomes,
} from "../resin-dome-calc.js";

describe("clarityDome", () => {
  it("custom silicone form best clarity", () => {
    expect(clarityDome("custom_silicone_form")).toBeGreaterThan(clarityDome("heart_shape_craft"));
  });
});

describe("bubbleFree", () => {
  it("square tile flat most bubble free", () => {
    expect(bubbleFree("square_tile_flat")).toBeGreaterThan(bubbleFree("custom_silicone_form"));
  });
});

describe("demoldEase", () => {
  it("custom silicone form easiest demold", () => {
    expect(demoldEase("custom_silicone_form")).toBeGreaterThan(demoldEase("heart_shape_craft"));
  });
});

describe("sizeRange", () => {
  it("custom silicone form widest size range", () => {
    expect(sizeRange("custom_silicone_form")).toBeGreaterThan(sizeRange("heart_shape_craft"));
  });
});

describe("domeCost", () => {
  it("custom silicone form most expensive", () => {
    expect(domeCost("custom_silicone_form")).toBeGreaterThan(domeCost("heart_shape_craft"));
  });
});

describe("flexible", () => {
  it("heart shape craft is flexible", () => {
    expect(flexible("heart_shape_craft")).toBe(true);
  });
  it("round cabochon standard not flexible", () => {
    expect(flexible("round_cabochon_standard")).toBe(false);
  });
});

describe("custom", () => {
  it("custom silicone form is custom", () => {
    expect(custom("custom_silicone_form")).toBe(true);
  });
  it("round cabochon standard not custom", () => {
    expect(custom("round_cabochon_standard")).toBe(false);
  });
});

describe("moldShape", () => {
  it("oval bezel pendant uses oval bezel tray", () => {
    expect(moldShape("oval_bezel_pendant")).toBe("oval_bezel_tray");
  });
});

describe("bestUse", () => {
  it("round cabochon standard best for jewelry cabochon cast", () => {
    expect(bestUse("round_cabochon_standard")).toBe("jewelry_cabochon_cast");
  });
});

describe("resinDomes", () => {
  it("returns 5 types", () => {
    expect(resinDomes()).toHaveLength(5);
  });
});
