import { describe, it, expect } from "vitest";
import {
  colorShift, lightfastnessBoost, washfastnessBoost,
  toxicity, fiberSafe, concentrationPercent,
  soakTimeHours, historicalAvailability, costPerKg, mordantTypes,
} from "../natural-dye-mordant-calc.js";

describe("colorShift", () => {
  it("iron saddens colors", () => {
    expect(colorShift("iron")).toBe("saddens");
  });
});

describe("lightfastnessBoost", () => {
  it("chrome boosts lightfastness most", () => {
    expect(lightfastnessBoost("chrome")).toBeGreaterThan(
      lightfastnessBoost("tin")
    );
  });
});

describe("washfastnessBoost", () => {
  it("chrome boosts washfastness most", () => {
    expect(washfastnessBoost("chrome")).toBeGreaterThan(
      washfastnessBoost("tin")
    );
  });
});

describe("toxicity", () => {
  it("chrome is most toxic", () => {
    expect(toxicity("chrome")).toBeGreaterThan(
      toxicity("alum")
    );
  });
});

describe("fiberSafe", () => {
  it("alum is fiber safe", () => {
    expect(fiberSafe("alum")).toBe(true);
  });
  it("tin is not", () => {
    expect(fiberSafe("tin")).toBe(false);
  });
});

describe("concentrationPercent", () => {
  it("alum needs highest concentration", () => {
    expect(concentrationPercent("alum")).toBeGreaterThan(
      concentrationPercent("iron")
    );
  });
});

describe("soakTimeHours", () => {
  it("alum needs longest soak", () => {
    expect(soakTimeHours("alum")).toBeGreaterThan(
      soakTimeHours("iron")
    );
  });
});

describe("historicalAvailability", () => {
  it("alum was historically available", () => {
    expect(historicalAvailability("alum")).toBe(true);
  });
  it("chrome was not", () => {
    expect(historicalAvailability("chrome")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("chrome costs most", () => {
    expect(costPerKg("chrome")).toBeGreaterThan(
      costPerKg("iron")
    );
  });
});

describe("mordantTypes", () => {
  it("returns 5 types", () => {
    expect(mordantTypes()).toHaveLength(5);
  });
});
