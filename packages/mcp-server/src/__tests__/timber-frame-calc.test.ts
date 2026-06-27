import { describe, it, expect } from "vitest";
import {
  postSizeCm, beamSpanM, braceAngleDeg, pegDiameterMm, raisingCrewSize,
  jointCutTimeMinutes, timberVolumeM3, shrinkagePercent, frameCostPerM2,
  jointTypes,
} from "../timber-frame-calc.js";

describe("postSizeCm", () => {
  it("more storeys = larger posts", () => {
    expect(postSizeCm(3)).toBeGreaterThan(postSizeCm(1));
  });
});

describe("beamSpanM", () => {
  it("lighter load = longer span", () => {
    expect(beamSpanM(2)).toBeGreaterThan(beamSpanM(5));
  });
  it("zero load returns 0", () => {
    expect(beamSpanM(0)).toBe(0);
  });
});

describe("braceAngleDeg", () => {
  it("always 45 degrees", () => {
    expect(braceAngleDeg()).toBe(45);
  });
});

describe("pegDiameterMm", () => {
  it("larger timber = larger peg", () => {
    expect(pegDiameterMm(20)).toBeGreaterThan(pegDiameterMm(10));
  });
});

describe("raisingCrewSize", () => {
  it("heavier frame = more crew", () => {
    expect(raisingCrewSize(2000)).toBeGreaterThan(raisingCrewSize(500));
  });
  it("minimum 4 people", () => {
    expect(raisingCrewSize(100)).toBe(4);
  });
});

describe("jointCutTimeMinutes", () => {
  it("dovetail takes longest", () => {
    expect(jointCutTimeMinutes("dovetail")).toBeGreaterThan(jointCutTimeMinutes("lap"));
  });
});

describe("timberVolumeM3", () => {
  it("calculates volume correctly", () => {
    expect(timberVolumeM3(3, 20, 20)).toBeCloseTo(0.12, 2);
  });
});

describe("shrinkagePercent", () => {
  it("wetter wood shrinks more", () => {
    expect(shrinkagePercent(30)).toBeGreaterThan(shrinkagePercent(15));
  });
});

describe("frameCostPerM2", () => {
  it("premium costs more", () => {
    expect(frameCostPerM2("premium")).toBeGreaterThan(frameCostPerM2("standard"));
  });
});

describe("jointTypes", () => {
  it("returns 5 types", () => {
    expect(jointTypes()).toHaveLength(5);
  });
});
