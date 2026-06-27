import { describe, it, expect } from "vitest";
import {
  peakTempCelsius, bendAngleDeg, soakTimeMinutes, rampRateCelsiusPerHour,
  placementDepthMm, mountingAngleDeg, conesPerFiring, accuracyPlusMinus,
  costPerBox, coneTypes,
} from "../pyrometric-calc.js";

describe("peakTempCelsius", () => {
  it("higher cone number = higher temp", () => {
    expect(peakTempCelsius("orton", 10)).toBeGreaterThan(
      peakTempCelsius("orton", 5)
    );
  });
});

describe("bendAngleDeg", () => {
  it("100% heatwork = 90 degrees max", () => {
    expect(bendAngleDeg(100)).toBe(90);
  });
  it("50% heatwork = 45 degrees", () => {
    expect(bendAngleDeg(50)).toBe(45);
  });
});

describe("soakTimeMinutes", () => {
  it("higher cone = longer soak", () => {
    expect(soakTimeMinutes(10)).toBeGreaterThan(soakTimeMinutes(3));
  });
  it("minimum 5 minutes", () => {
    expect(soakTimeMinutes(1)).toBeGreaterThanOrEqual(5);
  });
});

describe("rampRateCelsiusPerHour", () => {
  it("higher cone = slower ramp", () => {
    expect(rampRateCelsiusPerHour(10)).toBeLessThan(rampRateCelsiusPerHour(2));
  });
  it("zero cone returns 100", () => {
    expect(rampRateCelsiusPerHour(0)).toBe(100);
  });
});

describe("placementDepthMm", () => {
  it("orton is deepest", () => {
    expect(placementDepthMm("orton")).toBeGreaterThan(placementDepthMm("bullers"));
  });
});

describe("mountingAngleDeg", () => {
  it("returns 8", () => {
    expect(mountingAngleDeg()).toBe(8);
  });
});

describe("conesPerFiring", () => {
  it("returns 3", () => {
    expect(conesPerFiring()).toBe(3);
  });
});

describe("accuracyPlusMinus", () => {
  it("orton is most accurate", () => {
    expect(accuracyPlusMinus("orton")).toBeLessThan(accuracyPlusMinus("stafford"));
  });
});

describe("costPerBox", () => {
  it("seger is most expensive", () => {
    expect(costPerBox("seger")).toBeGreaterThan(costPerBox("stafford"));
  });
});

describe("coneTypes", () => {
  it("returns 5 types", () => {
    expect(coneTypes()).toHaveLength(5);
  });
});
