import { describe, it, expect } from "vitest";
import {
  ratioRange, twistPerCm, bobbinCapacityG, driveType, orificeSizeMm,
  treadleCount, wheelDiameterCm, weightKg, costEstimate, wheelTypes,
} from "../spinning-wheel-calc.js";

describe("ratioRange", () => {
  it("charkha has highest max ratio", () => {
    expect(ratioRange("charkha").max).toBeGreaterThan(ratioRange("saxony").max);
  });
});

describe("twistPerCm", () => {
  it("higher ratio = more twist", () => {
    expect(twistPerCm(20, 60)).toBeGreaterThan(twistPerCm(10, 60));
  });
  it("zero speed returns 0", () => {
    expect(twistPerCm(10, 0)).toBe(0);
  });
});

describe("bobbinCapacityG", () => {
  it("electric has largest bobbin", () => {
    expect(bobbinCapacityG("electric")).toBeGreaterThan(bobbinCapacityG("charkha"));
  });
});

describe("driveType", () => {
  it("charkha uses direct drive", () => {
    expect(driveType("charkha")).toBe("direct_drive");
  });
});

describe("orificeSizeMm", () => {
  it("electric has largest orifice", () => {
    expect(orificeSizeMm("electric")).toBeGreaterThan(orificeSizeMm("charkha"));
  });
});

describe("treadleCount", () => {
  it("castle has 2 treadles", () => {
    expect(treadleCount("castle")).toBe(2);
  });
  it("electric has no treadles", () => {
    expect(treadleCount("electric")).toBe(0);
  });
});

describe("wheelDiameterCm", () => {
  it("walking wheel is largest", () => {
    expect(wheelDiameterCm("walking")).toBeGreaterThan(wheelDiameterCm("saxony"));
  });
});

describe("weightKg", () => {
  it("walking wheel is heaviest", () => {
    expect(weightKg("walking")).toBeGreaterThan(weightKg("charkha"));
  });
});

describe("costEstimate", () => {
  it("electric is most expensive", () => {
    expect(costEstimate("electric")).toBeGreaterThan(costEstimate("charkha"));
  });
});

describe("wheelTypes", () => {
  it("returns 5 types", () => {
    expect(wheelTypes()).toHaveLength(5);
  });
});
