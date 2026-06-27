import { describe, it, expect } from "vitest";
import {
  frequencyInEnglish, formantF1Hz, formantF2Hz,
  mouthOpening, crossLinguisticFrequency, rounded,
  tongueAdvanced, ipaExample, tonguePart, vowelTypes,
} from "../vowel-type-calc.js";

describe("frequencyInEnglish", () => {
  it("mid_central most frequent (schwa)", () => {
    expect(frequencyInEnglish("mid_central")).toBeGreaterThan(
      frequencyInEnglish("open_back")
    );
  });
});

describe("formantF1Hz", () => {
  it("open_front highest F1", () => {
    expect(formantF1Hz("open_front")).toBeGreaterThan(
      formantF1Hz("close_front")
    );
  });
});

describe("formantF2Hz", () => {
  it("close_front highest F2", () => {
    expect(formantF2Hz("close_front")).toBeGreaterThan(
      formantF2Hz("close_back")
    );
  });
});

describe("mouthOpening", () => {
  it("open_front widest opening", () => {
    expect(mouthOpening("open_front")).toBeGreaterThan(
      mouthOpening("close_front")
    );
  });
});

describe("crossLinguisticFrequency", () => {
  it("close_front universal across languages", () => {
    expect(crossLinguisticFrequency("close_front")).toBeGreaterThan(
      crossLinguisticFrequency("mid_central")
    );
  });
});

describe("rounded", () => {
  it("close_back is rounded", () => {
    expect(rounded("close_back")).toBe(true);
  });
  it("close_front is not", () => {
    expect(rounded("close_front")).toBe(false);
  });
});

describe("tongueAdvanced", () => {
  it("close_front is tongue advanced", () => {
    expect(tongueAdvanced("close_front")).toBe(true);
  });
  it("close_back is not", () => {
    expect(tongueAdvanced("close_back")).toBe(false);
  });
});

describe("ipaExample", () => {
  it("mid_central is schwa", () => {
    expect(ipaExample("mid_central")).toBe("schwa_as_in_about");
  });
});

describe("tonguePart", () => {
  it("close_front blade raised", () => {
    expect(tonguePart("close_front")).toBe("blade_raised");
  });
});

describe("vowelTypes", () => {
  it("returns 5 types", () => {
    expect(vowelTypes()).toHaveLength(5);
  });
});
