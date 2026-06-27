import { describe, it, expect } from "vitest";
import {
  horsepower, fuelEfficiency, noiseLevel, durability,
  motorCost, emissionFree, shallowWater, propulsionDesign,
  bestBoat, outboardMotors,
} from "../outboard-motor-calc.js";

describe("horsepower", () => {
  it("diesel commercial most horsepower", () => {
    expect(horsepower("diesel_commercial")).toBeGreaterThan(horsepower("electric_trolling"));
  });
});

describe("fuelEfficiency", () => {
  it("electric trolling most efficient", () => {
    expect(fuelEfficiency("electric_trolling")).toBeGreaterThan(fuelEfficiency("two_stroke_gas"));
  });
});

describe("noiseLevel", () => {
  it("diesel commercial noisiest", () => {
    expect(noiseLevel("diesel_commercial")).toBeGreaterThan(noiseLevel("electric_trolling"));
  });
});

describe("durability", () => {
  it("diesel commercial most durable", () => {
    expect(durability("diesel_commercial")).toBeGreaterThan(durability("two_stroke_gas"));
  });
});

describe("motorCost", () => {
  it("diesel commercial most expensive", () => {
    expect(motorCost("diesel_commercial")).toBeGreaterThan(motorCost("electric_trolling"));
  });
});

describe("emissionFree", () => {
  it("electric trolling is emission free", () => {
    expect(emissionFree("electric_trolling")).toBe(true);
  });
  it("two stroke gas is not", () => {
    expect(emissionFree("two_stroke_gas")).toBe(false);
  });
});

describe("shallowWater", () => {
  it("jet drive handles shallow water", () => {
    expect(shallowWater("jet_drive")).toBe(true);
  });
  it("four stroke gas does not", () => {
    expect(shallowWater("four_stroke_gas")).toBe(false);
  });
});

describe("propulsionDesign", () => {
  it("jet drive uses impeller water intake", () => {
    expect(propulsionDesign("jet_drive")).toBe("impeller_water_intake");
  });
});

describe("bestBoat", () => {
  it("electric trolling for bass boat silent approach", () => {
    expect(bestBoat("electric_trolling")).toBe("bass_boat_silent_approach");
  });
});

describe("outboardMotors", () => {
  it("returns 5 types", () => {
    expect(outboardMotors()).toHaveLength(5);
  });
});
