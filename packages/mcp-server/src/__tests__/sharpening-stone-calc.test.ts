import { describe, it, expect } from "vitest";
import {
  gritRange, cutSpeed, edgeFinish, durability,
  stoneCost, needsFlat, usesLiquid, abrasive,
  bestUse, sharpeningStones,
} from "../sharpening-stone-calc.js";

describe("gritRange", () => {
  it("water stone japanese widest grit range", () => {
    expect(gritRange("water_stone_japanese")).toBeGreaterThan(gritRange("strop_leather_compound"));
  });
});

describe("cutSpeed", () => {
  it("diamond plate metal fastest cut", () => {
    expect(cutSpeed("diamond_plate_metal")).toBeGreaterThan(cutSpeed("strop_leather_compound"));
  });
});

describe("edgeFinish", () => {
  it("strop leather compound best edge finish", () => {
    expect(edgeFinish("strop_leather_compound")).toBeGreaterThan(edgeFinish("diamond_plate_metal"));
  });
});

describe("durability", () => {
  it("diamond plate metal most durable", () => {
    expect(durability("diamond_plate_metal")).toBeGreaterThan(durability("water_stone_japanese"));
  });
});

describe("stoneCost", () => {
  it("diamond plate metal most expensive", () => {
    expect(stoneCost("diamond_plate_metal")).toBeGreaterThan(stoneCost("strop_leather_compound"));
  });
});

describe("needsFlat", () => {
  it("water stone japanese needs flattening", () => {
    expect(needsFlat("water_stone_japanese")).toBe(true);
  });
  it("diamond plate metal no flattening", () => {
    expect(needsFlat("diamond_plate_metal")).toBe(false);
  });
});

describe("usesLiquid", () => {
  it("oil stone arkansas uses liquid", () => {
    expect(usesLiquid("oil_stone_arkansas")).toBe(true);
  });
  it("diamond plate metal no liquid", () => {
    expect(usesLiquid("diamond_plate_metal")).toBe(false);
  });
});

describe("abrasive", () => {
  it("water stone japanese uses aluminum oxide bond", () => {
    expect(abrasive("water_stone_japanese")).toBe("aluminum_oxide_bond");
  });
});

describe("bestUse", () => {
  it("strop leather compound best for final polish hone", () => {
    expect(bestUse("strop_leather_compound")).toBe("final_polish_hone");
  });
});

describe("sharpeningStones", () => {
  it("returns 5 types", () => {
    expect(sharpeningStones()).toHaveLength(5);
  });
});
