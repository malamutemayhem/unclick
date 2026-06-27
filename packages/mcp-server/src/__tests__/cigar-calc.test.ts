import { describe, it, expect } from "vitest";
import {
  ringGaugeToMm, mmToRingGauge, smokingTime, humidorCapacity,
  humidityTarget, temperatureTarget, bovedaPackCount, agingMonths,
  cutType, pairingSuggestion, costPerMinute, ashLength,
  cigarShapes,
} from "../cigar-calc.js";

describe("ringGaugeToMm", () => {
  it("50 gauge is about 20mm", () => {
    expect(ringGaugeToMm(50)).toBeCloseTo(19.9, 0);
  });
});

describe("mmToRingGauge", () => {
  it("round trip", () => {
    expect(mmToRingGauge(ringGaugeToMm(50))).toBeCloseTo(50, 0);
  });
});

describe("smokingTime", () => {
  it("positive minutes", () => {
    expect(smokingTime(6, 50)).toBeGreaterThan(0);
  });
});

describe("humidorCapacity", () => {
  it("positive count", () => {
    expect(humidorCapacity(30, 20, 15)).toBeGreaterThan(0);
  });
});

describe("humidityTarget", () => {
  it("70%", () => {
    expect(humidityTarget()).toBe(70);
  });
});

describe("temperatureTarget", () => {
  it("range", () => {
    expect(temperatureTarget().maxC).toBeGreaterThan(temperatureTarget().minC);
  });
});

describe("bovedaPackCount", () => {
  it("at least 1", () => {
    expect(bovedaPackCount(10)).toBeGreaterThanOrEqual(1);
  });
});

describe("agingMonths", () => {
  it("oscuro longest", () => {
    expect(agingMonths("oscuro")).toBeGreaterThan(agingMonths("claro"));
  });
});

describe("cutType", () => {
  it("parejo uses guillotine", () => {
    expect(cutType("parejo")).toContain("guillotine");
  });
});

describe("pairingSuggestion", () => {
  it("returns suggestion", () => {
    expect(pairingSuggestion("full")).toContain("scotch");
  });
});

describe("costPerMinute", () => {
  it("positive cost", () => {
    expect(costPerMinute(15, 60)).toBeGreaterThan(0);
  });

  it("0 for no time", () => {
    expect(costPerMinute(15, 0)).toBe(0);
  });
});

describe("ashLength", () => {
  it("positive inches", () => {
    expect(ashLength(50)).toBeGreaterThan(0);
  });
});

describe("cigarShapes", () => {
  it("returns 6 shapes", () => {
    expect(cigarShapes()).toHaveLength(6);
  });
});
