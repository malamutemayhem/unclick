import { describe, it, expect } from "vitest";
import {
  spanLength, counterweightTonnes, openingAngle, openingTimeS,
  clearanceHeight, chainLength, hydraulicPressureBar, maintenanceCost,
  vesselClearance, signalWarningS, bridgeTypes,
} from "../drawbridge-calc.js";

describe("spanLength", () => {
  it("bank + clearance", () => {
    expect(spanLength(20, 2)).toBe(24);
  });
});

describe("counterweightTonnes", () => {
  it("positive weight", () => {
    expect(counterweightTonnes(50, 2)).toBe(25);
  });
  it("zero ratio = 0", () => {
    expect(counterweightTonnes(50, 0)).toBe(0);
  });
});

describe("openingAngle", () => {
  it("bascule = 70", () => {
    expect(openingAngle("bascule")).toBe(70);
  });
});

describe("openingTimeS", () => {
  it("positive seconds", () => {
    expect(openingTimeS(20, 5)).toBeGreaterThan(0);
  });
  it("zero speed = 0", () => {
    expect(openingTimeS(20, 0)).toBe(0);
  });
});

describe("clearanceHeight", () => {
  it("lift minus tide", () => {
    expect(clearanceHeight(15, 3)).toBe(12);
  });
});

describe("chainLength", () => {
  it("longer than span", () => {
    expect(chainLength(20, 10)).toBeGreaterThan(20);
  });
});

describe("hydraulicPressureBar", () => {
  it("positive pressure", () => {
    expect(hydraulicPressureBar(10, 500)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(hydraulicPressureBar(10, 0)).toBe(0);
  });
});

describe("maintenanceCost", () => {
  it("increases with age", () => {
    expect(maintenanceCost(20, 30)).toBeGreaterThan(maintenanceCost(5, 30));
  });
});

describe("vesselClearance", () => {
  it("bridge minus mast", () => {
    expect(vesselClearance(15, 20)).toBe(5);
  });
});

describe("signalWarningS", () => {
  it("open time + 30s", () => {
    expect(signalWarningS(60)).toBe(90);
  });
});

describe("bridgeTypes", () => {
  it("returns 5 types", () => {
    expect(bridgeTypes()).toHaveLength(5);
  });
});
