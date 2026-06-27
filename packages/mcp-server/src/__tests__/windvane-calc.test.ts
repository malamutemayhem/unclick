import { describe, it, expect } from "vitest";
import {
  tailArea, balancePoint, pivotFriction, responseSpeed,
  mountHeight, cardinalDirection, beaufortScale, materialWeight,
  rustProtectionYears, vaneStyles,
} from "../windvane-calc.js";

describe("tailArea", () => {
  it("1.5x head", () => {
    expect(tailArea(100)).toBe(150);
  });
});

describe("balancePoint", () => {
  it("33% from pivot", () => {
    expect(balancePoint(100)).toBe(33);
  });
});

describe("pivotFriction", () => {
  it("ball bearing lowest", () => {
    expect(pivotFriction(5, "ball")).toBeLessThan(pivotFriction(5, "plain"));
  });
});

describe("responseSpeed", () => {
  it("positive speed", () => {
    expect(responseSpeed(0.5, 10)).toBeGreaterThan(0);
  });
  it("zero arm = 0", () => {
    expect(responseSpeed(0, 10)).toBe(0);
  });
});

describe("mountHeight", () => {
  it("building + 1.5m", () => {
    expect(mountHeight(10)).toBe(11.5);
  });
});

describe("cardinalDirection", () => {
  it("0 = N", () => {
    expect(cardinalDirection(0)).toBe("N");
  });
  it("90 = E", () => {
    expect(cardinalDirection(90)).toBe("E");
  });
  it("225 = SW", () => {
    expect(cardinalDirection(225)).toBe("SW");
  });
});

describe("beaufortScale", () => {
  it("calm at 0", () => {
    expect(beaufortScale(0)).toBe(0);
  });
  it("hurricane at 120+", () => {
    expect(beaufortScale(120)).toBe(12);
  });
});

describe("materialWeight", () => {
  it("horse heaviest", () => {
    expect(materialWeight("horse")).toBeGreaterThan(materialWeight("arrow"));
  });
});

describe("rustProtectionYears", () => {
  it("copper longest", () => {
    expect(rustProtectionYears("copper")).toBeGreaterThan(rustProtectionYears("painted"));
  });
});

describe("vaneStyles", () => {
  it("returns 5 styles", () => {
    expect(vaneStyles()).toHaveLength(5);
  });
});
