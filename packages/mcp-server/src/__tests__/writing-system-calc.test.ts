import { describe, it, expect } from "vitest";
import {
  characterCount, learningDifficulty, writingSpeed,
  informationDensity, ageYears, stillInUse,
  pictographic, exampleLanguage, digitalAdaptation, writingSystems,
} from "../writing-system-calc.js";

describe("characterCount", () => {
  it("logographic has most characters", () => {
    expect(characterCount("logographic")).toBeGreaterThan(
      characterCount("alphabetic")
    );
  });
});

describe("learningDifficulty", () => {
  it("logographic is hardest to learn", () => {
    expect(learningDifficulty("logographic")).toBeGreaterThan(
      learningDifficulty("alphabetic")
    );
  });
});

describe("writingSpeed", () => {
  it("alphabetic is fastest to write", () => {
    expect(writingSpeed("alphabetic")).toBeGreaterThan(
      writingSpeed("hieroglyphic")
    );
  });
});

describe("informationDensity", () => {
  it("logographic is densest", () => {
    expect(informationDensity("logographic")).toBeGreaterThan(
      informationDensity("alphabetic")
    );
  });
});

describe("ageYears", () => {
  it("cuneiform is oldest", () => {
    expect(ageYears("cuneiform")).toBeGreaterThan(
      ageYears("alphabetic")
    );
  });
});

describe("stillInUse", () => {
  it("alphabetic is still in use", () => {
    expect(stillInUse("alphabetic")).toBe(true);
  });
  it("cuneiform is not", () => {
    expect(stillInUse("cuneiform")).toBe(false);
  });
});

describe("pictographic", () => {
  it("hieroglyphic is pictographic", () => {
    expect(pictographic("hieroglyphic")).toBe(true);
  });
  it("alphabetic is not", () => {
    expect(pictographic("alphabetic")).toBe(false);
  });
});

describe("exampleLanguage", () => {
  it("cuneiform for sumerian", () => {
    expect(exampleLanguage("cuneiform")).toBe("sumerian");
  });
});

describe("digitalAdaptation", () => {
  it("alphabetic adapted best digitally", () => {
    expect(digitalAdaptation("alphabetic")).toBeGreaterThan(
      digitalAdaptation("cuneiform")
    );
  });
});

describe("writingSystems", () => {
  it("returns 5 types", () => {
    expect(writingSystems()).toHaveLength(5);
  });
});
