import { describe, it, expect } from "vitest";
import {
  screenClarity, printQuality, developmentEffort, smallSizeRendering,
  crossPlatformConsistency, platformSpecific, manualInstructionsBased,
  renderingEngine, bestPlatform, glyphHintingMethods,
} from "../glyph-hinting-calc.js";

describe("screenClarity", () => {
  it("cleartype best screen clarity", () => {
    expect(screenClarity("cleartype")).toBeGreaterThan(screenClarity("none"));
  });
});

describe("printQuality", () => {
  it("postscript best print quality", () => {
    expect(printQuality("postscript")).toBeGreaterThan(printQuality("cleartype"));
  });
});

describe("developmentEffort", () => {
  it("truetype most effort", () => {
    expect(developmentEffort("truetype")).toBeGreaterThan(developmentEffort("none"));
  });
});

describe("smallSizeRendering", () => {
  it("cleartype best small size", () => {
    expect(smallSizeRendering("cleartype")).toBeGreaterThan(smallSizeRendering("none"));
  });
});

describe("crossPlatformConsistency", () => {
  it("none most consistent cross platform", () => {
    expect(crossPlatformConsistency("none")).toBeGreaterThan(crossPlatformConsistency("cleartype"));
  });
});

describe("platformSpecific", () => {
  it("cleartype is platform specific", () => {
    expect(platformSpecific("cleartype")).toBe(true);
  });
  it("truetype is not", () => {
    expect(platformSpecific("truetype")).toBe(false);
  });
});

describe("manualInstructionsBased", () => {
  it("truetype is manual instructions based", () => {
    expect(manualInstructionsBased("truetype")).toBe(true);
  });
  it("autohint is not", () => {
    expect(manualInstructionsBased("autohint")).toBe(false);
  });
});

describe("renderingEngine", () => {
  it("cleartype uses subpixel rgb", () => {
    expect(renderingEngine("cleartype")).toBe("subpixel_rgb");
  });
});

describe("bestPlatform", () => {
  it("autohint for linux freetype", () => {
    expect(bestPlatform("autohint")).toBe("linux_freetype");
  });
});

describe("glyphHintingMethods", () => {
  it("returns 5 methods", () => {
    expect(glyphHintingMethods()).toHaveLength(5);
  });
});
