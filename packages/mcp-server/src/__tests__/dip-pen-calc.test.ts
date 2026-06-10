import { describe, it, expect } from "vitest";
import {
  lineVariation, inkCapacity, controlFeel, durability,
  penCost, needsOblique, flexNib, nibType,
  bestScript, dipPens,
} from "../dip-pen-calc.js";

describe("lineVariation", () => {
  it("pointed flex nib most line variation", () => {
    expect(lineVariation("pointed_flex_nib")).toBeGreaterThan(lineVariation("crow_quill_fine"));
  });
});

describe("inkCapacity", () => {
  it("broad edge italic most ink capacity", () => {
    expect(inkCapacity("broad_edge_italic")).toBeGreaterThan(inkCapacity("crow_quill_fine"));
  });
});

describe("controlFeel", () => {
  it("crow quill fine best control feel", () => {
    expect(controlFeel("crow_quill_fine")).toBeGreaterThan(controlFeel("broad_edge_italic"));
  });
});

describe("durability", () => {
  it("broad edge italic most durable", () => {
    expect(durability("broad_edge_italic")).toBeGreaterThan(durability("crow_quill_fine"));
  });
});

describe("penCost", () => {
  it("copperplate oblique more expensive than pointed flex", () => {
    expect(penCost("copperplate_oblique")).toBeGreaterThan(penCost("pointed_flex_nib"));
  });
});

describe("needsOblique", () => {
  it("copperplate oblique needs oblique", () => {
    expect(needsOblique("copperplate_oblique")).toBe(true);
  });
  it("pointed flex nib needs no oblique", () => {
    expect(needsOblique("pointed_flex_nib")).toBe(false);
  });
});

describe("flexNib", () => {
  it("pointed flex nib has flex nib", () => {
    expect(flexNib("pointed_flex_nib")).toBe(true);
  });
  it("broad edge italic has no flex nib", () => {
    expect(flexNib("broad_edge_italic")).toBe(false);
  });
});

describe("nibType", () => {
  it("manga g nib uses sturdy flex round", () => {
    expect(nibType("manga_g_nib")).toBe("sturdy_flex_round");
  });
});

describe("bestScript", () => {
  it("broad edge italic best for italic uncial hand", () => {
    expect(bestScript("broad_edge_italic")).toBe("italic_uncial_hand");
  });
});

describe("dipPens", () => {
  it("returns 5 types", () => {
    expect(dipPens()).toHaveLength(5);
  });
});
