import { describe, it, expect } from "vitest";
import {
  apertureRangeCm, imageSharpness, portability,
  lightGathering, costPerformanceRatio, usesLenses,
  groundBased, bestTarget, exampleTelescope, telescopeTypes,
} from "../telescope-type-calc.js";

describe("apertureRangeCm", () => {
  it("radio has largest aperture", () => {
    expect(apertureRangeCm("radio")).toBeGreaterThan(
      apertureRangeCm("refractor")
    );
  });
});

describe("imageSharpness", () => {
  it("space is sharpest", () => {
    expect(imageSharpness("space")).toBeGreaterThan(
      imageSharpness("radio")
    );
  });
});

describe("portability", () => {
  it("catadioptric most portable", () => {
    expect(portability("catadioptric")).toBeGreaterThan(
      portability("radio")
    );
  });
});

describe("lightGathering", () => {
  it("space gathers most light", () => {
    expect(lightGathering("space")).toBeGreaterThan(
      lightGathering("refractor")
    );
  });
});

describe("costPerformanceRatio", () => {
  it("reflector best value", () => {
    expect(costPerformanceRatio("reflector")).toBeGreaterThan(
      costPerformanceRatio("space")
    );
  });
});

describe("usesLenses", () => {
  it("refractor uses lenses", () => {
    expect(usesLenses("refractor")).toBe(true);
  });
  it("reflector does not", () => {
    expect(usesLenses("reflector")).toBe(false);
  });
});

describe("groundBased", () => {
  it("reflector is ground based", () => {
    expect(groundBased("reflector")).toBe(true);
  });
  it("space is not", () => {
    expect(groundBased("space")).toBe(false);
  });
});

describe("bestTarget", () => {
  it("radio best for pulsars", () => {
    expect(bestTarget("radio")).toBe("pulsars");
  });
});

describe("exampleTelescope", () => {
  it("space example is james webb", () => {
    expect(exampleTelescope("space")).toBe("james_webb");
  });
});

describe("telescopeTypes", () => {
  it("returns 5 types", () => {
    expect(telescopeTypes()).toHaveLength(5);
  });
});
