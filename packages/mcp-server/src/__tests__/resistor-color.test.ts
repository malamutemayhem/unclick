import { describe, it, expect } from "vitest";
import {
  colorToDigit, digitToColor, colorToMultiplier, colorToTolerance,
  decode4Band, decode5Band, formatResistance, encode4Band,
  parallelResistance, seriesResistance, voltageDivider,
  currentThrough, powerDissipated, nearestStandard,
} from "../resistor-color.js";

describe("colorToDigit / digitToColor", () => {
  it("brown is 1", () => {
    expect(colorToDigit("brown")).toBe(1);
  });

  it("0 is black", () => {
    expect(digitToColor(0)).toBe("black");
  });

  it("round-trips", () => {
    expect(colorToDigit(digitToColor(5))).toBe(5);
  });
});

describe("colorToMultiplier / colorToTolerance", () => {
  it("red multiplier is 100", () => {
    expect(colorToMultiplier("red")).toBe(100);
  });

  it("gold tolerance is 5%", () => {
    expect(colorToTolerance("gold")).toBe(5);
  });
});

describe("decode4Band", () => {
  it("brown-black-red-gold = 1k ohm 5%", () => {
    const r = decode4Band("brown", "black", "red", "gold");
    expect(r.resistance).toBe(1000);
    expect(r.tolerance).toBe(5);
  });

  it("yellow-violet-orange-gold = 47k", () => {
    const r = decode4Band("yellow", "violet", "orange", "gold");
    expect(r.resistance).toBe(47000);
  });

  it("computes min/max", () => {
    const r = decode4Band("brown", "black", "red", "gold");
    expect(r.min).toBe(950);
    expect(r.max).toBe(1050);
  });
});

describe("decode5Band", () => {
  it("brown-black-black-brown-brown = 1k 1%", () => {
    const r = decode5Band("brown", "black", "black", "brown", "brown");
    expect(r.resistance).toBe(1000);
    expect(r.tolerance).toBe(1);
  });
});

describe("formatResistance", () => {
  it("formats k ohm", () => {
    expect(formatResistance(4700)).toBe("4.7 k ohm");
  });

  it("formats M ohm", () => {
    expect(formatResistance(1000000)).toBe("1 M ohm");
  });

  it("formats plain ohm", () => {
    expect(formatResistance(470)).toBe("470 ohm");
  });
});

describe("encode4Band", () => {
  it("encodes 1k ohm", () => {
    const bands = encode4Band(1000, 5);
    expect(bands.length).toBe(4);
    expect(bands[0]).toBe("brown");
    expect(bands[1]).toBe("black");
  });
});

describe("parallelResistance / seriesResistance", () => {
  it("two 1k in parallel = 500", () => {
    expect(parallelResistance(1000, 1000)).toBeCloseTo(500);
  });

  it("two 1k in series = 2k", () => {
    expect(seriesResistance(1000, 1000)).toBe(2000);
  });
});

describe("voltageDivider", () => {
  it("equal resistors halve voltage", () => {
    expect(voltageDivider(1000, 1000, 5)).toBeCloseTo(2.5);
  });
});

describe("currentThrough", () => {
  it("Ohm's law", () => {
    expect(currentThrough(1000, 5)).toBeCloseTo(0.005);
  });
});

describe("powerDissipated", () => {
  it("P = V^2/R", () => {
    expect(powerDissipated(1000, 5)).toBeCloseTo(0.025);
  });
});

describe("nearestStandard", () => {
  it("finds nearest E24 value", () => {
    const nearest = nearestStandard(4800);
    expect(nearest).toBe(4700);
  });

  it("exact match returns same", () => {
    expect(nearestStandard(1000)).toBe(1000);
  });
});
