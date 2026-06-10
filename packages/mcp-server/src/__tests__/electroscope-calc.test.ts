import { describe, it, expect } from "vitest";
import {
  leafDeflection, sensitivity, chargeDecayTime, leafThicknessUm,
  jarCapacitancePf, triboelectricCharge, coulombForce,
  inductionCharge, groundingTime, electroscopeTypes,
} from "../electroscope-calc.js";

describe("leafDeflection", () => {
  it("positive degrees", () => {
    expect(leafDeflection(1, 1)).toBeGreaterThan(0);
  });
  it("capped at 90", () => {
    expect(leafDeflection(1000, 0.1)).toBeLessThanOrEqual(90);
  });
  it("zero capacitance = 0", () => {
    expect(leafDeflection(1, 0)).toBe(0);
  });
});

describe("sensitivity", () => {
  it("quartz_fiber most sensitive", () => {
    expect(sensitivity("quartz_fiber")).toBeLessThan(sensitivity("pith_ball"));
  });
});

describe("chargeDecayTime", () => {
  it("humid = fast decay", () => {
    expect(chargeDecayTime(90)).toBeLessThan(chargeDecayTime(30));
  });
});

describe("leafThicknessUm", () => {
  it("gold_leaf = 0.1", () => {
    expect(leafThicknessUm("gold_leaf")).toBe(0.1);
  });
});

describe("jarCapacitancePf", () => {
  it("positive pF", () => {
    expect(jarCapacitancePf(20, 10)).toBeGreaterThan(0);
  });
});

describe("triboelectricCharge", () => {
  it("glass + rubber", () => {
    const result = triboelectricCharge("glass", "rubber");
    expect(result).toContain("positive");
  });
  it("unknown material", () => {
    expect(triboelectricCharge("gold", "rubber")).toBe("unknown");
  });
});

describe("coulombForce", () => {
  it("positive force", () => {
    expect(coulombForce(1, 1, 0.1)).toBeGreaterThan(0);
  });
  it("zero distance = 0", () => {
    expect(coulombForce(1, 1, 0)).toBe(0);
  });
});

describe("inductionCharge", () => {
  it("80% of field", () => {
    expect(inductionCharge(10)).toBe(8);
  });
});

describe("groundingTime", () => {
  it("is 2 seconds", () => {
    expect(groundingTime()).toBe(2);
  });
});

describe("electroscopeTypes", () => {
  it("returns 5 types", () => {
    expect(electroscopeTypes()).toHaveLength(5);
  });
});
