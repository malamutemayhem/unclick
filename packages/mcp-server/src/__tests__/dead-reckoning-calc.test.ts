import { describe, it, expect } from "vitest";
import {
  distanceNm, courseOverGround, speedMadeGood, positionErrorNmPerHour,
  fixIntervalMinutes, logRequired, chartRequired, leewayDeg,
  etaHours, currentTypes,
} from "../dead-reckoning-calc.js";

describe("distanceNm", () => {
  it("more time means more distance", () => {
    expect(distanceNm(5, 3)).toBeGreaterThan(distanceNm(5, 1));
  });
});

describe("courseOverGround", () => {
  it("no current means COG equals heading", () => {
    expect(courseOverGround(90, 0, 0, 5)).toBe(90);
  });
});

describe("speedMadeGood", () => {
  it("following current increases speed", () => {
    expect(speedMadeGood(5, "following", 2)).toBeGreaterThan(
      speedMadeGood(5, "none", 0)
    );
  });
  it("opposing current decreases speed", () => {
    expect(speedMadeGood(5, "opposing", 2)).toBeLessThan(
      speedMadeGood(5, "none", 0)
    );
  });
});

describe("positionErrorNmPerHour", () => {
  it("returns 0.5", () => {
    expect(positionErrorNmPerHour()).toBe(0.5);
  });
});

describe("fixIntervalMinutes", () => {
  it("poor visibility needs more frequent fixes", () => {
    expect(fixIntervalMinutes("poor")).toBeLessThan(
      fixIntervalMinutes("good")
    );
  });
});

describe("logRequired", () => {
  it("returns true", () => {
    expect(logRequired()).toBe(true);
  });
});

describe("chartRequired", () => {
  it("returns true", () => {
    expect(chartRequired()).toBe(true);
  });
});

describe("leewayDeg", () => {
  it("stronger wind means more leeway", () => {
    expect(leewayDeg(6)).toBeGreaterThan(leewayDeg(3));
  });
});

describe("etaHours", () => {
  it("faster speed means less time", () => {
    expect(etaHours(10, 5)).toBeLessThan(etaHours(10, 2));
  });
  it("zero speed returns Infinity", () => {
    expect(etaHours(10, 0)).toBe(Infinity);
  });
});

describe("currentTypes", () => {
  it("returns 5 types", () => {
    expect(currentTypes()).toHaveLength(5);
  });
});
