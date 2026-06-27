import { describe, it, expect } from "vitest";
import {
  pinHold, patternClarity, durability, prickEase,
  cardCost, reusable, forFine, cardWeight,
  bestUse, prickingCards,
} from "../pricking-card-calc.js";

describe("pinHold", () => {
  it("glazed card smooth best pin hold", () => {
    expect(pinHold("glazed_card_smooth")).toBeGreaterThan(pinHold("parchment_paper_fine"));
  });
});

describe("patternClarity", () => {
  it("parchment paper fine best pattern clarity", () => {
    expect(patternClarity("parchment_paper_fine")).toBeGreaterThan(patternClarity("foam_board_thick"));
  });
});

describe("durability", () => {
  it("plastic sheet reuse most durable", () => {
    expect(durability("plastic_sheet_reuse")).toBeGreaterThan(durability("parchment_paper_fine"));
  });
});

describe("prickEase", () => {
  it("foam board thick easiest to prick", () => {
    expect(prickEase("foam_board_thick")).toBeGreaterThan(prickEase("plastic_sheet_reuse"));
  });
});

describe("cardCost", () => {
  it("plastic sheet reuse most expensive", () => {
    expect(cardCost("plastic_sheet_reuse")).toBeGreaterThan(cardCost("manilla_card_standard"));
  });
});

describe("reusable", () => {
  it("manilla card standard is reusable", () => {
    expect(reusable("manilla_card_standard")).toBe(true);
  });
  it("parchment paper fine not reusable", () => {
    expect(reusable("parchment_paper_fine")).toBe(false);
  });
});

describe("forFine", () => {
  it("glazed card smooth is for fine", () => {
    expect(forFine("glazed_card_smooth")).toBe(true);
  });
  it("manilla card standard not for fine", () => {
    expect(forFine("manilla_card_standard")).toBe(false);
  });
});

describe("cardWeight", () => {
  it("foam board thick uses thick 5mm foam", () => {
    expect(cardWeight("foam_board_thick")).toBe("thick_5mm_foam");
  });
});

describe("bestUse", () => {
  it("plastic sheet reuse best for repeat production lace", () => {
    expect(bestUse("plastic_sheet_reuse")).toBe("repeat_production_lace");
  });
});

describe("prickingCards", () => {
  it("returns 5 types", () => {
    expect(prickingCards()).toHaveLength(5);
  });
});
