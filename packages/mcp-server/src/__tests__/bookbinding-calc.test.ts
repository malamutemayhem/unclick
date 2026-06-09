import { describe, it, expect } from "vitest";
import {
  paperDimensions, sheetsToPages, pagesToSheets, signatures,
  spineThickness, boardThickness, coverSize, clothNeeded,
  threadLength, glueAmount, endpapersNeeded, sewingStations,
  pressTime, dryingTime, costEstimate, bindingStyles,
} from "../bookbinding-calc.js";

describe("paperDimensions", () => {
  it("A4 is 210x297mm", () => {
    expect(paperDimensions("A4")).toEqual({ widthMm: 210, heightMm: 297 });
  });
});

describe("sheetsToPages", () => {
  it("doubles sheets", () => {
    expect(sheetsToPages(50)).toBe(100);
  });
});

describe("pagesToSheets", () => {
  it("halves pages", () => {
    expect(pagesToSheets(100)).toBe(50);
  });

  it("rounds up odd pages", () => {
    expect(pagesToSheets(101)).toBe(51);
  });
});

describe("signatures", () => {
  it("groups sheets", () => {
    expect(signatures(20, 4)).toBe(5);
  });

  it("rounds up", () => {
    expect(signatures(21, 4)).toBe(6);
  });
});

describe("spineThickness", () => {
  it("thicker with more sheets", () => {
    expect(spineThickness(100, 80)).toBeGreaterThan(spineThickness(50, 80));
  });
});

describe("boardThickness", () => {
  it("thicker for thicker spines", () => {
    expect(boardThickness(20)).toBeGreaterThan(boardThickness(3));
  });
});

describe("coverSize", () => {
  it("adds overhang", () => {
    const cover = coverSize(148, 210, 10);
    expect(cover.width).toBeGreaterThan(148);
    expect(cover.height).toBeGreaterThan(210);
  });
});

describe("clothNeeded", () => {
  it("larger than cover", () => {
    const cloth = clothNeeded(160, 220);
    expect(cloth.widthMm).toBeGreaterThan(320);
    expect(cloth.heightMm).toBeGreaterThan(220);
  });
});

describe("threadLength", () => {
  it("positive meters", () => {
    expect(threadLength(5, 210)).toBeGreaterThan(0);
  });
});

describe("glueAmount", () => {
  it("positive ml", () => {
    expect(glueAmount(5000)).toBeGreaterThan(0);
  });
});

describe("endpapersNeeded", () => {
  it("4 for case binding", () => {
    expect(endpapersNeeded("case")).toBe(4);
  });

  it("0 for saddle stitch", () => {
    expect(endpapersNeeded("saddle_stitch")).toBe(0);
  });
});

describe("sewingStations", () => {
  it("more for taller books", () => {
    expect(sewingStations(300)).toBeGreaterThan(sewingStations(100));
  });
});

describe("pressTime", () => {
  it("24h for case binding", () => {
    expect(pressTime("case")).toBe(24);
  });

  it("0 for coptic", () => {
    expect(pressTime("coptic")).toBe(0);
  });
});

describe("dryingTime", () => {
  it("case takes longest", () => {
    expect(dryingTime("case")).toBeGreaterThan(dryingTime("perfect"));
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(50, 0.1, 5)).toBeGreaterThan(0);
  });
});

describe("bindingStyles", () => {
  it("returns 6 styles", () => {
    expect(bindingStyles()).toHaveLength(6);
    expect(bindingStyles()).toContain("coptic");
  });
});
