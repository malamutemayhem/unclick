import { describe, it, expect } from "vitest";
import {
  keyCount, dynamicRange, sustainCapability,
  polyphony, weightKg, acoustic,
  velocitySensitive, bestGenre, averagePriceUsd, keyboardTypes,
} from "../keyboard-type-calc.js";

describe("keyCount", () => {
  it("grand piano has 88 keys", () => {
    expect(keyCount("grand_piano")).toBe(88);
  });
});

describe("dynamicRange", () => {
  it("grand piano has widest dynamic range", () => {
    expect(dynamicRange("grand_piano")).toBeGreaterThan(
      dynamicRange("harpsichord")
    );
  });
});

describe("sustainCapability", () => {
  it("grand piano sustains best", () => {
    expect(sustainCapability("grand_piano")).toBeGreaterThan(
      sustainCapability("harpsichord")
    );
  });
});

describe("polyphony", () => {
  it("grand piano has full polyphony", () => {
    expect(polyphony("grand_piano")).toBeGreaterThan(
      polyphony("harpsichord")
    );
  });
});

describe("weightKg", () => {
  it("organ is heaviest", () => {
    expect(weightKg("organ")).toBeGreaterThan(
      weightKg("synthesizer")
    );
  });
});

describe("acoustic", () => {
  it("grand piano is acoustic", () => {
    expect(acoustic("grand_piano")).toBe(true);
  });
  it("synthesizer is not", () => {
    expect(acoustic("synthesizer")).toBe(false);
  });
});

describe("velocitySensitive", () => {
  it("grand piano is velocity sensitive", () => {
    expect(velocitySensitive("grand_piano")).toBe(true);
  });
  it("harpsichord is not", () => {
    expect(velocitySensitive("harpsichord")).toBe(false);
  });
});

describe("bestGenre", () => {
  it("synthesizer for electronic", () => {
    expect(bestGenre("synthesizer")).toBe("electronic");
  });
});

describe("averagePriceUsd", () => {
  it("organ is most expensive", () => {
    expect(averagePriceUsd("organ")).toBeGreaterThan(
      averagePriceUsd("synthesizer")
    );
  });
});

describe("keyboardTypes", () => {
  it("returns 5 types", () => {
    expect(keyboardTypes()).toHaveLength(5);
  });
});
