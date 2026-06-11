import { describe, it, expect } from "vitest";
import {
  colorVivid, washFast, blendSmooth, controlFine,
  paintCost, steamRequired, forBeginner, fixMethod,
  bestUse, silkPaints,
} from "../silk-paint-calc.js";

describe("colorVivid", () => {
  it("steam fix dye most vivid color", () => {
    expect(colorVivid("steam_fix_dye")).toBeGreaterThan(colorVivid("alcohol_ink_blend"));
  });
});

describe("washFast", () => {
  it("steam fix dye most wash fast", () => {
    expect(washFast("steam_fix_dye")).toBeGreaterThan(washFast("alcohol_ink_blend"));
  });
});

describe("blendSmooth", () => {
  it("alcohol ink blend smoothest blend", () => {
    expect(blendSmooth("alcohol_ink_blend")).toBeGreaterThan(blendSmooth("reactive_dye_wash"));
  });
});

describe("controlFine", () => {
  it("alcohol ink blend finest control", () => {
    expect(controlFine("alcohol_ink_blend")).toBeGreaterThan(controlFine("reactive_dye_wash"));
  });
});

describe("paintCost", () => {
  it("steam fix dye most expensive", () => {
    expect(paintCost("steam_fix_dye")).toBeGreaterThan(paintCost("alcohol_ink_blend"));
  });
});

describe("steamRequired", () => {
  it("steam fix dye requires steam", () => {
    expect(steamRequired("steam_fix_dye")).toBe(true);
  });
  it("iron fix dye no steam required", () => {
    expect(steamRequired("iron_fix_dye")).toBe(false);
  });
});

describe("forBeginner", () => {
  it("iron fix dye is for beginner", () => {
    expect(forBeginner("iron_fix_dye")).toBe(true);
  });
  it("steam fix dye not for beginner", () => {
    expect(forBeginner("steam_fix_dye")).toBe(false);
  });
});

describe("fixMethod", () => {
  it("reactive dye wash uses chemical bond fix", () => {
    expect(fixMethod("reactive_dye_wash")).toBe("chemical_bond_fix");
  });
});

describe("bestUse", () => {
  it("iron fix dye best for home studio silk", () => {
    expect(bestUse("iron_fix_dye")).toBe("home_studio_silk");
  });
});

describe("silkPaints", () => {
  it("returns 5 types", () => {
    expect(silkPaints()).toHaveLength(5);
  });
});
