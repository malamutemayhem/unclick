import { describe, it, expect } from "vitest";
import {
  frequencyInDebate, detectionDifficulty, persuasivePower,
  harmToDiscourse, educationalValue, attacksPerson,
  formalFallacy, category, latinName, logicalFallacies,
} from "../logical-fallacy-calc.js";

describe("frequencyInDebate", () => {
  it("ad hominem most frequent", () => {
    expect(frequencyInDebate("ad_hominem")).toBeGreaterThan(
      frequencyInDebate("appeal_to_authority")
    );
  });
});

describe("detectionDifficulty", () => {
  it("appeal to authority hardest to detect", () => {
    expect(detectionDifficulty("appeal_to_authority")).toBeGreaterThan(
      detectionDifficulty("ad_hominem")
    );
  });
});

describe("persuasivePower", () => {
  it("false dilemma most persuasive", () => {
    expect(persuasivePower("false_dilemma")).toBeGreaterThan(
      persuasivePower("ad_hominem")
    );
  });
});

describe("harmToDiscourse", () => {
  it("ad hominem most harmful", () => {
    expect(harmToDiscourse("ad_hominem")).toBeGreaterThan(
      harmToDiscourse("appeal_to_authority")
    );
  });
});

describe("educationalValue", () => {
  it("straw man highest educational value", () => {
    expect(educationalValue("straw_man")).toBeGreaterThan(
      educationalValue("slippery_slope")
    );
  });
});

describe("attacksPerson", () => {
  it("ad hominem attacks person", () => {
    expect(attacksPerson("ad_hominem")).toBe(true);
  });
  it("straw man does not", () => {
    expect(attacksPerson("straw_man")).toBe(false);
  });
});

describe("formalFallacy", () => {
  it("false dilemma is formal", () => {
    expect(formalFallacy("false_dilemma")).toBe(true);
  });
  it("ad hominem is not", () => {
    expect(formalFallacy("ad_hominem")).toBe(false);
  });
});

describe("category", () => {
  it("straw man is misrepresentation", () => {
    expect(category("straw_man")).toBe("misrepresentation");
  });
});

describe("latinName", () => {
  it("ad hominem latin name", () => {
    expect(latinName("ad_hominem")).toBe("argumentum_ad_hominem");
  });
});

describe("logicalFallacies", () => {
  it("returns 5 fallacies", () => {
    expect(logicalFallacies()).toHaveLength(5);
  });
});
