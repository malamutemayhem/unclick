import { describe, it, expect } from "vitest";
import {
  bedCount, floorAreaM2, windowCountPerWard, chapelAreaM2,
  herbGardenAreaM2, staffCount, hearthCount, waterSupplyLitersPerDay,
  isolationRoomCount, constructionCost, infirmaryWards,
} from "../infirmary-calc.js";

describe("bedCount", () => {
  it("at least 4", () => {
    expect(bedCount(10)).toBe(4);
  });
  it("scales with monks", () => {
    expect(bedCount(60)).toBeGreaterThan(bedCount(20));
  });
});

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(8)).toBeGreaterThan(15);
  });
});

describe("windowCountPerWard", () => {
  it("at least 2", () => {
    expect(windowCountPerWard(2)).toBe(2);
  });
});

describe("chapelAreaM2", () => {
  it("15% of floor area", () => {
    expect(chapelAreaM2(100)).toBe(15);
  });
});

describe("herbGardenAreaM2", () => {
  it("positive area", () => {
    expect(herbGardenAreaM2(8)).toBeGreaterThan(0);
  });
});

describe("staffCount", () => {
  it("at least 2", () => {
    expect(staffCount(4)).toBe(2);
  });
});

describe("hearthCount", () => {
  it("at least 1", () => {
    expect(hearthCount(20)).toBe(1);
  });
});

describe("waterSupplyLitersPerDay", () => {
  it("positive supply", () => {
    expect(waterSupplyLitersPerDay(8)).toBeGreaterThan(0);
  });
});

describe("isolationRoomCount", () => {
  it("at least 1", () => {
    expect(isolationRoomCount(4)).toBe(1);
  });
});

describe("constructionCost", () => {
  it("surgical most expensive", () => {
    expect(constructionCost(100, "surgical", 500)).toBeGreaterThan(
      constructionCost(100, "general", 500)
    );
  });
});

describe("infirmaryWards", () => {
  it("returns 5 wards", () => {
    expect(infirmaryWards()).toHaveLength(5);
  });
});
