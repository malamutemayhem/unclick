import { describe, it, expect } from "vitest";
import {
  breakPredictability, cuttingDifficulty, durabilityInJewelry,
  surfaceSmoothness, identificationValue, planeFlat,
  requiresCare, exampleMineral, fracturePattern, cleavageTypes,
} from "../cleavage-type-calc.js";

describe("breakPredictability", () => {
  it("perfect most predictable", () => {
    expect(breakPredictability("perfect")).toBeGreaterThan(
      breakPredictability("none")
    );
  });
});

describe("cuttingDifficulty", () => {
  it("perfect hardest to cut", () => {
    expect(cuttingDifficulty("perfect")).toBeGreaterThan(
      cuttingDifficulty("none")
    );
  });
});

describe("durabilityInJewelry", () => {
  it("none most durable in jewelry", () => {
    expect(durabilityInJewelry("none")).toBeGreaterThan(
      durabilityInJewelry("perfect")
    );
  });
});

describe("surfaceSmoothness", () => {
  it("perfect smoothest surface", () => {
    expect(surfaceSmoothness("perfect")).toBeGreaterThan(
      surfaceSmoothness("none")
    );
  });
});

describe("identificationValue", () => {
  it("perfect highest identification value", () => {
    expect(identificationValue("perfect")).toBeGreaterThan(
      identificationValue("none")
    );
  });
});

describe("planeFlat", () => {
  it("perfect has flat planes", () => {
    expect(planeFlat("perfect")).toBe(true);
  });
  it("conchoidal does not", () => {
    expect(planeFlat("conchoidal")).toBe(false);
  });
});

describe("requiresCare", () => {
  it("perfect requires care", () => {
    expect(requiresCare("perfect")).toBe(true);
  });
  it("none does not", () => {
    expect(requiresCare("none")).toBe(false);
  });
});

describe("exampleMineral", () => {
  it("conchoidal is quartz obsidian", () => {
    expect(exampleMineral("conchoidal")).toBe("quartz_obsidian");
  });
});

describe("fracturePattern", () => {
  it("perfect is flat sheets", () => {
    expect(fracturePattern("perfect")).toBe("flat_sheets");
  });
});

describe("cleavageTypes", () => {
  it("returns 5 types", () => {
    expect(cleavageTypes()).toHaveLength(5);
  });
});
