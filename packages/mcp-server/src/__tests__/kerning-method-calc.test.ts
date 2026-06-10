import { describe, it, expect } from "vitest";
import {
  precision, automationLevel, timeRequired, pairCoverage,
  fileOverhead, requiresExpertise, builtIntoApps, openTypeFeature,
  bestScenario, kerningMethods,
} from "../kerning-method-calc.js";

describe("precision", () => {
  it("manual most precise", () => {
    expect(precision("manual")).toBeGreaterThan(precision("class_based"));
  });
});

describe("automationLevel", () => {
  it("contextual most automated", () => {
    expect(automationLevel("contextual")).toBeGreaterThan(automationLevel("manual"));
  });
});

describe("timeRequired", () => {
  it("manual takes most time", () => {
    expect(timeRequired("manual")).toBeGreaterThan(timeRequired("optical"));
  });
});

describe("pairCoverage", () => {
  it("contextual best pair coverage", () => {
    expect(pairCoverage("contextual")).toBeGreaterThan(pairCoverage("manual"));
  });
});

describe("fileOverhead", () => {
  it("manual most overhead", () => {
    expect(fileOverhead("manual")).toBeGreaterThan(fileOverhead("optical"));
  });
});

describe("requiresExpertise", () => {
  it("manual requires expertise", () => {
    expect(requiresExpertise("manual")).toBe(true);
  });
  it("optical does not", () => {
    expect(requiresExpertise("optical")).toBe(false);
  });
});

describe("builtIntoApps", () => {
  it("metric built into apps", () => {
    expect(builtIntoApps("metric")).toBe(true);
  });
  it("contextual not built in", () => {
    expect(builtIntoApps("contextual")).toBe(false);
  });
});

describe("openTypeFeature", () => {
  it("metric uses kern table", () => {
    expect(openTypeFeature("metric")).toBe("kern_table");
  });
});

describe("bestScenario", () => {
  it("manual for logo headline craft", () => {
    expect(bestScenario("manual")).toBe("logo_headline_craft");
  });
});

describe("kerningMethods", () => {
  it("returns 5 methods", () => {
    expect(kerningMethods()).toHaveLength(5);
  });
});
