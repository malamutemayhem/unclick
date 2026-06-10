import { describe, it, expect } from "vitest";
import {
  pasteViscosity, patternRepeatability, colorLayersMax,
  dryingTimeHours, textureDepth, toolRequired,
  uniquenessPerSheet, beginnerFriendly, costPerSheet, pastePaperTechniques,
} from "../paste-paper-calc.js";

describe("pasteViscosity", () => {
  it("combed needs thickest paste", () => {
    expect(pasteViscosity("combed")).toBeGreaterThan(
      pasteViscosity("rolled")
    );
  });
});

describe("patternRepeatability", () => {
  it("stamped is most repeatable", () => {
    expect(patternRepeatability("stamped")).toBeGreaterThan(
      patternRepeatability("pulled")
    );
  });
});

describe("colorLayersMax", () => {
  it("sponged allows most layers", () => {
    expect(colorLayersMax("sponged")).toBeGreaterThan(
      colorLayersMax("combed")
    );
  });
});

describe("dryingTimeHours", () => {
  it("sponged takes longest to dry", () => {
    expect(dryingTimeHours("sponged")).toBeGreaterThan(
      dryingTimeHours("rolled")
    );
  });
});

describe("textureDepth", () => {
  it("combed has deepest texture", () => {
    expect(textureDepth("combed")).toBeGreaterThan(
      textureDepth("rolled")
    );
  });
});

describe("toolRequired", () => {
  it("combed uses comb", () => {
    expect(toolRequired("combed")).toBe("comb");
  });
});

describe("uniquenessPerSheet", () => {
  it("pulled is most unique", () => {
    expect(uniquenessPerSheet("pulled")).toBeGreaterThan(
      uniquenessPerSheet("stamped")
    );
  });
});

describe("beginnerFriendly", () => {
  it("sponged is most beginner friendly", () => {
    expect(beginnerFriendly("sponged")).toBeGreaterThan(
      beginnerFriendly("stamped")
    );
  });
});

describe("costPerSheet", () => {
  it("stamped is most expensive", () => {
    expect(costPerSheet("stamped")).toBeGreaterThan(
      costPerSheet("sponged")
    );
  });
});

describe("pastePaperTechniques", () => {
  it("returns 5 techniques", () => {
    expect(pastePaperTechniques()).toHaveLength(5);
  });
});
