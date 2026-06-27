import { describe, it, expect } from "vitest";
import {
  populationPercent, ridgeComplexity, identificationValue,
  minutiaeCount, classificationDifficulty, hasCorePoint,
  hasDelta, ridgeFlowPattern, henryClassification, fingerprintTypes,
} from "../fingerprint-type-calc.js";

describe("populationPercent", () => {
  it("loop most common", () => {
    expect(populationPercent("loop")).toBeGreaterThan(
      populationPercent("whorl")
    );
  });
});

describe("ridgeComplexity", () => {
  it("double loop most complex", () => {
    expect(ridgeComplexity("double_loop")).toBeGreaterThan(
      ridgeComplexity("arch")
    );
  });
});

describe("identificationValue", () => {
  it("double loop highest id value", () => {
    expect(identificationValue("double_loop")).toBeGreaterThan(
      identificationValue("loop")
    );
  });
});

describe("minutiaeCount", () => {
  it("double loop most minutiae", () => {
    expect(minutiaeCount("double_loop")).toBeGreaterThan(
      minutiaeCount("loop")
    );
  });
});

describe("classificationDifficulty", () => {
  it("double loop hardest to classify", () => {
    expect(classificationDifficulty("double_loop")).toBeGreaterThan(
      classificationDifficulty("arch")
    );
  });
});

describe("hasCorePoint", () => {
  it("whorl has core point", () => {
    expect(hasCorePoint("whorl")).toBe(true);
  });
  it("arch does not", () => {
    expect(hasCorePoint("arch")).toBe(false);
  });
});

describe("hasDelta", () => {
  it("loop has delta", () => {
    expect(hasDelta("loop")).toBe(true);
  });
  it("arch does not", () => {
    expect(hasDelta("arch")).toBe(false);
  });
});

describe("ridgeFlowPattern", () => {
  it("whorl is circular", () => {
    expect(ridgeFlowPattern("whorl")).toBe("circular");
  });
});

describe("henryClassification", () => {
  it("arch classified as plain arch", () => {
    expect(henryClassification("arch")).toBe("plain_arch");
  });
});

describe("fingerprintTypes", () => {
  it("returns 5 types", () => {
    expect(fingerprintTypes()).toHaveLength(5);
  });
});
