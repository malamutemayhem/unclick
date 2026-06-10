import { describe, it, expect } from "vitest";
import {
  paperWeight, toothTexture, pageCount, portability,
  padCost, acidFree, perforatedSheets, paperFinish,
  bestMedium, sketchPads,
} from "../sketch-pad-calc.js";

describe("paperWeight", () => {
  it("mixed media heavy heaviest paper", () => {
    expect(paperWeight("mixed_media_heavy")).toBeGreaterThan(paperWeight("newsprint_practice_bulk"));
  });
});

describe("toothTexture", () => {
  it("mixed media heavy most tooth", () => {
    expect(toothTexture("mixed_media_heavy")).toBeGreaterThan(toothTexture("hardcover_journal_art"));
  });
});

describe("pageCount", () => {
  it("newsprint practice bulk most pages", () => {
    expect(pageCount("newsprint_practice_bulk")).toBeGreaterThan(pageCount("mixed_media_heavy"));
  });
});

describe("portability", () => {
  it("hardcover journal art most portable", () => {
    expect(portability("hardcover_journal_art")).toBeGreaterThan(portability("newsprint_practice_bulk"));
  });
});

describe("padCost", () => {
  it("mixed media heavy most expensive", () => {
    expect(padCost("mixed_media_heavy")).toBeGreaterThan(padCost("newsprint_practice_bulk"));
  });
});

describe("acidFree", () => {
  it("spiral bound drawing is acid free", () => {
    expect(acidFree("spiral_bound_drawing")).toBe(true);
  });
  it("newsprint practice bulk is not", () => {
    expect(acidFree("newsprint_practice_bulk")).toBe(false);
  });
});

describe("perforatedSheets", () => {
  it("spiral bound drawing has perforated sheets", () => {
    expect(perforatedSheets("spiral_bound_drawing")).toBe(true);
  });
  it("hardcover journal art does not", () => {
    expect(perforatedSheets("hardcover_journal_art")).toBe(false);
  });
});

describe("paperFinish", () => {
  it("toned tan gray uses tinted smooth surface", () => {
    expect(paperFinish("toned_tan_gray")).toBe("tinted_smooth_surface");
  });
});

describe("bestMedium", () => {
  it("newsprint practice bulk best for charcoal gesture warmup", () => {
    expect(bestMedium("newsprint_practice_bulk")).toBe("charcoal_gesture_warmup");
  });
});

describe("sketchPads", () => {
  it("returns 5 types", () => {
    expect(sketchPads()).toHaveLength(5);
  });
});
