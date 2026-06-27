import { describe, it, expect } from "vitest";
import {
  flightNumbers, maxDistance, discSelection, hyzerAngle,
  anhyzerAngle, skipDistance, windEffect, puttingCircle,
  parEstimate, courseRating, plasticDurability, bagCapacity,
  costPerRound, discTypes,
} from "../disc-golf.js";

describe("flightNumbers", () => {
  it("formatted string", () => {
    expect(flightNumbers(12, 5, -1, 3)).toBe("12/5/-1/3");
  });
});

describe("maxDistance", () => {
  it("positive feet", () => {
    expect(maxDistance(60, 12)).toBeGreaterThan(0);
  });
});

describe("discSelection", () => {
  it("putter for short", () => {
    expect(discSelection(50)).toBe("putter");
  });

  it("distance driver for long", () => {
    expect(discSelection(400)).toBe("distance_driver");
  });
});

describe("hyzerAngle", () => {
  it("scales with fade", () => {
    expect(hyzerAngle(3)).toBe(15);
  });
});

describe("anhyzerAngle", () => {
  it("scales with turn", () => {
    expect(anhyzerAngle(-2)).toBe(16);
  });
});

describe("skipDistance", () => {
  it("more on hard ground", () => {
    expect(skipDistance(40, "hard")).toBeGreaterThan(skipDistance(40, "soft"));
  });
});

describe("windEffect", () => {
  it("headwind overstable", () => {
    expect(windEffect(15, "headwind")).toContain("overstable");
  });
});

describe("puttingCircle", () => {
  it("10 meters", () => {
    expect(puttingCircle()).toBe(10);
  });
});

describe("parEstimate", () => {
  it("par 3 for short", () => {
    expect(parEstimate(200)).toBe(3);
  });
});

describe("courseRating", () => {
  it("above 1 is over par", () => {
    expect(courseRating(54, 60)).toBeGreaterThan(1);
  });
});

describe("plasticDurability", () => {
  it("champion lasts longest", () => {
    expect(plasticDurability("champion")).toBeGreaterThan(plasticDurability("base"));
  });
});

describe("bagCapacity", () => {
  it("starter for few discs", () => {
    expect(bagCapacity(5)).toBe("starter bag");
  });
});

describe("costPerRound", () => {
  it("positive cost", () => {
    expect(costPerRound(200, 50)).toBeGreaterThan(0);
  });

  it("0 for no rounds", () => {
    expect(costPerRound(200, 0)).toBe(0);
  });
});

describe("discTypes", () => {
  it("returns 4 types", () => {
    expect(discTypes()).toHaveLength(4);
  });
});
