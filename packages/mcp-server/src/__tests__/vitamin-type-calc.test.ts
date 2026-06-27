import { describe, it, expect } from "vitest";
import {
  dailyValueMcg, deficiencyRisk, absorptionEase,
  storageCapability, toxicityRisk, fatSoluble,
  synthesizedByBody, bestSource, primaryFunction, vitaminTypes,
} from "../vitamin-type-calc.js";

describe("dailyValueMcg", () => {
  it("c has highest daily value", () => {
    expect(dailyValueMcg("c")).toBeGreaterThan(
      dailyValueMcg("b12")
    );
  });
});

describe("deficiencyRisk", () => {
  it("d has highest deficiency risk", () => {
    expect(deficiencyRisk("d")).toBeGreaterThan(
      deficiencyRisk("k")
    );
  });
});

describe("absorptionEase", () => {
  it("c is easiest to absorb", () => {
    expect(absorptionEase("c")).toBeGreaterThan(
      absorptionEase("b12")
    );
  });
});

describe("storageCapability", () => {
  it("a stores best in body", () => {
    expect(storageCapability("a")).toBeGreaterThan(
      storageCapability("c")
    );
  });
});

describe("toxicityRisk", () => {
  it("a has highest toxicity risk", () => {
    expect(toxicityRisk("a")).toBeGreaterThan(
      toxicityRisk("b12")
    );
  });
});

describe("fatSoluble", () => {
  it("d is fat soluble", () => {
    expect(fatSoluble("d")).toBe(true);
  });
  it("c is not", () => {
    expect(fatSoluble("c")).toBe(false);
  });
});

describe("synthesizedByBody", () => {
  it("d is synthesized by body", () => {
    expect(synthesizedByBody("d")).toBe(true);
  });
  it("c is not", () => {
    expect(synthesizedByBody("c")).toBe(false);
  });
});

describe("bestSource", () => {
  it("d from sunlight", () => {
    expect(bestSource("d")).toBe("sunlight");
  });
});

describe("primaryFunction", () => {
  it("k for blood clotting", () => {
    expect(primaryFunction("k")).toBe("blood_clotting");
  });
});

describe("vitaminTypes", () => {
  it("returns 5 types", () => {
    expect(vitaminTypes()).toHaveLength(5);
  });
});
