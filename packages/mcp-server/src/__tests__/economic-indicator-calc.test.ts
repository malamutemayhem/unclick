import { describe, it, expect } from "vitest";
import {
  publicAwareness, releaseFrequencyDays, marketImpact,
  forecastAccuracy, policyRelevance, leadingIndicator,
  surveyBased, measuredBy, unitOfMeasure, economicIndicators,
} from "../economic-indicator-calc.js";

describe("publicAwareness", () => {
  it("gdp most publicly known", () => {
    expect(publicAwareness("gdp")).toBeGreaterThan(
      publicAwareness("pmi")
    );
  });
});

describe("releaseFrequencyDays", () => {
  it("yield curve updated most frequently", () => {
    expect(releaseFrequencyDays("gdp")).toBeGreaterThan(
      releaseFrequencyDays("yield_curve")
    );
  });
});

describe("marketImpact", () => {
  it("yield curve highest market impact", () => {
    expect(marketImpact("yield_curve")).toBeGreaterThan(
      marketImpact("pmi")
    );
  });
});

describe("forecastAccuracy", () => {
  it("yield curve best forecast accuracy", () => {
    expect(forecastAccuracy("yield_curve")).toBeGreaterThan(
      forecastAccuracy("unemployment_rate")
    );
  });
});

describe("policyRelevance", () => {
  it("gdp most policy relevant", () => {
    expect(policyRelevance("gdp")).toBeGreaterThan(
      policyRelevance("pmi")
    );
  });
});

describe("leadingIndicator", () => {
  it("pmi is leading indicator", () => {
    expect(leadingIndicator("pmi")).toBe(true);
  });
  it("gdp is not", () => {
    expect(leadingIndicator("gdp")).toBe(false);
  });
});

describe("surveyBased", () => {
  it("pmi is survey based", () => {
    expect(surveyBased("pmi")).toBe(true);
  });
  it("gdp is not", () => {
    expect(surveyBased("gdp")).toBe(false);
  });
});

describe("measuredBy", () => {
  it("yield curve from treasury market", () => {
    expect(measuredBy("yield_curve")).toBe("treasury_market");
  });
});

describe("unitOfMeasure", () => {
  it("unemployment rate in percentage", () => {
    expect(unitOfMeasure("unemployment_rate")).toBe("percentage");
  });
});

describe("economicIndicators", () => {
  it("returns 5 indicators", () => {
    expect(economicIndicators()).toHaveLength(5);
  });
});
