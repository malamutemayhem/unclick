import { describe, it, expect } from "vitest";
import {
  readabilityBody, screenOptimization, printQuality,
  versatility, characterWidth, hasSerifs,
  fixedWidth, bestUseCase, exampleFont, fontCategories,
} from "../font-category-calc.js";

describe("readabilityBody", () => {
  it("serif most readable in body text", () => {
    expect(readabilityBody("serif")).toBeGreaterThan(
      readabilityBody("display")
    );
  });
});

describe("screenOptimization", () => {
  it("sans serif best on screen", () => {
    expect(screenOptimization("sans_serif")).toBeGreaterThan(
      screenOptimization("handwriting")
    );
  });
});

describe("printQuality", () => {
  it("serif best print quality", () => {
    expect(printQuality("serif")).toBeGreaterThan(
      printQuality("monospace")
    );
  });
});

describe("versatility", () => {
  it("sans serif most versatile", () => {
    expect(versatility("sans_serif")).toBeGreaterThan(
      versatility("display")
    );
  });
});

describe("characterWidth", () => {
  it("monospace widest characters", () => {
    expect(characterWidth("monospace")).toBeGreaterThan(
      characterWidth("sans_serif")
    );
  });
});

describe("hasSerifs", () => {
  it("serif has serifs", () => {
    expect(hasSerifs("serif")).toBe(true);
  });
  it("sans serif does not", () => {
    expect(hasSerifs("sans_serif")).toBe(false);
  });
});

describe("fixedWidth", () => {
  it("monospace is fixed width", () => {
    expect(fixedWidth("monospace")).toBe(true);
  });
  it("serif is not", () => {
    expect(fixedWidth("serif")).toBe(false);
  });
});

describe("bestUseCase", () => {
  it("monospace for code", () => {
    expect(bestUseCase("monospace")).toBe("code_terminals");
  });
});

describe("exampleFont", () => {
  it("serif is times new roman", () => {
    expect(exampleFont("serif")).toBe("times_new_roman");
  });
});

describe("fontCategories", () => {
  it("returns 5 categories", () => {
    expect(fontCategories()).toHaveLength(5);
  });
});
