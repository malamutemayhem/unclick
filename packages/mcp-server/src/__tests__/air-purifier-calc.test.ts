import { describe, it, expect } from "vitest";
import {
  particleRemoval, gasRemoval, germKilling, operatingCost,
  noiseLevelScore, filterReplacement, producesOzone, primaryTarget,
  bestEnvironment, airPurifiers,
} from "../air-purifier-calc.js";

describe("particleRemoval", () => {
  it("hepa best particle removal", () => {
    expect(particleRemoval("hepa_filter")).toBeGreaterThan(particleRemoval("uv_germicidal"));
  });
});

describe("gasRemoval", () => {
  it("activated carbon best gas removal", () => {
    expect(gasRemoval("activated_carbon")).toBeGreaterThan(gasRemoval("hepa_filter"));
  });
});

describe("germKilling", () => {
  it("uv germicidal best germ killing", () => {
    expect(germKilling("uv_germicidal")).toBeGreaterThan(germKilling("activated_carbon"));
  });
});

describe("operatingCost", () => {
  it("hepa filter highest operating cost", () => {
    expect(operatingCost("hepa_filter")).toBeGreaterThan(operatingCost("ionizer"));
  });
});

describe("noiseLevelScore", () => {
  it("hepa filter noisiest", () => {
    expect(noiseLevelScore("hepa_filter")).toBeGreaterThan(noiseLevelScore("ionizer"));
  });
});

describe("filterReplacement", () => {
  it("hepa filter needs replacement", () => {
    expect(filterReplacement("hepa_filter")).toBe(true);
  });
  it("ionizer does not", () => {
    expect(filterReplacement("ionizer")).toBe(false);
  });
});

describe("producesOzone", () => {
  it("ionizer produces ozone", () => {
    expect(producesOzone("ionizer")).toBe(true);
  });
  it("hepa filter does not", () => {
    expect(producesOzone("hepa_filter")).toBe(false);
  });
});

describe("primaryTarget", () => {
  it("hepa for dust pollen dander", () => {
    expect(primaryTarget("hepa_filter")).toBe("dust_pollen_dander");
  });
});

describe("bestEnvironment", () => {
  it("uv germicidal for medical facility lab", () => {
    expect(bestEnvironment("uv_germicidal")).toBe("medical_facility_lab");
  });
});

describe("airPurifiers", () => {
  it("returns 5 purifiers", () => {
    expect(airPurifiers()).toHaveLength(5);
  });
});
