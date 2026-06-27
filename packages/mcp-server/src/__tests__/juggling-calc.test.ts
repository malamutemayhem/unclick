import { describe, it, expect } from "vitest";
import {
  siteswapAverage, objectCount, throwHeight, beatsPerSecond,
  dwellRatio, catchesPerMinute, practiceMinutes, propWeight,
  recommendedSize, spacingM, heightNeededM, difficultyRating, propTypes,
} from "../juggling-calc.js";

describe("siteswapAverage", () => {
  it("cascade 3 averages to 3", () => {
    expect(siteswapAverage([3])).toBe(3);
  });
  it("empty returns 0", () => {
    expect(siteswapAverage([])).toBe(0);
  });
  it("441 averages to 3", () => {
    expect(siteswapAverage([4, 4, 1])).toBe(3);
  });
});

describe("objectCount", () => {
  it("531 = 3 objects", () => {
    expect(objectCount([5, 3, 1])).toBe(3);
  });
  it("empty = 0", () => {
    expect(objectCount([])).toBe(0);
  });
});

describe("throwHeight", () => {
  it("positive cm", () => {
    expect(throwHeight(0.2, 5)).toBeGreaterThan(0);
  });
});

describe("beatsPerSecond", () => {
  it("120 bpm = 2 bps", () => {
    expect(beatsPerSecond(120)).toBe(2);
  });
});

describe("dwellRatio", () => {
  it("positive percent", () => {
    expect(dwellRatio(2, 3)).toBeGreaterThan(0);
  });
});

describe("catchesPerMinute", () => {
  it("positive count", () => {
    expect(catchesPerMinute(3, 120)).toBeGreaterThan(0);
  });
});

describe("practiceMinutes", () => {
  it("harder = more practice", () => {
    expect(practiceMinutes(5)).toBeGreaterThan(practiceMinutes(1));
  });
});

describe("propWeight", () => {
  it("club heavier than ring", () => {
    expect(propWeight("club")).toBeGreaterThan(propWeight("ring"));
  });
});

describe("recommendedSize", () => {
  it("returns string", () => {
    expect(typeof recommendedSize("ball", 18)).toBe("string");
  });
  it("small hand gets smaller ball", () => {
    expect(recommendedSize("ball", 15)).toBe("65mm");
  });
});

describe("spacingM", () => {
  it("more objects need more space", () => {
    expect(spacingM(7)).toBeGreaterThan(spacingM(3));
  });
});

describe("heightNeededM", () => {
  it("more objects need more height", () => {
    expect(heightNeededM(7)).toBeGreaterThan(heightNeededM(3));
  });
});

describe("difficultyRating", () => {
  it("mills mess harder than cascade", () => {
    expect(difficultyRating(3, "mills_mess")).toBeGreaterThan(difficultyRating(3, "cascade"));
  });
});

describe("propTypes", () => {
  it("returns 6 types", () => {
    expect(propTypes()).toHaveLength(6);
  });
});
