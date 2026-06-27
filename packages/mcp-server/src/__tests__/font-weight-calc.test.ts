import { describe, it, expect } from "vitest";
import {
  visualImpact, readabilityBodyText, headingEffectiveness, inkConsumption,
  fileSize, suitableForSmallSizes, commonInBranding, cssNumericValue,
  bestUseCase, fontWeights,
} from "../font-weight-calc.js";

describe("visualImpact", () => {
  it("black highest impact", () => {
    expect(visualImpact("black")).toBeGreaterThan(visualImpact("thin"));
  });
});

describe("readabilityBodyText", () => {
  it("regular most readable for body", () => {
    expect(readabilityBodyText("regular")).toBeGreaterThan(readabilityBodyText("black"));
  });
});

describe("headingEffectiveness", () => {
  it("black best for headings", () => {
    expect(headingEffectiveness("black")).toBeGreaterThan(headingEffectiveness("thin"));
  });
});

describe("inkConsumption", () => {
  it("black uses most ink", () => {
    expect(inkConsumption("black")).toBeGreaterThan(inkConsumption("thin"));
  });
});

describe("fileSize", () => {
  it("black larger file", () => {
    expect(fileSize("black")).toBeGreaterThan(fileSize("thin"));
  });
});

describe("suitableForSmallSizes", () => {
  it("regular suitable for small sizes", () => {
    expect(suitableForSmallSizes("regular")).toBe(true);
  });
  it("thin not suitable", () => {
    expect(suitableForSmallSizes("thin")).toBe(false);
  });
});

describe("commonInBranding", () => {
  it("bold common in branding", () => {
    expect(commonInBranding("bold")).toBe(true);
  });
  it("regular not common", () => {
    expect(commonInBranding("regular")).toBe(false);
  });
});

describe("cssNumericValue", () => {
  it("bold is 700", () => {
    expect(cssNumericValue("bold")).toBe("700");
  });
});

describe("bestUseCase", () => {
  it("regular for body primary", () => {
    expect(bestUseCase("regular")).toBe("body_primary");
  });
});

describe("fontWeights", () => {
  it("returns 5 weights", () => {
    expect(fontWeights()).toHaveLength(5);
  });
});
