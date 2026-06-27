import { describe, it, expect } from "vitest";
import {
  paintSpread, textureCreation, mixingAbility, detailControl,
  knifeCost, flexibleBlade, offsetHandle, bladeMaterial,
  bestUse, paletteKnives,
} from "../palette-knife-calc.js";

describe("paintSpread", () => {
  it("trowel wide best spread", () => {
    expect(paintSpread("trowel_wide")).toBeGreaterThan(paintSpread("diamond_point"));
  });
});

describe("textureCreation", () => {
  it("diamond point best texture", () => {
    expect(textureCreation("diamond_point")).toBeGreaterThan(textureCreation("straight_mixing"));
  });
});

describe("mixingAbility", () => {
  it("straight mixing best mixing", () => {
    expect(mixingAbility("straight_mixing")).toBeGreaterThan(mixingAbility("diamond_point"));
  });
});

describe("detailControl", () => {
  it("diamond point best detail", () => {
    expect(detailControl("diamond_point")).toBeGreaterThan(detailControl("trowel_wide"));
  });
});

describe("knifeCost", () => {
  it("diamond point most expensive", () => {
    expect(knifeCost("diamond_point")).toBeGreaterThan(knifeCost("straight_mixing"));
  });
});

describe("flexibleBlade", () => {
  it("offset painting is flexible", () => {
    expect(flexibleBlade("offset_painting")).toBe(true);
  });
  it("trowel wide is not", () => {
    expect(flexibleBlade("trowel_wide")).toBe(false);
  });
});

describe("offsetHandle", () => {
  it("offset painting has offset handle", () => {
    expect(offsetHandle("offset_painting")).toBe(true);
  });
  it("straight mixing does not", () => {
    expect(offsetHandle("straight_mixing")).toBe(false);
  });
});

describe("bladeMaterial", () => {
  it("diamond point uses tempered steel tapered point", () => {
    expect(bladeMaterial("diamond_point")).toBe("tempered_steel_tapered_point");
  });
});

describe("bestUse", () => {
  it("offset painting for impasto thick paint apply", () => {
    expect(bestUse("offset_painting")).toBe("impasto_thick_paint_apply");
  });
});

describe("paletteKnives", () => {
  it("returns 5 types", () => {
    expect(paletteKnives()).toHaveLength(5);
  });
});
