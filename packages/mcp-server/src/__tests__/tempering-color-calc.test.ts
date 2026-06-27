import { describe, it, expect } from "vitest";
import {
  austenitizingTempCelsius, quenchMedium, temperColorAtDeg, temperTempForKnife,
  temperTempForSpring, soakTimeMinutes, hardnessHrc, decarburizationRisk,
  costPerKg, steelTypes,
} from "../tempering-color-calc.js";

describe("austenitizingTempCelsius", () => {
  it("5160 has highest austenitizing temp", () => {
    expect(austenitizingTempCelsius("5160")).toBeGreaterThan(
      austenitizingTempCelsius("carbon_1095")
    );
  });
});

describe("quenchMedium", () => {
  it("o1 uses oil", () => {
    expect(quenchMedium("o1")).toBe("oil");
  });
  it("w1 uses water", () => {
    expect(quenchMedium("w1")).toBe("water");
  });
});

describe("temperColorAtDeg", () => {
  it("220 is straw", () => {
    expect(temperColorAtDeg(220)).toBe("straw");
  });
  it("300 is blue", () => {
    expect(temperColorAtDeg(300)).toBe("blue");
  });
  it("below 200 has no color", () => {
    expect(temperColorAtDeg(150)).toBe("no_color");
  });
});

describe("temperTempForKnife", () => {
  it("carbon 1095 is tempered lowest for knives", () => {
    expect(temperTempForKnife("carbon_1095")).toBeLessThan(
      temperTempForKnife("5160")
    );
  });
});

describe("temperTempForSpring", () => {
  it("5160 tempered highest for springs", () => {
    expect(temperTempForSpring("5160")).toBeGreaterThan(
      temperTempForSpring("o1")
    );
  });
});

describe("soakTimeMinutes", () => {
  it("thicker stock soaks longer", () => {
    expect(soakTimeMinutes(20)).toBeGreaterThan(soakTimeMinutes(10));
  });
  it("minimum 30 minutes", () => {
    expect(soakTimeMinutes(1)).toBeGreaterThanOrEqual(30);
  });
});

describe("hardnessHrc", () => {
  it("w1 is hardest", () => {
    expect(hardnessHrc("w1")).toBeGreaterThan(hardnessHrc("5160"));
  });
});

describe("decarburizationRisk", () => {
  it("carbon 1095 has high risk", () => {
    expect(decarburizationRisk("carbon_1095")).toBeGreaterThan(
      decarburizationRisk("o1")
    );
  });
});

describe("costPerKg", () => {
  it("o1 is most expensive", () => {
    expect(costPerKg("o1")).toBeGreaterThan(costPerKg("5160"));
  });
});

describe("steelTypes", () => {
  it("returns 5 types", () => {
    expect(steelTypes()).toHaveLength(5);
  });
});
