import { describe, it, expect } from "vitest";
import {
  lineClean, detailFine, controlSteady, textureRange,
  sgrafCost, curved, forBroad, tipProfile,
  bestUse, sgraffitoEnamels,
} from "../sgraffito-enamel-calc.js";

describe("lineClean", () => {
  it("needle scribe fine cleanest line", () => {
    expect(lineClean("needle_scribe_fine")).toBeGreaterThan(lineClean("scratch_brush_broad"));
  });
});

describe("detailFine", () => {
  it("needle scribe fine finest detail", () => {
    expect(detailFine("needle_scribe_fine")).toBeGreaterThan(detailFine("scratch_brush_broad"));
  });
});

describe("controlSteady", () => {
  it("dental pick curve steadiest control", () => {
    expect(controlSteady("dental_pick_curve")).toBeGreaterThan(controlSteady("scratch_brush_broad"));
  });
});

describe("textureRange", () => {
  it("riffler file texture widest texture range", () => {
    expect(textureRange("riffler_file_texture")).toBeGreaterThan(textureRange("needle_scribe_fine"));
  });
});

describe("sgrafCost", () => {
  it("carbide point hard most expensive", () => {
    expect(sgrafCost("carbide_point_hard")).toBeGreaterThan(sgrafCost("dental_pick_curve"));
  });
});

describe("curved", () => {
  it("dental pick curve is curved", () => {
    expect(curved("dental_pick_curve")).toBe(true);
  });
  it("needle scribe fine not curved", () => {
    expect(curved("needle_scribe_fine")).toBe(false);
  });
});

describe("forBroad", () => {
  it("scratch brush broad is for broad", () => {
    expect(forBroad("scratch_brush_broad")).toBe(true);
  });
  it("needle scribe fine not for broad", () => {
    expect(forBroad("needle_scribe_fine")).toBe(false);
  });
});

describe("tipProfile", () => {
  it("riffler file texture uses shaped rasp end", () => {
    expect(tipProfile("riffler_file_texture")).toBe("shaped_rasp_end");
  });
});

describe("bestUse", () => {
  it("needle scribe fine best for fine line scratch", () => {
    expect(bestUse("needle_scribe_fine")).toBe("fine_line_scratch");
  });
});

describe("sgraffitoEnamels", () => {
  it("returns 5 types", () => {
    expect(sgraffitoEnamels()).toHaveLength(5);
  });
});
