import { describe, it, expect } from "vitest";
import {
  colorDepth, tonalRange, fingerResist, dryingSpeed,
  paperCost, archivalGrade, resinCoated, surfaceFinish,
  bestPrint, photoPapers,
} from "../photo-paper-calc.js";

describe("colorDepth", () => {
  it("baryta warmtone deepest color", () => {
    expect(colorDepth("baryta_warmtone")).toBeGreaterThan(colorDepth("glossy_rc"));
  });
});

describe("tonalRange", () => {
  it("baryta warmtone widest tonal range", () => {
    expect(tonalRange("baryta_warmtone")).toBeGreaterThan(tonalRange("glossy_rc"));
  });
});

describe("fingerResist", () => {
  it("matte fiber best finger resistance", () => {
    expect(fingerResist("matte_fiber")).toBeGreaterThan(fingerResist("glossy_rc"));
  });
});

describe("dryingSpeed", () => {
  it("glossy rc fastest drying", () => {
    expect(dryingSpeed("glossy_rc")).toBeGreaterThan(dryingSpeed("baryta_warmtone"));
  });
});

describe("paperCost", () => {
  it("baryta warmtone most expensive", () => {
    expect(paperCost("baryta_warmtone")).toBeGreaterThan(paperCost("glossy_rc"));
  });
});

describe("archivalGrade", () => {
  it("matte fiber is archival grade", () => {
    expect(archivalGrade("matte_fiber")).toBe(true);
  });
  it("glossy rc is not", () => {
    expect(archivalGrade("glossy_rc")).toBe(false);
  });
});

describe("resinCoated", () => {
  it("glossy rc is resin coated", () => {
    expect(resinCoated("glossy_rc")).toBe(true);
  });
  it("matte fiber is not", () => {
    expect(resinCoated("matte_fiber")).toBe(false);
  });
});

describe("surfaceFinish", () => {
  it("baryta warmtone uses barium sulfate warm", () => {
    expect(surfaceFinish("baryta_warmtone")).toBe("barium_sulfate_warm");
  });
});

describe("bestPrint", () => {
  it("matte fiber for gallery exhibition fine", () => {
    expect(bestPrint("matte_fiber")).toBe("gallery_exhibition_fine");
  });
});

describe("photoPapers", () => {
  it("returns 5 types", () => {
    expect(photoPapers()).toHaveLength(5);
  });
});
