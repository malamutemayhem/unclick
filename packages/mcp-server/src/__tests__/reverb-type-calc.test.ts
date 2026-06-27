import { describe, it, expect } from "vitest";
import {
  decayTimeS, densityScore, naturalismScore,
  cpuUsage, colorationLevel, physicalDevice,
  impulseResponseBased, bestFor, earlyReflections, reverbTypes,
} from "../reverb-type-calc.js";

describe("decayTimeS", () => {
  it("hall longest decay", () => {
    expect(decayTimeS("hall")).toBeGreaterThan(
      decayTimeS("chamber")
    );
  });
});

describe("densityScore", () => {
  it("plate densest reflections", () => {
    expect(densityScore("plate")).toBeGreaterThan(
      densityScore("spring")
    );
  });
});

describe("naturalismScore", () => {
  it("convolution most natural", () => {
    expect(naturalismScore("convolution")).toBeGreaterThan(
      naturalismScore("spring")
    );
  });
});

describe("cpuUsage", () => {
  it("convolution uses most cpu", () => {
    expect(cpuUsage("convolution")).toBeGreaterThan(
      cpuUsage("spring")
    );
  });
});

describe("colorationLevel", () => {
  it("spring most colored", () => {
    expect(colorationLevel("spring")).toBeGreaterThan(
      colorationLevel("convolution")
    );
  });
});

describe("physicalDevice", () => {
  it("plate is physical device", () => {
    expect(physicalDevice("plate")).toBe(true);
  });
  it("hall is not", () => {
    expect(physicalDevice("hall")).toBe(false);
  });
});

describe("impulseResponseBased", () => {
  it("convolution uses impulse response", () => {
    expect(impulseResponseBased("convolution")).toBe(true);
  });
  it("hall does not", () => {
    expect(impulseResponseBased("hall")).toBe(false);
  });
});

describe("bestFor", () => {
  it("spring for guitar vintage", () => {
    expect(bestFor("spring")).toBe("guitar_vintage");
  });
});

describe("earlyReflections", () => {
  it("plate has immediate dense reflections", () => {
    expect(earlyReflections("plate")).toBe("immediate_dense");
  });
});

describe("reverbTypes", () => {
  it("returns 5 types", () => {
    expect(reverbTypes()).toHaveLength(5);
  });
});
