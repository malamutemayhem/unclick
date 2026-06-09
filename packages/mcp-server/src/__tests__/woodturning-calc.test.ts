import { describe, it, expect } from "vitest";
import {
  blankDiameter, blankLength, blankVolumeCm3, blankWeight,
  jankaHardness, spindleSpeed, faceplateSize, gougeSize,
  sandingGrits, sandingTime, finishCoats, dryingTimeHours,
  bowlWallThickness, wastePercent, projectTime, toolSharpening,
  woodTypes,
} from "../woodturning-calc.js";

describe("blankDiameter", () => {
  it("15% larger than finished", () => {
    expect(blankDiameter(20)).toBeCloseTo(23, 0);
  });
});

describe("blankLength", () => {
  it("adds 5cm", () => {
    expect(blankLength(20)).toBe(25);
  });
});

describe("blankVolumeCm3", () => {
  it("positive volume", () => {
    expect(blankVolumeCm3(10, 20)).toBeGreaterThan(0);
  });
});

describe("blankWeight", () => {
  it("oak heavier than pine", () => {
    expect(blankWeight(1000, "oak")).toBeGreaterThan(blankWeight(1000, "pine"));
  });
});

describe("jankaHardness", () => {
  it("maple is hard", () => {
    expect(jankaHardness("maple")).toBeGreaterThan(1000);
  });

  it("pine is soft", () => {
    expect(jankaHardness("pine")).toBeLessThan(500);
  });
});

describe("spindleSpeed", () => {
  it("smaller = faster", () => {
    expect(spindleSpeed(5).max).toBeGreaterThan(spindleSpeed(20).max);
  });
});

describe("faceplateSize", () => {
  it("returns standard size", () => {
    const sizes = [7.5, 10, 12.5, 15, 20, 25];
    expect(sizes).toContain(faceplateSize(25));
  });
});

describe("gougeSize", () => {
  it("larger for bigger work", () => {
    expect(gougeSize(30)).toBeGreaterThan(gougeSize(10));
  });
});

describe("sandingGrits", () => {
  it("6 grits ascending", () => {
    const grits = sandingGrits();
    expect(grits).toHaveLength(6);
    for (let i = 1; i < grits.length; i++) {
      expect(grits[i]).toBeGreaterThan(grits[i - 1]);
    }
  });
});

describe("sandingTime", () => {
  it("more area = more time", () => {
    expect(sandingTime(500)).toBeGreaterThan(sandingTime(100));
  });
});

describe("finishCoats", () => {
  it("lacquer needs most", () => {
    expect(finishCoats("lacquer")).toBeGreaterThanOrEqual(finishCoats("oil"));
  });
});

describe("dryingTimeHours", () => {
  it("oil takes longest", () => {
    expect(dryingTimeHours("oil")).toBeGreaterThan(dryingTimeHours("wax"));
  });
});

describe("bowlWallThickness", () => {
  it("thicker for larger bowls", () => {
    expect(bowlWallThickness(30)).toBeGreaterThanOrEqual(bowlWallThickness(10));
  });
});

describe("wastePercent", () => {
  it("platter wastes most", () => {
    expect(wastePercent("platter")).toBeGreaterThan(wastePercent("pen"));
  });
});

describe("projectTime", () => {
  it("scales with diameter", () => {
    expect(projectTime("bowl", 30)).toBeGreaterThan(projectTime("bowl", 15));
  });
});

describe("toolSharpening", () => {
  it("frequent for long sessions", () => {
    expect(toolSharpening(5)).toBeGreaterThan(toolSharpening(1));
  });
});

describe("woodTypes", () => {
  it("returns 8 types", () => {
    expect(woodTypes()).toHaveLength(8);
    expect(woodTypes()).toContain("walnut");
  });
});
