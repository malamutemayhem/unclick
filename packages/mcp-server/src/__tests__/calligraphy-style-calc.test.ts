import { describe, it, expect } from "vitest";
import {
  brushStrokes, learningYears, toolVariety,
  expressiveness, meditativeValue, rightToLeft,
  usesBrush, primaryInk, culturalSignificance, calligraphyStyles,
} from "../calligraphy-style-calc.js";

describe("brushStrokes", () => {
  it("chinese has most brush strokes", () => {
    expect(brushStrokes("chinese")).toBeGreaterThan(
      brushStrokes("western_italic")
    );
  });
});

describe("learningYears", () => {
  it("chinese takes longest to learn", () => {
    expect(learningYears("chinese")).toBeGreaterThan(
      learningYears("western_italic")
    );
  });
});

describe("toolVariety", () => {
  it("chinese has most tool variety", () => {
    expect(toolVariety("chinese")).toBeGreaterThan(
      toolVariety("western_italic")
    );
  });
});

describe("expressiveness", () => {
  it("chinese and japanese are most expressive", () => {
    expect(expressiveness("chinese")).toBeGreaterThan(
      expressiveness("western_italic")
    );
  });
});

describe("meditativeValue", () => {
  it("japanese has high meditative value", () => {
    expect(meditativeValue("japanese")).toBeGreaterThan(
      meditativeValue("western_italic")
    );
  });
});

describe("rightToLeft", () => {
  it("arabic is right to left", () => {
    expect(rightToLeft("arabic")).toBe(true);
  });
  it("chinese is not right to left", () => {
    expect(rightToLeft("chinese")).toBe(false);
  });
});

describe("usesBrush", () => {
  it("chinese uses brush", () => {
    expect(usesBrush("chinese")).toBe(true);
  });
  it("arabic does not use brush", () => {
    expect(usesBrush("arabic")).toBe(false);
  });
});

describe("primaryInk", () => {
  it("chinese uses sumi ink", () => {
    expect(primaryInk("chinese")).toBe("sumi_ink");
  });
});

describe("culturalSignificance", () => {
  it("chinese has highest cultural significance", () => {
    expect(culturalSignificance("chinese")).toBeGreaterThan(
      culturalSignificance("western_italic")
    );
  });
});

describe("calligraphyStyles", () => {
  it("returns 5 types", () => {
    expect(calligraphyStyles()).toHaveLength(5);
  });
});
