import { describe, it, expect } from "vitest";
import {
  gradingSpeed, depthOfUnderstanding, objectivity,
  cheatingVulnerability, studentAnxiety, automatable,
  formativeUse, bloomsLevel, feedbackQuality, assessmentTypes,
} from "../assessment-type-calc.js";

describe("gradingSpeed", () => {
  it("multiple choice fastest grading", () => {
    expect(gradingSpeed("multiple_choice")).toBeGreaterThan(
      gradingSpeed("essay")
    );
  });
});

describe("depthOfUnderstanding", () => {
  it("portfolio deepest understanding", () => {
    expect(depthOfUnderstanding("portfolio")).toBeGreaterThan(
      depthOfUnderstanding("multiple_choice")
    );
  });
});

describe("objectivity", () => {
  it("multiple choice most objective", () => {
    expect(objectivity("multiple_choice")).toBeGreaterThan(
      objectivity("portfolio")
    );
  });
});

describe("cheatingVulnerability", () => {
  it("multiple choice most vulnerable", () => {
    expect(cheatingVulnerability("multiple_choice")).toBeGreaterThan(
      cheatingVulnerability("oral_exam")
    );
  });
});

describe("studentAnxiety", () => {
  it("oral exam highest anxiety", () => {
    expect(studentAnxiety("oral_exam")).toBeGreaterThan(
      studentAnxiety("portfolio")
    );
  });
});

describe("automatable", () => {
  it("multiple choice is automatable", () => {
    expect(automatable("multiple_choice")).toBe(true);
  });
  it("essay is not", () => {
    expect(automatable("essay")).toBe(false);
  });
});

describe("formativeUse", () => {
  it("portfolio used formatively", () => {
    expect(formativeUse("portfolio")).toBe(true);
  });
  it("multiple choice is not", () => {
    expect(formativeUse("multiple_choice")).toBe(false);
  });
});

describe("bloomsLevel", () => {
  it("portfolio at create level", () => {
    expect(bloomsLevel("portfolio")).toBe("create");
  });
});

describe("feedbackQuality", () => {
  it("oral exam gives immediate verbal", () => {
    expect(feedbackQuality("oral_exam")).toBe("immediate_verbal");
  });
});

describe("assessmentTypes", () => {
  it("returns 5 types", () => {
    expect(assessmentTypes()).toHaveLength(5);
  });
});
