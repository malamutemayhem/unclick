import { describe, it, expect } from "vitest";
import {
  heightMeters, terraceCount, baseLengthMeters,
  brickCount, astronomicalAlignment, mudbrickConstruction,
  glazedBrickFacade, dedicatedDeity, preservationState, zigguratTypes,
} from "../ziggurat-type-calc.js";

describe("heightMeters", () => {
  it("neo babylonian is tallest", () => {
    expect(heightMeters("neo_babylonian")).toBeGreaterThan(
      heightMeters("sumerian")
    );
  });
});

describe("terraceCount", () => {
  it("babylonian has 7 terraces", () => {
    expect(terraceCount("babylonian")).toBe(7);
  });
});

describe("baseLengthMeters", () => {
  it("elamite has longest base", () => {
    expect(baseLengthMeters("elamite")).toBeGreaterThan(
      baseLengthMeters("sumerian")
    );
  });
});

describe("brickCount", () => {
  it("neo babylonian uses most bricks", () => {
    expect(brickCount("neo_babylonian")).toBeGreaterThan(
      brickCount("sumerian")
    );
  });
});

describe("astronomicalAlignment", () => {
  it("neo babylonian has best alignment", () => {
    expect(astronomicalAlignment("neo_babylonian")).toBeGreaterThan(
      astronomicalAlignment("elamite")
    );
  });
});

describe("mudbrickConstruction", () => {
  it("sumerian uses mudbrick", () => {
    expect(mudbrickConstruction("sumerian")).toBe(true);
  });
  it("elamite does not", () => {
    expect(mudbrickConstruction("elamite")).toBe(false);
  });
});

describe("glazedBrickFacade", () => {
  it("babylonian has glazed facade", () => {
    expect(glazedBrickFacade("babylonian")).toBe(true);
  });
  it("sumerian does not", () => {
    expect(glazedBrickFacade("sumerian")).toBe(false);
  });
});

describe("dedicatedDeity", () => {
  it("babylonian dedicated to marduk", () => {
    expect(dedicatedDeity("babylonian")).toBe("marduk");
  });
});

describe("preservationState", () => {
  it("elamite best preserved", () => {
    expect(preservationState("elamite")).toBeGreaterThan(
      preservationState("neo_babylonian")
    );
  });
});

describe("zigguratTypes", () => {
  it("returns 5 types", () => {
    expect(zigguratTypes()).toHaveLength(5);
  });
});
