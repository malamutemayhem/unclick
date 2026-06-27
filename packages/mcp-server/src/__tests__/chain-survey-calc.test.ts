import { describe, it, expect } from "vitest";
import {
  chainLengthM, linkCount, areaByChainSq, areaAcres, offsetMaxM,
  tallyMarkerCount, temperatureCorrectionMm, sagCorrectionMm,
  slopeCorrectionM, chainTypes,
} from "../chain-survey-calc.js";

describe("chainLengthM", () => {
  it("engineer chain is longest", () => {
    expect(chainLengthM("engineer")).toBeGreaterThan(chainLengthM("revenue"));
  });
});

describe("linkCount", () => {
  it("gunter has 100 links", () => {
    expect(linkCount("gunter")).toBe(100);
  });
  it("steel band has no links", () => {
    expect(linkCount("steel_band")).toBe(0);
  });
});

describe("areaByChainSq", () => {
  it("calculates area", () => {
    expect(areaByChainSq(5, 4)).toBe(20);
  });
});

describe("areaAcres", () => {
  it("positive for valid inputs", () => {
    expect(areaAcres(10, 20)).toBeGreaterThan(0);
  });
});

describe("offsetMaxM", () => {
  it("quarter of chain length", () => {
    expect(offsetMaxM(20)).toBe(5);
  });
});

describe("tallyMarkerCount", () => {
  it("20m chain has 4 tally markers", () => {
    expect(tallyMarkerCount(20)).toBe(4);
  });
});

describe("temperatureCorrectionMm", () => {
  it("higher temp diff = larger correction", () => {
    expect(temperatureCorrectionMm(100, 20)).toBeGreaterThan(
      temperatureCorrectionMm(100, 10)
    );
  });
});

describe("sagCorrectionMm", () => {
  it("longer span = more sag", () => {
    expect(sagCorrectionMm(30, 0.5, 50)).toBeGreaterThan(
      sagCorrectionMm(20, 0.5, 50)
    );
  });
  it("zero tension returns zero", () => {
    expect(sagCorrectionMm(30, 0.5, 0)).toBe(0);
  });
});

describe("slopeCorrectionM", () => {
  it("steeper = larger correction", () => {
    expect(slopeCorrectionM(100, 20)).toBeGreaterThan(slopeCorrectionM(100, 10));
  });
  it("zero distance returns zero", () => {
    expect(slopeCorrectionM(0, 10)).toBe(0);
  });
});

describe("chainTypes", () => {
  it("returns 5 types", () => {
    expect(chainTypes()).toHaveLength(5);
  });
});
