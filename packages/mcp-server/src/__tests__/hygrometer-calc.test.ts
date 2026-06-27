import { describe, it, expect } from "vitest";
import {
  humidityAccuracy, responseSpeed, operatingRange, longTermStability,
  sensorCost, requiresWetBulb, electronic, sensingPrinciple,
  bestApplication, hygrometers,
} from "../hygrometer-calc.js";

describe("humidityAccuracy", () => {
  it("chilled mirror most accurate", () => {
    expect(humidityAccuracy("chilled_mirror")).toBeGreaterThan(humidityAccuracy("hair_tension"));
  });
});

describe("responseSpeed", () => {
  it("capacitive fastest response", () => {
    expect(responseSpeed("capacitive")).toBeGreaterThan(responseSpeed("hair_tension"));
  });
});

describe("operatingRange", () => {
  it("chilled mirror widest range", () => {
    expect(operatingRange("chilled_mirror")).toBeGreaterThan(operatingRange("hair_tension"));
  });
});

describe("longTermStability", () => {
  it("chilled mirror best stability", () => {
    expect(longTermStability("chilled_mirror")).toBeGreaterThan(longTermStability("hair_tension"));
  });
});

describe("sensorCost", () => {
  it("chilled mirror most expensive", () => {
    expect(sensorCost("chilled_mirror")).toBeGreaterThan(sensorCost("hair_tension"));
  });
});

describe("requiresWetBulb", () => {
  it("psychrometer requires wet bulb", () => {
    expect(requiresWetBulb("psychrometer")).toBe(true);
  });
  it("capacitive does not", () => {
    expect(requiresWetBulb("capacitive")).toBe(false);
  });
});

describe("electronic", () => {
  it("capacitive is electronic", () => {
    expect(electronic("capacitive")).toBe(true);
  });
  it("hair tension is not", () => {
    expect(electronic("hair_tension")).toBe(false);
  });
});

describe("sensingPrinciple", () => {
  it("chilled mirror uses dew point condensation detect", () => {
    expect(sensingPrinciple("chilled_mirror")).toBe("dew_point_condensation_detect");
  });
});

describe("bestApplication", () => {
  it("chilled mirror for lab reference standard", () => {
    expect(bestApplication("chilled_mirror")).toBe("lab_reference_standard");
  });
});

describe("hygrometers", () => {
  it("returns 5 types", () => {
    expect(hygrometers()).toHaveLength(5);
  });
});
