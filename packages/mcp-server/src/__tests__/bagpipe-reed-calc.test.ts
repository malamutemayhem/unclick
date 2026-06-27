import { describe, it, expect } from "vitest";
import {
  caneLengthMm, openingMm, breakInDays,
  lifespanWeeks, pressureRequired, humiditySensitive,
  toneStability, adjustability, costPerReed, bagpipeReeds,
} from "../bagpipe-reed-calc.js";

describe("caneLengthMm", () => {
  it("synthetic is longest", () => {
    expect(caneLengthMm("synthetic")).toBeGreaterThan(
      caneLengthMm("chanter")
    );
  });
});

describe("openingMm", () => {
  it("practice chanter has widest opening", () => {
    expect(openingMm("practice_chanter")).toBeGreaterThan(
      openingMm("tenor_drone")
    );
  });
});

describe("breakInDays", () => {
  it("chanter takes longest to break in", () => {
    expect(breakInDays("chanter")).toBeGreaterThan(
      breakInDays("synthetic")
    );
  });
  it("synthetic needs no break in", () => {
    expect(breakInDays("synthetic")).toBe(0);
  });
});

describe("lifespanWeeks", () => {
  it("synthetic lasts longest", () => {
    expect(lifespanWeeks("synthetic")).toBeGreaterThan(
      lifespanWeeks("chanter")
    );
  });
});

describe("pressureRequired", () => {
  it("chanter needs most pressure", () => {
    expect(pressureRequired("chanter")).toBeGreaterThan(
      pressureRequired("tenor_drone")
    );
  });
});

describe("humiditySensitive", () => {
  it("chanter is humidity sensitive", () => {
    expect(humiditySensitive("chanter")).toBe(true);
  });
  it("synthetic is not", () => {
    expect(humiditySensitive("synthetic")).toBe(false);
  });
});

describe("toneStability", () => {
  it("synthetic is most stable", () => {
    expect(toneStability("synthetic")).toBeGreaterThan(
      toneStability("practice_chanter")
    );
  });
});

describe("adjustability", () => {
  it("chanter is most adjustable", () => {
    expect(adjustability("chanter")).toBeGreaterThan(
      adjustability("synthetic")
    );
  });
});

describe("costPerReed", () => {
  it("synthetic is most expensive", () => {
    expect(costPerReed("synthetic")).toBeGreaterThan(
      costPerReed("tenor_drone")
    );
  });
});

describe("bagpipeReeds", () => {
  it("returns 5 reeds", () => {
    expect(bagpipeReeds()).toHaveLength(5);
  });
});
