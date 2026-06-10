import { describe, it, expect } from "vitest";
import {
  passengerCapacity, spaceRequired, maintenanceCost, weatherResistance,
  installComplexity, reversible, adaAccessible, typicalLocation,
  stepWidth, escalatorTypes,
} from "../escalator-type-calc.js";

describe("passengerCapacity", () => {
  it("moving walkway highest capacity", () => {
    expect(passengerCapacity("moving_walkway")).toBeGreaterThan(
      passengerCapacity("spiral")
    );
  });
});

describe("spaceRequired", () => {
  it("spiral needs least space", () => {
    expect(spaceRequired("standard")).toBeGreaterThan(spaceRequired("spiral"));
  });
});

describe("maintenanceCost", () => {
  it("spiral most expensive to maintain", () => {
    expect(maintenanceCost("spiral")).toBeGreaterThan(maintenanceCost("moving_walkway"));
  });
});

describe("weatherResistance", () => {
  it("outdoor best weather resistance", () => {
    expect(weatherResistance("outdoor")).toBeGreaterThan(weatherResistance("standard"));
  });
});

describe("installComplexity", () => {
  it("spiral most complex to install", () => {
    expect(installComplexity("spiral")).toBeGreaterThan(installComplexity("moving_walkway"));
  });
});

describe("reversible", () => {
  it("all escalators are reversible", () => {
    for (const e of escalatorTypes()) {
      expect(reversible(e)).toBe(true);
    }
  });
});

describe("adaAccessible", () => {
  it("moving walkway is ADA accessible", () => {
    expect(adaAccessible("moving_walkway")).toBe(true);
  });
  it("standard is not", () => {
    expect(adaAccessible("standard")).toBe(false);
  });
});

describe("typicalLocation", () => {
  it("moving walkway in airports", () => {
    expect(typicalLocation("moving_walkway")).toBe("airports_long_corridors");
  });
});

describe("stepWidth", () => {
  it("spiral has narrower steps", () => {
    expect(stepWidth("spiral")).toBe("600mm_800mm");
  });
});

describe("escalatorTypes", () => {
  it("returns 5 types", () => {
    expect(escalatorTypes()).toHaveLength(5);
  });
});
