import { describe, it, expect } from "vitest";
import {
  sensitivity, specificity, turnaroundTime,
  costPerTest, sampleSizeRequired, confirmatory,
  screeningCapable, bestDetects, samplePrep, toxicologyMethods,
} from "../toxicology-method-calc.js";

describe("sensitivity", () => {
  it("mass spec most sensitive", () => {
    expect(sensitivity("mass_spectrometry")).toBeGreaterThan(
      sensitivity("spectrophotometry")
    );
  });
});

describe("specificity", () => {
  it("mass spec most specific", () => {
    expect(specificity("mass_spectrometry")).toBeGreaterThan(
      specificity("immunoassay")
    );
  });
});

describe("turnaroundTime", () => {
  it("immunoassay fastest turnaround", () => {
    expect(turnaroundTime("immunoassay")).toBeGreaterThan(
      turnaroundTime("mass_spectrometry")
    );
  });
});

describe("costPerTest", () => {
  it("mass spec most expensive", () => {
    expect(costPerTest("mass_spectrometry")).toBeGreaterThan(
      costPerTest("immunoassay")
    );
  });
});

describe("sampleSizeRequired", () => {
  it("spectrophotometry needs most sample", () => {
    expect(sampleSizeRequired("spectrophotometry")).toBeGreaterThan(
      sampleSizeRequired("immunoassay")
    );
  });
});

describe("confirmatory", () => {
  it("mass spec is confirmatory", () => {
    expect(confirmatory("mass_spectrometry")).toBe(true);
  });
  it("immunoassay is not", () => {
    expect(confirmatory("immunoassay")).toBe(false);
  });
});

describe("screeningCapable", () => {
  it("immunoassay is screening capable", () => {
    expect(screeningCapable("immunoassay")).toBe(true);
  });
  it("gas chromatography is not", () => {
    expect(screeningCapable("gas_chromatography")).toBe(false);
  });
});

describe("bestDetects", () => {
  it("mass spec for unknown substances", () => {
    expect(bestDetects("mass_spectrometry")).toBe("unknown_substances");
  });
});

describe("samplePrep", () => {
  it("immunoassay needs minimal dilution", () => {
    expect(samplePrep("immunoassay")).toBe("minimal_dilution");
  });
});

describe("toxicologyMethods", () => {
  it("returns 5 methods", () => {
    expect(toxicologyMethods()).toHaveLength(5);
  });
});
