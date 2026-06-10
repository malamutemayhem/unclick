import { describe, it, expect } from "vitest";
import {
  decibelLevel, expressiveIntensity, physicalEffort,
  controlDifficulty, usageFrequency, softDynamic,
  extremeDynamic, italianName, typicalContext, dynamicsMarkings,
} from "../dynamics-marking-calc.js";

describe("decibelLevel", () => {
  it("ff is loudest", () => {
    expect(decibelLevel("ff")).toBeGreaterThan(
      decibelLevel("pp")
    );
  });
});

describe("expressiveIntensity", () => {
  it("ff most expressive", () => {
    expect(expressiveIntensity("ff")).toBeGreaterThan(
      expressiveIntensity("mp")
    );
  });
});

describe("physicalEffort", () => {
  it("ff requires most effort", () => {
    expect(physicalEffort("ff")).toBeGreaterThan(
      physicalEffort("mp")
    );
  });
});

describe("controlDifficulty", () => {
  it("pp hardest to control", () => {
    expect(controlDifficulty("pp")).toBeGreaterThan(
      controlDifficulty("mp")
    );
  });
});

describe("usageFrequency", () => {
  it("mf used most", () => {
    expect(usageFrequency("mf")).toBeGreaterThan(
      usageFrequency("pp")
    );
  });
});

describe("softDynamic", () => {
  it("p is soft", () => {
    expect(softDynamic("p")).toBe(true);
  });
  it("ff is not", () => {
    expect(softDynamic("ff")).toBe(false);
  });
});

describe("extremeDynamic", () => {
  it("pp is extreme", () => {
    expect(extremeDynamic("pp")).toBe(true);
  });
  it("mf is not", () => {
    expect(extremeDynamic("mf")).toBe(false);
  });
});

describe("italianName", () => {
  it("pp is pianissimo", () => {
    expect(italianName("pp")).toBe("pianissimo");
  });
});

describe("typicalContext", () => {
  it("ff used at climax", () => {
    expect(typicalContext("ff")).toBe("climax");
  });
});

describe("dynamicsMarkings", () => {
  it("returns 5 markings", () => {
    expect(dynamicsMarkings()).toHaveLength(5);
  });
});
