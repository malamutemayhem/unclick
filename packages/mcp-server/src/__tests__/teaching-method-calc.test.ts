import { describe, it, expect } from "vitest";
import {
  studentEngagement, contentCoverage, prepTimeHours,
  retentionRate, scalability, studentLed,
  requiresTechnology, keyPedagogue, bestAgeGroup, teachingMethods,
} from "../teaching-method-calc.js";

describe("studentEngagement", () => {
  it("project based most engaging", () => {
    expect(studentEngagement("project_based")).toBeGreaterThan(
      studentEngagement("lecture")
    );
  });
});

describe("contentCoverage", () => {
  it("lecture covers most content", () => {
    expect(contentCoverage("lecture")).toBeGreaterThan(
      contentCoverage("montessori")
    );
  });
});

describe("prepTimeHours", () => {
  it("flipped classroom most prep", () => {
    expect(prepTimeHours("flipped_classroom")).toBeGreaterThan(
      prepTimeHours("lecture")
    );
  });
});

describe("retentionRate", () => {
  it("project based best retention", () => {
    expect(retentionRate("project_based")).toBeGreaterThan(
      retentionRate("lecture")
    );
  });
});

describe("scalability", () => {
  it("lecture most scalable", () => {
    expect(scalability("lecture")).toBeGreaterThan(
      scalability("montessori")
    );
  });
});

describe("studentLed", () => {
  it("montessori is student led", () => {
    expect(studentLed("montessori")).toBe(true);
  });
  it("lecture is not", () => {
    expect(studentLed("lecture")).toBe(false);
  });
});

describe("requiresTechnology", () => {
  it("flipped classroom requires technology", () => {
    expect(requiresTechnology("flipped_classroom")).toBe(true);
  });
  it("socratic does not", () => {
    expect(requiresTechnology("socratic")).toBe(false);
  });
});

describe("keyPedagogue", () => {
  it("montessori by maria montessori", () => {
    expect(keyPedagogue("montessori")).toBe("maria_montessori");
  });
});

describe("bestAgeGroup", () => {
  it("montessori best for early childhood", () => {
    expect(bestAgeGroup("montessori")).toBe("early_childhood");
  });
});

describe("teachingMethods", () => {
  it("returns 5 methods", () => {
    expect(teachingMethods()).toHaveLength(5);
  });
});
