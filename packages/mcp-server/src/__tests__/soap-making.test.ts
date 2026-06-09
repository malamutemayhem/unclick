import { describe, it, expect } from "vitest";
import {
  sapValue, lyeAmount, waterAmount, batchWeight, barCount,
  cureWeeks, traceTime, fragranceOz, colorant, moldVolume,
  hardness, bubblyness, shelfLifeMonths, soapMethods,
} from "../soap-making.js";

describe("sapValue", () => {
  it("coconut has highest SAP", () => {
    expect(sapValue("coconut")).toBeGreaterThan(sapValue("olive"));
  });
});

describe("lyeAmount", () => {
  it("positive grams", () => {
    expect(lyeAmount(1000, 0.134)).toBeGreaterThan(0);
  });
  it("less with more superfat", () => {
    expect(lyeAmount(1000, 0.134, 10)).toBeLessThan(lyeAmount(1000, 0.134, 0));
  });
});

describe("waterAmount", () => {
  it("positive grams", () => {
    expect(waterAmount(100)).toBeGreaterThan(0);
  });
});

describe("batchWeight", () => {
  it("sum of ingredients", () => {
    expect(batchWeight(1000, 134, 270)).toBe(1404);
  });
});

describe("barCount", () => {
  it("positive bars", () => {
    expect(barCount(1400)).toBeGreaterThan(0);
  });
});

describe("cureWeeks", () => {
  it("cold process needs 6 weeks", () => {
    expect(cureWeeks("cold_process")).toBe(6);
  });
  it("melt and pour needs 0 weeks", () => {
    expect(cureWeeks("melt_and_pour")).toBe(0);
  });
});

describe("traceTime", () => {
  it("cold process is 15 min", () => {
    expect(traceTime("cold_process")).toBe(15);
  });
});

describe("fragranceOz", () => {
  it("positive ounces", () => {
    expect(fragranceOz(32)).toBeGreaterThan(0);
  });
});

describe("colorant", () => {
  it("positive tsp", () => {
    expect(colorant(32)).toBeGreaterThan(0);
  });
});

describe("moldVolume", () => {
  it("positive cm3", () => {
    expect(moldVolume(25, 8, 8)).toBeGreaterThan(0);
  });
});

describe("hardness", () => {
  it("high coconut + palm = very hard", () => {
    expect(hardness(40, 25)).toBe("very hard");
  });
  it("low = soft", () => {
    expect(hardness(5, 5)).toBe("soft");
  });
});

describe("bubblyness", () => {
  it("high coconut + castor = high lather", () => {
    expect(bubblyness(30, 15)).toBe("high lather");
  });
});

describe("shelfLifeMonths", () => {
  it("cold process lasts 24 months", () => {
    expect(shelfLifeMonths("cold_process")).toBe(24);
  });
});

describe("soapMethods", () => {
  it("returns 4 methods", () => {
    expect(soapMethods()).toHaveLength(4);
  });
});
