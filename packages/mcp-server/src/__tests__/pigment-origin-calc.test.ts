import { describe, it, expect } from "vitest";
import {
  lightfastness, tintingStrength, opacity,
  toxicity, grindDifficulty, historicalAvailability,
  colorRange, bestMedium, costPerGram, pigmentOrigins,
} from "../pigment-origin-calc.js";

describe("lightfastness", () => {
  it("earth pigments are most lightfast", () => {
    expect(lightfastness("earth")).toBeGreaterThan(
      lightfastness("organic")
    );
  });
});

describe("tintingStrength", () => {
  it("synthetic has strongest tinting", () => {
    expect(tintingStrength("synthetic")).toBeGreaterThan(
      tintingStrength("earth")
    );
  });
});

describe("opacity", () => {
  it("mineral is most opaque", () => {
    expect(opacity("mineral")).toBeGreaterThan(
      opacity("lake")
    );
  });
});

describe("toxicity", () => {
  it("mineral pigments are most toxic", () => {
    expect(toxicity("mineral")).toBeGreaterThan(
      toxicity("organic")
    );
  });
});

describe("grindDifficulty", () => {
  it("mineral is hardest to grind", () => {
    expect(grindDifficulty("mineral")).toBeGreaterThan(
      grindDifficulty("synthetic")
    );
  });
});

describe("historicalAvailability", () => {
  it("earth pigments were historically available", () => {
    expect(historicalAvailability("earth")).toBe(true);
  });
  it("synthetic were not", () => {
    expect(historicalAvailability("synthetic")).toBe(false);
  });
});

describe("colorRange", () => {
  it("synthetic has widest color range", () => {
    expect(colorRange("synthetic")).toBeGreaterThan(
      colorRange("earth")
    );
  });
});

describe("bestMedium", () => {
  it("earth best for fresco", () => {
    expect(bestMedium("earth")).toBe("fresco");
  });
});

describe("costPerGram", () => {
  it("mineral costs most", () => {
    expect(costPerGram("mineral")).toBeGreaterThan(
      costPerGram("earth")
    );
  });
});

describe("pigmentOrigins", () => {
  it("returns 5 origins", () => {
    expect(pigmentOrigins()).toHaveLength(5);
  });
});
