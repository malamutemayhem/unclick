import { describe, it, expect } from "vitest";
import {
  feltBond, drapeQuality, shrinkControl, textureRange,
  nunoCost, natural, forGarment, weaveType,
  bestUse, nunoFelts,
} from "../nuno-felt-calc.js";

describe("feltBond", () => {
  it("linen scrim open strongest felt bond", () => {
    expect(feltBond("linen_scrim_open")).toBeGreaterThan(feltBond("organza_silk_fine"));
  });
});

describe("drapeQuality", () => {
  it("silk chiffon drape best drape quality", () => {
    expect(drapeQuality("silk_chiffon_drape")).toBeGreaterThan(drapeQuality("linen_scrim_open"));
  });
});

describe("shrinkControl", () => {
  it("linen scrim open best shrink control", () => {
    expect(shrinkControl("linen_scrim_open")).toBeGreaterThan(shrinkControl("silk_chiffon_drape"));
  });
});

describe("textureRange", () => {
  it("organza silk fine widest texture range", () => {
    expect(textureRange("organza_silk_fine")).toBeGreaterThan(textureRange("linen_scrim_open"));
  });
});

describe("nunoCost", () => {
  it("silk chiffon drape most expensive", () => {
    expect(nunoCost("silk_chiffon_drape")).toBeGreaterThan(nunoCost("cotton_muslin_light"));
  });
});

describe("natural", () => {
  it("silk gauze sheer is natural", () => {
    expect(natural("silk_gauze_sheer")).toBe(true);
  });
  it("all nuno felts are natural", () => {
    expect(natural("cotton_muslin_light")).toBe(true);
  });
});

describe("forGarment", () => {
  it("silk chiffon drape is for garment", () => {
    expect(forGarment("silk_chiffon_drape")).toBe(true);
  });
  it("linen scrim open not for garment", () => {
    expect(forGarment("linen_scrim_open")).toBe(false);
  });
});

describe("weaveType", () => {
  it("cotton muslin light uses loose plain weave", () => {
    expect(weaveType("cotton_muslin_light")).toBe("loose_plain_weave");
  });
});

describe("bestUse", () => {
  it("cotton muslin light best for beginner practice felt", () => {
    expect(bestUse("cotton_muslin_light")).toBe("beginner_practice_felt");
  });
});

describe("nunoFelts", () => {
  it("returns 5 types", () => {
    expect(nunoFelts()).toHaveLength(5);
  });
});
