import { describe, it, expect } from "vitest";
import {
  getWireSpec, awgDiameter, awgArea, awgResistance,
  voltageDrop, voltageDropPercent, recommendGauge,
  powerLoss, maxDistance, wireWeight, conduitFill,
  getAvailableGauges, gaugeComparison, temperatureDerating,
} from "../wire-gauge.js";

describe("getWireSpec", () => {
  it("returns spec for gauge 12", () => {
    const spec = getWireSpec(12);
    expect(spec).not.toBeNull();
    expect(spec!.gauge).toBe(12);
    expect(spec!.diameterMm).toBeCloseTo(2.053, 1);
    expect(spec!.maxCurrentA).toBe(40);
  });

  it("returns null for unknown gauge", () => {
    expect(getWireSpec(99)).toBeNull();
  });
});

describe("awgDiameter", () => {
  it("gauge 0 about 8.25mm", () => {
    expect(awgDiameter(0)).toBeCloseTo(8.25, 0);
  });

  it("smaller gauge = larger diameter", () => {
    expect(awgDiameter(10)).toBeGreaterThan(awgDiameter(14));
  });
});

describe("awgArea", () => {
  it("positive area", () => {
    expect(awgArea(12)).toBeGreaterThan(0);
  });
});

describe("awgResistance", () => {
  it("higher gauge = more resistance", () => {
    expect(awgResistance(20)).toBeGreaterThan(awgResistance(10));
  });
});

describe("voltageDrop", () => {
  it("positive for current and length", () => {
    const drop = voltageDrop(15, 30, 14);
    expect(drop).toBeGreaterThan(0);
  });
});

describe("voltageDropPercent", () => {
  it("percentage of supply voltage", () => {
    const pct = voltageDropPercent(15, 30, 14, 120);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(10);
  });
});

describe("recommendGauge", () => {
  it("recommends appropriate gauge", () => {
    const gauge = recommendGauge(20);
    expect(gauge).toBeGreaterThanOrEqual(0);
    expect(gauge).toBeLessThanOrEqual(16);
  });
});

describe("powerLoss", () => {
  it("positive power loss", () => {
    expect(powerLoss(10, 50, 12)).toBeGreaterThan(0);
  });
});

describe("maxDistance", () => {
  it("returns positive distance", () => {
    expect(maxDistance(15, 12, 120)).toBeGreaterThan(0);
  });
});

describe("wireWeight", () => {
  it("copper heavier than aluminum", () => {
    const copper = wireWeight(12, 100, "copper");
    const aluminum = wireWeight(12, 100, "aluminum");
    expect(copper).toBeGreaterThan(aluminum);
  });
});

describe("conduitFill", () => {
  it("computes fill percentage", () => {
    const result = conduitFill([12, 12, 12], 25);
    expect(result.fillPercent).toBeGreaterThan(0);
    expect(typeof result.fits).toBe("boolean");
  });
});

describe("getAvailableGauges", () => {
  it("returns gauge list", () => {
    const gauges = getAvailableGauges();
    expect(gauges.length).toBeGreaterThan(10);
    expect(gauges).toContain(12);
  });
});

describe("gaugeComparison", () => {
  it("compares two gauges", () => {
    const comp = gaugeComparison(10, 14);
    expect(comp.areaRatio).toBeGreaterThan(1);
    expect(comp.resistanceRatio).toBeLessThan(1);
  });
});

describe("temperatureDerating", () => {
  it("no derating at rated temp", () => {
    expect(temperatureDerating(40, 30)).toBe(40);
  });

  it("derates at higher temp", () => {
    expect(temperatureDerating(40, 50)).toBeLessThan(40);
  });
});
