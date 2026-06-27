import { describe, it, expect } from "vitest";
import {
  protection, shuffleFeel, durability, artVisibility,
  sleeveCost, doubleSleeveInner, antiGlare, material,
  bestCard, cardSleeves,
} from "../card-sleeve-calc.js";

describe("protection", () => {
  it("art printed best protection", () => {
    expect(protection("art_printed")).toBeGreaterThan(protection("penny_thin"));
  });
});

describe("shuffleFeel", () => {
  it("matte shuffle best shuffle feel", () => {
    expect(shuffleFeel("matte_shuffle")).toBeGreaterThan(shuffleFeel("penny_thin"));
  });
});

describe("durability", () => {
  it("matte shuffle most durable", () => {
    expect(durability("matte_shuffle")).toBeGreaterThan(durability("penny_thin"));
  });
});

describe("artVisibility", () => {
  it("standard clear best art visibility", () => {
    expect(artVisibility("standard_clear")).toBeGreaterThan(artVisibility("art_printed"));
  });
});

describe("sleeveCost", () => {
  it("art printed most expensive", () => {
    expect(sleeveCost("art_printed")).toBeGreaterThan(sleeveCost("penny_thin"));
  });
});

describe("doubleSleeveInner", () => {
  it("inner perfect fit is double sleeve inner", () => {
    expect(doubleSleeveInner("inner_perfect_fit")).toBe(true);
  });
  it("standard clear is not", () => {
    expect(doubleSleeveInner("standard_clear")).toBe(false);
  });
});

describe("antiGlare", () => {
  it("matte shuffle is anti glare", () => {
    expect(antiGlare("matte_shuffle")).toBe(true);
  });
  it("standard clear is not", () => {
    expect(antiGlare("standard_clear")).toBe(false);
  });
});

describe("material", () => {
  it("inner perfect fit uses snug fit thin film", () => {
    expect(material("inner_perfect_fit")).toBe("snug_fit_thin_film");
  });
});

describe("bestCard", () => {
  it("matte shuffle for tournament competitive play", () => {
    expect(bestCard("matte_shuffle")).toBe("tournament_competitive_play");
  });
});

describe("cardSleeves", () => {
  it("returns 5 types", () => {
    expect(cardSleeves()).toHaveLength(5);
  });
});
