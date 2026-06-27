import { describe, it, expect } from "vitest";
import {
  rarityScore, valuePremium, detectability, frequencyOfOccurrence,
  authenticityChallenge, affectsDesign, mintProcessError,
  errorStage, famousExample, coinErrors,
} from "../coin-error-calc.js";

describe("rarityScore", () => {
  it("wrong planchet rarest", () => {
    expect(rarityScore("wrong_planchet")).toBeGreaterThan(rarityScore("clipped_planchet"));
  });
});

describe("valuePremium", () => {
  it("wrong planchet highest premium", () => {
    expect(valuePremium("wrong_planchet")).toBeGreaterThan(valuePremium("off_center"));
  });
});

describe("detectability", () => {
  it("off center most detectable", () => {
    expect(detectability("off_center")).toBeGreaterThan(detectability("wrong_planchet"));
  });
});

describe("frequencyOfOccurrence", () => {
  it("off center most frequent", () => {
    expect(frequencyOfOccurrence("off_center")).toBeGreaterThan(
      frequencyOfOccurrence("wrong_planchet")
    );
  });
});

describe("authenticityChallenge", () => {
  it("wrong planchet hardest to authenticate", () => {
    expect(authenticityChallenge("wrong_planchet")).toBeGreaterThan(
      authenticityChallenge("off_center")
    );
  });
});

describe("affectsDesign", () => {
  it("double die affects design", () => {
    expect(affectsDesign("double_die")).toBe(true);
  });
  it("wrong planchet does not affect design", () => {
    expect(affectsDesign("wrong_planchet")).toBe(false);
  });
});

describe("mintProcessError", () => {
  it("all are mint process errors", () => {
    for (const e of coinErrors()) {
      expect(mintProcessError(e)).toBe(true);
    }
  });
});

describe("errorStage", () => {
  it("double die at die preparation", () => {
    expect(errorStage("double_die")).toBe("die_preparation");
  });
});

describe("famousExample", () => {
  it("double die famous example is 1955 lincoln", () => {
    expect(famousExample("double_die")).toBe("1955_lincoln_cent");
  });
});

describe("coinErrors", () => {
  it("returns 5 errors", () => {
    expect(coinErrors()).toHaveLength(5);
  });
});
