import { describe, it, expect } from "vitest";
import { ReadabilityAnalyzer } from "../readability.js";

describe("ReadabilityAnalyzer", () => {
  const easyText = "The cat sat on the mat. The dog ran fast. It was fun.";
  const hardText =
    "The implementation of sophisticated algorithms necessitates comprehensive understanding of computational complexity and mathematical abstractions.";

  it("calculates flesch-kincaid score", () => {
    const result = ReadabilityAnalyzer.fleschKincaid(easyText);
    expect(result.score).toBeGreaterThan(50);
    expect(result.grade).toBeDefined();
    expect(result.description).toBeDefined();
  });

  it("returns N/A for empty text", () => {
    const result = ReadabilityAnalyzer.fleschKincaid("");
    expect(result.grade).toBe("N/A");
    expect(result.score).toBe(0);
  });

  it("assigns correct grade levels", () => {
    const easy = ReadabilityAnalyzer.fleschKincaid(easyText);
    expect(easy.score).toBeGreaterThan(60);
  });

  it("calculates flesch-kincaid grade level", () => {
    const grade = ReadabilityAnalyzer.fleschKincaidGradeLevel(easyText);
    expect(grade).toBeLessThan(10);
    expect(ReadabilityAnalyzer.fleschKincaidGradeLevel("")).toBe(0);
  });

  it("calculates gunning fog index", () => {
    const fog = ReadabilityAnalyzer.gunningFog(easyText);
    expect(fog).toBeGreaterThan(0);
    expect(ReadabilityAnalyzer.gunningFog("")).toBe(0);
  });

  it("calculates coleman-liau index", () => {
    const cl = ReadabilityAnalyzer.colemanLiau(easyText);
    expect(typeof cl).toBe("number");
    expect(ReadabilityAnalyzer.colemanLiau("")).toBe(0);
  });

  it("calculates automated readability index", () => {
    const ari = ReadabilityAnalyzer.automatedReadability(easyText);
    expect(typeof ari).toBe("number");
    expect(ReadabilityAnalyzer.automatedReadability("")).toBe(0);
  });

  it("generates summary with all metrics", () => {
    const summary = ReadabilityAnalyzer.summary(easyText);
    expect(summary.fleschReading).toBeDefined();
    expect(summary.fleschGradeLevel).toBeDefined();
    expect(summary.gunningFog).toBeDefined();
    expect(summary.colemanLiau).toBeDefined();
    expect(summary.automatedReadability).toBeDefined();
    expect(summary.words).toBeGreaterThan(0);
    expect(summary.sentences).toBeGreaterThan(0);
    expect(summary.syllables).toBeGreaterThan(0);
  });

  it("hard text scores lower on flesch reading ease", () => {
    const easyScore = ReadabilityAnalyzer.fleschKincaid(easyText).score;
    const hardScore = ReadabilityAnalyzer.fleschKincaid(hardText).score;
    expect(easyScore).toBeGreaterThan(hardScore);
  });

  it("hard text has higher grade level", () => {
    const easyGrade = ReadabilityAnalyzer.fleschKincaidGradeLevel(easyText);
    const hardGrade = ReadabilityAnalyzer.fleschKincaidGradeLevel(hardText);
    expect(hardGrade).toBeGreaterThan(easyGrade);
  });
});
