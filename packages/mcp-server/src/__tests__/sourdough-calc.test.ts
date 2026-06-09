import { describe, it, expect } from "vitest";
import {
  starterRatio, starterFeedAmount, levainAmount, hydration,
  totalDoughWeight, saltAmount, bulkFermentHours, proofHours,
  foldInterval, foldCount, ovenTempC, bakeMinutes,
  steamDuration, internalTemp, flourTypes,
} from "../sourdough-calc.js";

describe("starterRatio", () => {
  it("standard for 1:1", () => {
    expect(starterRatio(50, 50)).toBe("standard");
  });

  it("stiff for more flour", () => {
    expect(starterRatio(70, 50)).toBe("stiff");
  });
});

describe("starterFeedAmount", () => {
  it("equal flour and water", () => {
    const feed = starterFeedAmount(50);
    expect(feed.flour).toBe(50);
    expect(feed.water).toBe(50);
  });
});

describe("levainAmount", () => {
  it("20% default", () => {
    expect(levainAmount(500)).toBe(100);
  });
});

describe("hydration", () => {
  it("75% for 375g water to 500g flour", () => {
    expect(hydration(375, 500)).toBe(75);
  });
});

describe("totalDoughWeight", () => {
  it("sums all", () => {
    expect(totalDoughWeight(500, 350, 10, 100)).toBe(960);
  });
});

describe("saltAmount", () => {
  it("2% default", () => {
    expect(saltAmount(500)).toBe(10);
  });
});

describe("bulkFermentHours", () => {
  it("shorter when warm", () => {
    expect(bulkFermentHours(28)).toBeLessThan(bulkFermentHours(18));
  });
});

describe("proofHours", () => {
  it("12 for retard", () => {
    expect(proofHours(4, true)).toBe(12);
  });
});

describe("foldInterval", () => {
  it("30 min when warm", () => {
    expect(foldInterval(25)).toBe(30);
  });
});

describe("foldCount", () => {
  it("more for high hydration", () => {
    expect(foldCount(85)).toBeGreaterThan(foldCount(65));
  });
});

describe("ovenTempC", () => {
  it("positive temp", () => {
    expect(ovenTempC("bread")).toBeGreaterThan(200);
  });
});

describe("bakeMinutes", () => {
  it("longer for bigger loaf", () => {
    expect(bakeMinutes(900)).toBeGreaterThan(bakeMinutes(400));
  });
});

describe("steamDuration", () => {
  it("20 minutes", () => {
    expect(steamDuration()).toBe(20);
  });
});

describe("internalTemp", () => {
  it("96C", () => {
    expect(internalTemp()).toBe(96);
  });
});

describe("flourTypes", () => {
  it("returns 6 types", () => {
    expect(flourTypes()).toHaveLength(6);
  });
});
