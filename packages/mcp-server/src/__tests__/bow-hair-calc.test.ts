import { describe, it, expect } from "vitest";
import {
  hairCount, ribbonWidthMm, playingLengthCm, tensionNewtons,
  rosinApplicationsPerHour, rehairIntervalMonths, stickWeightG,
  camberDepthMm, stickMaterial, bowTypes,
} from "../bow-hair-calc.js";

describe("hairCount", () => {
  it("bass has most hair", () => {
    expect(hairCount("bass")).toBeGreaterThan(hairCount("violin"));
  });
});

describe("ribbonWidthMm", () => {
  it("bass is widest", () => {
    expect(ribbonWidthMm("bass")).toBeGreaterThan(ribbonWidthMm("baroque"));
  });
});

describe("playingLengthCm", () => {
  it("violin has longest playing length", () => {
    expect(playingLengthCm("violin")).toBeGreaterThan(playingLengthCm("bass"));
  });
});

describe("tensionNewtons", () => {
  it("bass has highest tension", () => {
    expect(tensionNewtons("bass")).toBeGreaterThan(tensionNewtons("baroque"));
  });
});

describe("rosinApplicationsPerHour", () => {
  it("dry climate needs most rosin", () => {
    expect(rosinApplicationsPerHour("dry")).toBeGreaterThan(
      rosinApplicationsPerHour("humid")
    );
  });
});

describe("rehairIntervalMonths", () => {
  it("heavy practice = more frequent rehair", () => {
    expect(rehairIntervalMonths(4)).toBeLessThan(rehairIntervalMonths(1));
  });
  it("zero practice = max interval", () => {
    expect(rehairIntervalMonths(0)).toBe(12);
  });
});

describe("stickWeightG", () => {
  it("bass is heaviest", () => {
    expect(stickWeightG("bass")).toBeGreaterThan(stickWeightG("violin"));
  });
});

describe("camberDepthMm", () => {
  it("violin has deepest camber", () => {
    expect(camberDepthMm("violin")).toBeGreaterThan(camberDepthMm("baroque"));
  });
});

describe("stickMaterial", () => {
  it("professional uses pernambuco", () => {
    expect(stickMaterial("professional")).toBe("pernambuco");
  });
  it("student uses fiberglass", () => {
    expect(stickMaterial("student")).toBe("fiberglass");
  });
});

describe("bowTypes", () => {
  it("returns 5 types", () => {
    expect(bowTypes()).toHaveLength(5);
  });
});
