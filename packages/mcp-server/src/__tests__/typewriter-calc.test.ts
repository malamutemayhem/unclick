import { describe, it, expect } from "vitest";
import {
  charsPerLine, linesPerPage, wordsPerPage, ribbonLife,
  typingSpeed, pagesPerHour, plattenDiameter, keyForce,
  maintenanceInterval, erasureMethod, marginWidth, tabStops,
  collectibleValue, typewriterTypes,
} from "../typewriter-calc.js";

describe("charsPerLine", () => {
  it("positive chars", () => {
    expect(charsPerLine(25)).toBeGreaterThan(0);
  });
  it("wider carriage = more chars", () => {
    expect(charsPerLine(35)).toBeGreaterThan(charsPerLine(25));
  });
});

describe("linesPerPage", () => {
  it("positive lines", () => {
    expect(linesPerPage(28)).toBeGreaterThan(0);
  });
});

describe("wordsPerPage", () => {
  it("positive words", () => {
    expect(wordsPerPage(80, 60)).toBeGreaterThan(0);
  });
});

describe("ribbonLife", () => {
  it("fabric lasts longest", () => {
    expect(ribbonLife("fabric")).toBeGreaterThan(ribbonLife("carbon"));
  });
});

describe("typingSpeed", () => {
  it("60 wpm = 300 cpm", () => {
    expect(typingSpeed(60)).toBe(300);
  });
});

describe("pagesPerHour", () => {
  it("positive pages", () => {
    expect(pagesPerHour(60, 250)).toBeGreaterThan(0);
  });
  it("zero words per page returns 0", () => {
    expect(pagesPerHour(60, 0)).toBe(0);
  });
});

describe("plattenDiameter", () => {
  it("larger than carriage", () => {
    expect(plattenDiameter(30)).toBeGreaterThan(30);
  });
});

describe("keyForce", () => {
  it("electric lightest", () => {
    expect(keyForce("electric")).toBeLessThan(keyForce("manual"));
  });
});

describe("maintenanceInterval", () => {
  it("electric has different schedule", () => {
    expect(maintenanceInterval("electric")).toContain("6 months");
  });
});

describe("erasureMethod", () => {
  it("correctable uses lift-off tape", () => {
    expect(erasureMethod("correctable")).toContain("lift-off");
  });
});

describe("marginWidth", () => {
  it("positive cm", () => {
    expect(marginWidth(25, 20)).toBeGreaterThan(0);
  });
  it("centered margin", () => {
    expect(marginWidth(30, 20)).toBe(5);
  });
});

describe("tabStops", () => {
  it("positive count", () => {
    expect(tabStops(20)).toBeGreaterThan(0);
  });
});

describe("collectibleValue", () => {
  it("old typewriter has high value", () => {
    expect(collectibleValue("manual", 1930)).toContain("high");
  });
  it("recent has functional value", () => {
    expect(collectibleValue("electric", 2000)).toContain("functional");
  });
});

describe("typewriterTypes", () => {
  it("returns 5 types", () => {
    expect(typewriterTypes()).toHaveLength(5);
  });
});
