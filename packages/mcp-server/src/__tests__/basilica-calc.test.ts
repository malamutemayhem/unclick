import { describe, it, expect } from "vitest";
import {
  naveLength, aisleWidth, columnCount, domeDiameter,
  domeHeight, apseRadius, clerestoryWindows, floorAreaM2,
  seatingCapacity, planTypes,
} from "../basilica-calc.js";

describe("naveLength", () => {
  it("total minus chancel minus narthex", () => {
    expect(naveLength(100, 20, 10)).toBe(70);
  });
});

describe("aisleWidth", () => {
  it("ratio of nave", () => {
    expect(aisleWidth(10, 0.5)).toBe(5);
  });
});

describe("columnCount", () => {
  it("positive count", () => {
    expect(columnCount(60, 5, 2)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(columnCount(60, 0, 2)).toBe(0);
  });
});

describe("domeDiameter", () => {
  it("95% of crossing", () => {
    expect(domeDiameter(20)).toBe(19);
  });
});

describe("domeHeight", () => {
  it("half of diameter", () => {
    expect(domeHeight(20)).toBe(10);
  });
});

describe("apseRadius", () => {
  it("half of chancel width", () => {
    expect(apseRadius(12)).toBe(6);
  });
});

describe("clerestoryWindows", () => {
  it("positive count", () => {
    expect(clerestoryWindows(60, 5)).toBeGreaterThan(0);
  });
});

describe("floorAreaM2", () => {
  it("rotunda = circle", () => {
    expect(floorAreaM2("rotunda", 30, 30)).toBeGreaterThan(0);
  });
  it("positive for latin cross", () => {
    expect(floorAreaM2("latin_cross", 80, 30)).toBeGreaterThan(0);
  });
});

describe("seatingCapacity", () => {
  it("positive people", () => {
    expect(seatingCapacity(500)).toBeGreaterThan(0);
  });
});

describe("planTypes", () => {
  it("returns 5 types", () => {
    expect(planTypes()).toHaveLength(5);
  });
});
