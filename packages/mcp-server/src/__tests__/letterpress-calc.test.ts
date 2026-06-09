import { describe, it, expect } from "vitest";
import {
  chaseArea, typeArea, linesPerPage, charsPerLine,
  leadingFromFontSize, sortCount, inkCoverage, inkAmount,
  paperNeeded, impressionTime, makereadyTime, registrationMarks,
  pressurePsi, costPerPrint, typefaceCategories,
} from "../letterpress-calc.js";

describe("chaseArea", () => {
  it("width x height", () => {
    expect(chaseArea(6, 9)).toBe(54);
  });
});

describe("typeArea", () => {
  it("smaller than chase", () => {
    expect(typeArea(6, 9)).toBeLessThan(chaseArea(6, 9));
  });
});

describe("linesPerPage", () => {
  it("positive count", () => {
    expect(linesPerPage(7, 14)).toBeGreaterThan(20);
  });
});

describe("charsPerLine", () => {
  it("more for smaller font", () => {
    expect(charsPerLine(4, 10)).toBeGreaterThan(charsPerLine(4, 18));
  });
});

describe("leadingFromFontSize", () => {
  it("1.2x default", () => {
    expect(leadingFromFontSize(12)).toBe(14.4);
  });
});

describe("sortCount", () => {
  it("counts characters", () => {
    const counts = sortCount("hello");
    expect(counts.get("l")).toBe(2);
    expect(counts.get("h")).toBe(1);
  });
});

describe("inkCoverage", () => {
  it("15% default", () => {
    expect(inkCoverage(28)).toBeCloseTo(4.2, 0);
  });
});

describe("inkAmount", () => {
  it("scales with impressions", () => {
    expect(inkAmount(4, 200)).toBeGreaterThan(inkAmount(4, 100));
  });
});

describe("paperNeeded", () => {
  it("adds waste", () => {
    expect(paperNeeded(100)).toBeGreaterThan(100);
  });
});

describe("impressionTime", () => {
  it("positive hours", () => {
    expect(impressionTime(400)).toBe(2);
  });
});

describe("makereadyTime", () => {
  it("30 min per color", () => {
    expect(makereadyTime(2)).toBe(60);
  });
});

describe("registrationMarks", () => {
  it("3 for multi-color", () => {
    expect(registrationMarks(2)).toBe(3);
  });

  it("0 for single color", () => {
    expect(registrationMarks(1)).toBe(0);
  });
});

describe("pressurePsi", () => {
  it("higher for hard paper", () => {
    expect(pressurePsi(12, "hard")).toBeGreaterThan(pressurePsi(12, "soft"));
  });
});

describe("costPerPrint", () => {
  it("positive cost", () => {
    expect(costPerPrint(20, 5, 2, 25, 100)).toBeGreaterThan(0);
  });

  it("0 for no copies", () => {
    expect(costPerPrint(20, 5, 2, 25, 0)).toBe(0);
  });
});

describe("typefaceCategories", () => {
  it("returns 5 categories", () => {
    expect(typefaceCategories()).toHaveLength(5);
  });
});
