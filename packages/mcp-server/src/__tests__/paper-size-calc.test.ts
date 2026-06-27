import { describe, it, expect } from "vitest";
import {
  widthMm, heightMm, areaSqCm,
  globalUsage, printerCompatibility, isoStandard,
  standardDesktop, primaryRegion, commonUse, paperSizes,
} from "../paper-size-calc.js";

describe("widthMm", () => {
  it("a3 widest", () => {
    expect(widthMm("a3")).toBeGreaterThan(
      widthMm("a4")
    );
  });
});

describe("heightMm", () => {
  it("tabloid tallest", () => {
    expect(heightMm("tabloid")).toBeGreaterThan(
      heightMm("letter")
    );
  });
});

describe("areaSqCm", () => {
  it("a3 largest area", () => {
    expect(areaSqCm("a3")).toBeGreaterThan(
      areaSqCm("a4")
    );
  });
});

describe("globalUsage", () => {
  it("a4 most used globally", () => {
    expect(globalUsage("a4")).toBeGreaterThan(
      globalUsage("tabloid")
    );
  });
});

describe("printerCompatibility", () => {
  it("a4 high printer compatibility", () => {
    expect(printerCompatibility("a4")).toBeGreaterThan(
      printerCompatibility("tabloid")
    );
  });
});

describe("isoStandard", () => {
  it("a4 is iso standard", () => {
    expect(isoStandard("a4")).toBe(true);
  });
  it("letter is not", () => {
    expect(isoStandard("letter")).toBe(false);
  });
});

describe("standardDesktop", () => {
  it("letter fits desktop printers", () => {
    expect(standardDesktop("letter")).toBe(true);
  });
  it("tabloid does not", () => {
    expect(standardDesktop("tabloid")).toBe(false);
  });
});

describe("primaryRegion", () => {
  it("a4 is international", () => {
    expect(primaryRegion("a4")).toBe("international");
  });
});

describe("commonUse", () => {
  it("tabloid for newspapers", () => {
    expect(commonUse("tabloid")).toBe("newspapers_spreads");
  });
});

describe("paperSizes", () => {
  it("returns 5 sizes", () => {
    expect(paperSizes()).toHaveLength(5);
  });
});
