import { describe, it, expect } from "vitest";
import {
  marketValue, detailVisibility, surfaceQuality, collectibility,
  wearLevel, slabWorthy, investmentGrade, sheldonScale,
  typicalSource, coinGrades,
} from "../coin-grade-calc.js";

describe("marketValue", () => {
  it("uncirculated highest market value", () => {
    expect(marketValue("uncirculated")).toBeGreaterThan(marketValue("poor"));
  });
});

describe("detailVisibility", () => {
  it("uncirculated best detail", () => {
    expect(detailVisibility("uncirculated")).toBeGreaterThan(detailVisibility("good"));
  });
});

describe("surfaceQuality", () => {
  it("uncirculated best surface", () => {
    expect(surfaceQuality("uncirculated")).toBeGreaterThan(surfaceQuality("fine"));
  });
});

describe("collectibility", () => {
  it("uncirculated most collectible", () => {
    expect(collectibility("uncirculated")).toBeGreaterThan(collectibility("poor"));
  });
});

describe("wearLevel", () => {
  it("poor has most wear", () => {
    expect(wearLevel("poor")).toBeGreaterThan(wearLevel("uncirculated"));
  });
  it("uncirculated has zero wear", () => {
    expect(wearLevel("uncirculated")).toBe(0);
  });
});

describe("slabWorthy", () => {
  it("fine is slab worthy", () => {
    expect(slabWorthy("fine")).toBe(true);
  });
  it("poor is not slab worthy", () => {
    expect(slabWorthy("poor")).toBe(false);
  });
});

describe("investmentGrade", () => {
  it("uncirculated is investment grade", () => {
    expect(investmentGrade("uncirculated")).toBe(true);
  });
  it("good is not investment grade", () => {
    expect(investmentGrade("good")).toBe(false);
  });
});

describe("sheldonScale", () => {
  it("uncirculated is ms 60 to 70", () => {
    expect(sheldonScale("uncirculated")).toBe("ms_60_to_70");
  });
});

describe("typicalSource", () => {
  it("poor from metal detector finds", () => {
    expect(typicalSource("poor")).toBe("metal_detector_finds");
  });
});

describe("coinGrades", () => {
  it("returns 5 grades", () => {
    expect(coinGrades()).toHaveLength(5);
  });
});
