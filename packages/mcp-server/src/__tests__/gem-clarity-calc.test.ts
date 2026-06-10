import { describe, it, expect } from "vitest";
import {
  transparencyScore, priceMultiplier, rarityScore,
  magnificationNeeded, durabilityImpact, eyeClean,
  investmentGrade, giaGradeRange, inclusionType, gemClarities,
} from "../gem-clarity-calc.js";

describe("transparencyScore", () => {
  it("flawless most transparent", () => {
    expect(transparencyScore("flawless")).toBeGreaterThan(
      transparencyScore("included")
    );
  });
});

describe("priceMultiplier", () => {
  it("flawless highest price", () => {
    expect(priceMultiplier("flawless")).toBeGreaterThan(
      priceMultiplier("si")
    );
  });
});

describe("rarityScore", () => {
  it("flawless rarest", () => {
    expect(rarityScore("flawless")).toBeGreaterThan(
      rarityScore("included")
    );
  });
});

describe("magnificationNeeded", () => {
  it("flawless needs 10x magnification", () => {
    expect(magnificationNeeded("flawless")).toBe(10);
  });
  it("included visible to naked eye", () => {
    expect(magnificationNeeded("included")).toBe(1);
  });
});

describe("durabilityImpact", () => {
  it("flawless most durable", () => {
    expect(durabilityImpact("flawless")).toBeGreaterThan(
      durabilityImpact("included")
    );
  });
});

describe("eyeClean", () => {
  it("vs is eye clean", () => {
    expect(eyeClean("vs")).toBe(true);
  });
  it("included is not", () => {
    expect(eyeClean("included")).toBe(false);
  });
});

describe("investmentGrade", () => {
  it("flawless is investment grade", () => {
    expect(investmentGrade("flawless")).toBe(true);
  });
  it("si is not", () => {
    expect(investmentGrade("si")).toBe(false);
  });
});

describe("giaGradeRange", () => {
  it("flawless is fl if", () => {
    expect(giaGradeRange("flawless")).toBe("fl_if");
  });
});

describe("inclusionType", () => {
  it("flawless has no inclusions", () => {
    expect(inclusionType("flawless")).toBe("none");
  });
});

describe("gemClarities", () => {
  it("returns 5 clarities", () => {
    expect(gemClarities()).toHaveLength(5);
  });
});
