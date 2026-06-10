import { describe, it, expect } from "vitest";
import {
  evaporationSpeed, perceptionDuration, characterImpact,
  molecularWeight, blendingDifficulty, firstImpression,
  fixative, typicalIngredients, developmentTime, scentNotes,
} from "../scent-note-calc.js";

describe("evaporationSpeed", () => {
  it("top notes evaporate fastest", () => {
    expect(evaporationSpeed("top")).toBeGreaterThan(evaporationSpeed("base"));
  });
});

describe("perceptionDuration", () => {
  it("base notes last longest", () => {
    expect(perceptionDuration("base")).toBeGreaterThan(perceptionDuration("top"));
  });
});

describe("characterImpact", () => {
  it("heart notes define character", () => {
    expect(characterImpact("heart")).toBeGreaterThan(characterImpact("top"));
  });
});

describe("molecularWeight", () => {
  it("base notes heaviest molecules", () => {
    expect(molecularWeight("base")).toBeGreaterThan(molecularWeight("top"));
  });
});

describe("blendingDifficulty", () => {
  it("accord hardest to blend", () => {
    expect(blendingDifficulty("accord")).toBeGreaterThan(blendingDifficulty("linear"));
  });
});

describe("firstImpression", () => {
  it("top note is first impression", () => {
    expect(firstImpression("top")).toBe(true);
  });
  it("base note is not", () => {
    expect(firstImpression("base")).toBe(false);
  });
});

describe("fixative", () => {
  it("base note is fixative", () => {
    expect(fixative("base")).toBe(true);
  });
  it("heart note is not", () => {
    expect(fixative("heart")).toBe(false);
  });
});

describe("typicalIngredients", () => {
  it("top notes are citrus herbs", () => {
    expect(typicalIngredients("top")).toBe("citrus_herbs_light_fruits");
  });
});

describe("developmentTime", () => {
  it("base note develops over hours", () => {
    expect(developmentTime("base")).toBe("4_hours_to_24_hours");
  });
});

describe("scentNotes", () => {
  it("returns 5 notes", () => {
    expect(scentNotes()).toHaveLength(5);
  });
});
