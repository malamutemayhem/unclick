import { describe, it, expect } from "vitest";
import {
  paperWeight, toothTexture, pageCount, layFlat,
  bookCost, acidFree, perforated, paperFinish,
  bestMedium, sketchbooks,
} from "../sketchbook-calc.js";

describe("paperWeight", () => {
  it("watercolor heavy heaviest paper", () => {
    expect(paperWeight("watercolor_heavy")).toBeGreaterThan(paperWeight("spiral_bound"));
  });
});

describe("toothTexture", () => {
  it("watercolor heavy most tooth texture", () => {
    expect(toothTexture("watercolor_heavy")).toBeGreaterThan(toothTexture("spiral_bound"));
  });
});

describe("pageCount", () => {
  it("spiral bound most pages", () => {
    expect(pageCount("spiral_bound")).toBeGreaterThan(pageCount("watercolor_heavy"));
  });
});

describe("layFlat", () => {
  it("spiral bound lays flattest", () => {
    expect(layFlat("spiral_bound")).toBeGreaterThan(layFlat("hardbound_journal"));
  });
});

describe("bookCost", () => {
  it("watercolor heavy most expensive", () => {
    expect(bookCost("watercolor_heavy")).toBeGreaterThan(bookCost("spiral_bound"));
  });
});

describe("acidFree", () => {
  it("hardbound journal is acid free", () => {
    expect(acidFree("hardbound_journal")).toBe(true);
  });
  it("spiral bound is not", () => {
    expect(acidFree("spiral_bound")).toBe(false);
  });
});

describe("perforated", () => {
  it("spiral bound is perforated", () => {
    expect(perforated("spiral_bound")).toBe(true);
  });
  it("hardbound journal is not", () => {
    expect(perforated("hardbound_journal")).toBe(false);
  });
});

describe("paperFinish", () => {
  it("watercolor heavy uses cold press cotton rag", () => {
    expect(paperFinish("watercolor_heavy")).toBe("cold_press_cotton_rag");
  });
});

describe("bestMedium", () => {
  it("toned tan for charcoal white highlight", () => {
    expect(bestMedium("toned_tan")).toBe("charcoal_white_highlight");
  });
});

describe("sketchbooks", () => {
  it("returns 5 types", () => {
    expect(sketchbooks()).toHaveLength(5);
  });
});
