import { describe, it, expect } from "vitest";
import {
  glossLevel, raiseHeight, detailHold, colorRange,
  powderCost, metallic, sparkle, grainSize,
  bestUse, embossPowders,
} from "../emboss-powder-calc.js";

describe("glossLevel", () => {
  it("clear glossy shine highest gloss", () => {
    expect(glossLevel("clear_glossy_shine")).toBeGreaterThan(glossLevel("white_opaque_matte"));
  });
});

describe("raiseHeight", () => {
  it("white opaque matte highest raise", () => {
    expect(raiseHeight("white_opaque_matte")).toBeGreaterThan(raiseHeight("detail_ultra_fine"));
  });
});

describe("detailHold", () => {
  it("detail ultra fine best detail hold", () => {
    expect(detailHold("detail_ultra_fine")).toBeGreaterThan(detailHold("tinsel_sparkle_glitter"));
  });
});

describe("colorRange", () => {
  it("detail ultra fine widest color range", () => {
    expect(colorRange("detail_ultra_fine")).toBeGreaterThan(colorRange("clear_glossy_shine"));
  });
});

describe("powderCost", () => {
  it("gold metallic lux most expensive", () => {
    expect(powderCost("gold_metallic_lux")).toBeGreaterThan(powderCost("white_opaque_matte"));
  });
});

describe("metallic", () => {
  it("gold metallic lux is metallic", () => {
    expect(metallic("gold_metallic_lux")).toBe(true);
  });
  it("clear glossy shine not metallic", () => {
    expect(metallic("clear_glossy_shine")).toBe(false);
  });
});

describe("sparkle", () => {
  it("tinsel sparkle glitter has sparkle", () => {
    expect(sparkle("tinsel_sparkle_glitter")).toBe(true);
  });
  it("gold metallic lux no sparkle", () => {
    expect(sparkle("gold_metallic_lux")).toBe(false);
  });
});

describe("grainSize", () => {
  it("detail ultra fine uses ultra fine powder", () => {
    expect(grainSize("detail_ultra_fine")).toBe("ultra_fine_powder");
  });
});

describe("bestUse", () => {
  it("gold metallic lux best for elegant card accent", () => {
    expect(bestUse("gold_metallic_lux")).toBe("elegant_card_accent");
  });
});

describe("embossPowders", () => {
  it("returns 5 types", () => {
    expect(embossPowders()).toHaveLength(5);
  });
});
