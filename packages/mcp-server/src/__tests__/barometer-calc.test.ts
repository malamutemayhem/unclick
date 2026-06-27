import { describe, it, expect } from "vitest";
import {
  hPaToMmHg, mmHgToHPa, hPaToInHg, altimeterSetting,
  pressureAltitude, tendency, weatherForecast, mercuryColumnHeight,
  waterColumnHeight, accuracy, calibrationInterval, barometerTypes,
} from "../barometer-calc.js";

describe("hPaToMmHg", () => {
  it("1013 hPa approx 760 mmHg", () => {
    expect(hPaToMmHg(1013)).toBeCloseTo(760, 0);
  });
});

describe("mmHgToHPa", () => {
  it("round trip", () => {
    expect(mmHgToHPa(hPaToMmHg(1013))).toBeCloseTo(1013, 0);
  });
});

describe("hPaToInHg", () => {
  it("1013 hPa approx 29.92 inHg", () => {
    expect(hPaToInHg(1013)).toBeCloseTo(29.92, 0);
  });
});

describe("altimeterSetting", () => {
  it("higher than station pressure", () => {
    expect(altimeterSetting(1000, 100)).toBeGreaterThan(1000);
  });
});

describe("pressureAltitude", () => {
  it("standard = 0", () => {
    expect(pressureAltitude(1013.25)).toBeCloseTo(0, 0);
  });
});

describe("tendency", () => {
  it("rising", () => {
    expect(tendency(1015, 1012)).toBe("rising");
  });
  it("falling", () => {
    expect(tendency(1008, 1012)).toBe("falling");
  });
  it("steady", () => {
    expect(tendency(1013, 1013)).toBe("steady");
  });
});

describe("weatherForecast", () => {
  it("high rising = fair", () => {
    expect(weatherForecast(1025, "rising")).toBe("fair");
  });
  it("low falling = stormy", () => {
    expect(weatherForecast(995, "falling")).toBe("stormy");
  });
});

describe("mercuryColumnHeight", () => {
  it("positive mm", () => {
    expect(mercuryColumnHeight(1013)).toBeGreaterThan(0);
  });
});

describe("waterColumnHeight", () => {
  it("much taller than mercury", () => {
    expect(waterColumnHeight(1013)).toBeGreaterThan(mercuryColumnHeight(1013));
  });
});

describe("accuracy", () => {
  it("fortin most accurate", () => {
    expect(accuracy("fortin")).toBeLessThan(accuracy("aneroid"));
  });
});

describe("calibrationInterval", () => {
  it("water needs most frequent", () => {
    expect(calibrationInterval("water")).toBeLessThan(calibrationInterval("mercury"));
  });
});

describe("barometerTypes", () => {
  it("returns 5 types", () => {
    expect(barometerTypes()).toHaveLength(5);
  });
});
