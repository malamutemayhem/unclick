import { describe, it, expect } from "vitest";
import {
  lengthMeters, widthMeters, familiesHoused,
  centralHearthCount, constructionWeeks, raisedFloor,
  carvingDetail, roofMaterial, lifespanYears, longhouseStyles,
} from "../longhouse-calc.js";

describe("lengthMeters", () => {
  it("dayak is longest", () => {
    expect(lengthMeters("dayak")).toBeGreaterThan(
      lengthMeters("celtic")
    );
  });
});

describe("widthMeters", () => {
  it("dayak is widest", () => {
    expect(widthMeters("dayak")).toBeGreaterThan(
      widthMeters("celtic")
    );
  });
});

describe("familiesHoused", () => {
  it("dayak houses most families", () => {
    expect(familiesHoused("dayak")).toBeGreaterThan(
      familiesHoused("iroquois")
    );
  });
});

describe("centralHearthCount", () => {
  it("iroquois has most hearths", () => {
    expect(centralHearthCount("iroquois")).toBeGreaterThan(
      centralHearthCount("viking")
    );
  });
});

describe("constructionWeeks", () => {
  it("dayak takes longest to build", () => {
    expect(constructionWeeks("dayak")).toBeGreaterThan(
      constructionWeeks("celtic")
    );
  });
});

describe("raisedFloor", () => {
  it("dayak has raised floor", () => {
    expect(raisedFloor("dayak")).toBe(true);
  });
  it("iroquois does not", () => {
    expect(raisedFloor("iroquois")).toBe(false);
  });
});

describe("carvingDetail", () => {
  it("maori wharenui has most carving", () => {
    expect(carvingDetail("maori_wharenui")).toBeGreaterThan(
      carvingDetail("celtic")
    );
  });
});

describe("roofMaterial", () => {
  it("iroquois uses bark sheets", () => {
    expect(roofMaterial("iroquois")).toBe("bark_sheets");
  });
});

describe("lifespanYears", () => {
  it("viking lasts longest", () => {
    expect(lifespanYears("viking")).toBeGreaterThan(
      lifespanYears("celtic")
    );
  });
});

describe("longhouseStyles", () => {
  it("returns 5 styles", () => {
    expect(longhouseStyles()).toHaveLength(5);
  });
});
