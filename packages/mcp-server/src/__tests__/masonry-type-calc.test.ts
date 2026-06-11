import { describe, it, expect } from "vitest";
import {
  compressive, thermal, fireResist, acoustic,
  msCost, loadBearing, forExterior, bond,
  bestUse, masonryTypes,
} from "../masonry-type-calc.js";

describe("compressive", () => {
  it("stone highest compressive", () => {
    expect(compressive("stone_natural_ashlar")).toBeGreaterThan(compressive("aac_autoclaved_aerated"));
  });
});

describe("thermal", () => {
  it("aac best thermal", () => {
    expect(thermal("aac_autoclaved_aerated")).toBeGreaterThan(thermal("concrete_block_cmu"));
  });
});

describe("fireResist", () => {
  it("aac best fire resistance", () => {
    expect(fireResist("aac_autoclaved_aerated")).toBeGreaterThan(fireResist("glass_block_translucent"));
  });
});

describe("acoustic", () => {
  it("stone best acoustic", () => {
    expect(acoustic("stone_natural_ashlar")).toBeGreaterThan(acoustic("glass_block_translucent"));
  });
});

describe("msCost", () => {
  it("stone most expensive", () => {
    expect(msCost("stone_natural_ashlar")).toBeGreaterThan(msCost("concrete_block_cmu"));
  });
});

describe("loadBearing", () => {
  it("clay brick is load bearing", () => {
    expect(loadBearing("clay_brick_fired")).toBe(true);
  });
  it("aac not load bearing", () => {
    expect(loadBearing("aac_autoclaved_aerated")).toBe(false);
  });
});

describe("forExterior", () => {
  it("clay brick for exterior", () => {
    expect(forExterior("clay_brick_fired")).toBe(true);
  });
  it("glass block not for exterior", () => {
    expect(forExterior("glass_block_translucent")).toBe(false);
  });
});

describe("bond", () => {
  it("aac uses thin bed mortar adhesive", () => {
    expect(bond("aac_autoclaved_aerated")).toBe("thin_bed_mortar_adhesive");
  });
});

describe("bestUse", () => {
  it("stone best for monumental heritage facade", () => {
    expect(bestUse("stone_natural_ashlar")).toBe("monumental_heritage_facade");
  });
});

describe("masonryTypes", () => {
  it("returns 5 types", () => {
    expect(masonryTypes()).toHaveLength(5);
  });
});
