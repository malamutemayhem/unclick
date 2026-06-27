import { describe, it, expect } from "vitest";
import {
  heightM, baseWidthM, platformCount, crewCapacity,
  timberVolumeM3, wheelCount, totalWeightKg, pushCrewNeeded,
  constructionDays, fireResistance, siegeTowerCovers,
} from "../siege-tower-calc.js";

describe("heightM", () => {
  it("wall height plus 2", () => {
    expect(heightM(10)).toBe(12);
  });
});

describe("baseWidthM", () => {
  it("35% of height", () => {
    expect(baseWidthM(12)).toBe(4.2);
  });
});

describe("platformCount", () => {
  it("at least 2", () => {
    expect(platformCount(5)).toBe(2);
  });
  it("more for taller towers", () => {
    expect(platformCount(15)).toBeGreaterThan(platformCount(5));
  });
});

describe("crewCapacity", () => {
  it("8 per platform", () => {
    expect(crewCapacity(4)).toBe(32);
  });
});

describe("timberVolumeM3", () => {
  it("positive volume", () => {
    expect(timberVolumeM3(12, 4.2)).toBeGreaterThan(0);
  });
});

describe("wheelCount", () => {
  it("6 for wide base", () => {
    expect(wheelCount(5)).toBe(6);
  });
  it("4 for narrow base", () => {
    expect(wheelCount(3)).toBe(4);
  });
});

describe("totalWeightKg", () => {
  it("iron plate heaviest", () => {
    expect(totalWeightKg(10, "iron_plate")).toBeGreaterThan(totalWeightKg(10, "wet_cloth"));
  });
});

describe("pushCrewNeeded", () => {
  it("at least 10", () => {
    expect(pushCrewNeeded(500)).toBe(10);
  });
});

describe("constructionDays", () => {
  it("at least 3", () => {
    expect(constructionDays(1)).toBe(3);
  });
});

describe("fireResistance", () => {
  it("iron plate best", () => {
    expect(fireResistance("iron_plate")).toBeGreaterThan(fireResistance("timber"));
  });
});

describe("siegeTowerCovers", () => {
  it("returns 5 covers", () => {
    expect(siegeTowerCovers()).toHaveLength(5);
  });
});
