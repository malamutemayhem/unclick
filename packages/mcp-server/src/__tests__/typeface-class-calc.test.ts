import { describe, it, expect } from "vitest";
import {
  readability, screenLegibility, formalityLevel,
  versatility, characterWidth, fixedWidth,
  decorative, bestApplication, exampleFont, typefaceClasses,
} from "../typeface-class-calc.js";

describe("readability", () => {
  it("serif is most readable", () => {
    expect(readability("serif")).toBeGreaterThan(
      readability("display")
    );
  });
});

describe("screenLegibility", () => {
  it("sans serif is most screen legible", () => {
    expect(screenLegibility("sans_serif")).toBeGreaterThan(
      screenLegibility("script")
    );
  });
});

describe("formalityLevel", () => {
  it("script is most formal", () => {
    expect(formalityLevel("script")).toBeGreaterThan(
      formalityLevel("display")
    );
  });
});

describe("versatility", () => {
  it("sans serif is most versatile", () => {
    expect(versatility("sans_serif")).toBeGreaterThan(
      versatility("script")
    );
  });
});

describe("characterWidth", () => {
  it("monospace has widest characters", () => {
    expect(characterWidth("monospace")).toBeGreaterThan(
      characterWidth("sans_serif")
    );
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

describe("decorative", () => {
  it("display is decorative", () => {
    expect(decorative("display")).toBe(true);
  });
  it("sans serif is not", () => {
    expect(decorative("sans_serif")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("monospace for code", () => {
    expect(bestApplication("monospace")).toBe("code");
  });
});

describe("exampleFont", () => {
  it("serif example is times new roman", () => {
    expect(exampleFont("serif")).toBe("times_new_roman");
  });
});

describe("typefaceClasses", () => {
  it("returns 5 types", () => {
    expect(typefaceClasses()).toHaveLength(5);
  });
});
