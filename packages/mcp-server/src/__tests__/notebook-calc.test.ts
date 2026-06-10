import { describe, it, expect } from "vitest";
import {
  paperQuality, inkBleedThrough, flexibility, ruggedness,
  bookCost, layFlat, numberedPages, pageStyle,
  bestUse, notebooks,
} from "../notebook-calc.js";

describe("paperQuality", () => {
  it("dot grid bullet best paper quality", () => {
    expect(paperQuality("dot_grid_bullet")).toBeGreaterThan(paperQuality("lined_college"));
  });
});

describe("inkBleedThrough", () => {
  it("lined college most bleed through", () => {
    expect(inkBleedThrough("lined_college")).toBeGreaterThan(inkBleedThrough("waterproof_field"));
  });
});

describe("flexibility", () => {
  it("blank sketch most flexible", () => {
    expect(flexibility("blank_sketch")).toBeGreaterThan(flexibility("lined_college"));
  });
});

describe("ruggedness", () => {
  it("waterproof field most rugged", () => {
    expect(ruggedness("waterproof_field")).toBeGreaterThan(ruggedness("lined_college"));
  });
});

describe("bookCost", () => {
  it("waterproof field most expensive", () => {
    expect(bookCost("waterproof_field")).toBeGreaterThan(bookCost("lined_college"));
  });
});

describe("layFlat", () => {
  it("dot grid bullet lays flat", () => {
    expect(layFlat("dot_grid_bullet")).toBe(true);
  });
  it("lined college does not", () => {
    expect(layFlat("lined_college")).toBe(false);
  });
});

describe("numberedPages", () => {
  it("dot grid bullet has numbered pages", () => {
    expect(numberedPages("dot_grid_bullet")).toBe(true);
  });
  it("blank sketch does not", () => {
    expect(numberedPages("blank_sketch")).toBe(false);
  });
});

describe("pageStyle", () => {
  it("graph engineering uses 5mm quad green tint", () => {
    expect(pageStyle("graph_engineering")).toBe("5mm_quad_green_tint");
  });
});

describe("bestUse", () => {
  it("dot grid bullet for bullet journal planner", () => {
    expect(bestUse("dot_grid_bullet")).toBe("bullet_journal_planner");
  });
});

describe("notebooks", () => {
  it("returns 5 types", () => {
    expect(notebooks()).toHaveLength(5);
  });
});
