import { describe, it, expect } from "vitest";
import {
  lineClean, holdStrength, removeEase, colorRange,
  resistCost, washable, decorative, resistBase,
  bestUse, guttaResists,
} from "../gutta-resist-calc.js";

describe("lineClean", () => {
  it("solvent gutta strong cleanest line", () => {
    expect(lineClean("solvent_gutta_strong")).toBeGreaterThan(lineClean("wax_resist_batik"));
  });
});

describe("holdStrength", () => {
  it("solvent gutta strong strongest hold", () => {
    expect(holdStrength("solvent_gutta_strong")).toBeGreaterThan(holdStrength("water_gutta_clear"));
  });
});

describe("removeEase", () => {
  it("rubber resist peel easiest remove", () => {
    expect(removeEase("rubber_resist_peel")).toBeGreaterThan(removeEase("solvent_gutta_strong"));
  });
});

describe("colorRange", () => {
  it("metallic gutta gold widest color range", () => {
    expect(colorRange("metallic_gutta_gold")).toBeGreaterThan(colorRange("wax_resist_batik"));
  });
});

describe("resistCost", () => {
  it("metallic gutta gold most expensive", () => {
    expect(resistCost("metallic_gutta_gold")).toBeGreaterThan(resistCost("wax_resist_batik"));
  });
});

describe("washable", () => {
  it("water gutta clear is washable", () => {
    expect(washable("water_gutta_clear")).toBe(true);
  });
  it("solvent gutta strong not washable", () => {
    expect(washable("solvent_gutta_strong")).toBe(false);
  });
});

describe("decorative", () => {
  it("metallic gutta gold is decorative", () => {
    expect(decorative("metallic_gutta_gold")).toBe(true);
  });
  it("water gutta clear not decorative", () => {
    expect(decorative("water_gutta_clear")).toBe(false);
  });
});

describe("resistBase", () => {
  it("wax resist batik uses hot paraffin wax", () => {
    expect(resistBase("wax_resist_batik")).toBe("hot_paraffin_wax");
  });
});

describe("bestUse", () => {
  it("water gutta clear best for general silk outline", () => {
    expect(bestUse("water_gutta_clear")).toBe("general_silk_outline");
  });
});

describe("guttaResists", () => {
  it("returns 5 types", () => {
    expect(guttaResists()).toHaveLength(5);
  });
});
