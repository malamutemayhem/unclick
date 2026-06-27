import { describe, it, expect } from "vitest";
import {
  verticalRhythm, layoutFlexibility, complexityLevel, designConsistency,
  learningCurve, responsiveFriendly, suitableForBeginners, primaryApplication,
  originEra, typographicGrids,
} from "../typographic-grid-calc.js";

describe("verticalRhythm", () => {
  it("baseline best vertical rhythm", () => {
    expect(verticalRhythm("baseline")).toBeGreaterThan(verticalRhythm("column"));
  });
});

describe("layoutFlexibility", () => {
  it("modular most flexible", () => {
    expect(layoutFlexibility("modular")).toBeGreaterThan(layoutFlexibility("manuscript"));
  });
});

describe("complexityLevel", () => {
  it("modular most complex", () => {
    expect(complexityLevel("modular")).toBeGreaterThan(complexityLevel("manuscript"));
  });
});

describe("designConsistency", () => {
  it("modular most consistent", () => {
    expect(designConsistency("modular")).toBeGreaterThan(designConsistency("hierarchical"));
  });
});

describe("learningCurve", () => {
  it("modular steepest learning curve", () => {
    expect(learningCurve("modular")).toBeGreaterThan(learningCurve("manuscript"));
  });
});

describe("responsiveFriendly", () => {
  it("column is responsive friendly", () => {
    expect(responsiveFriendly("column")).toBe(true);
  });
  it("manuscript is not", () => {
    expect(responsiveFriendly("manuscript")).toBe(false);
  });
});

describe("suitableForBeginners", () => {
  it("manuscript suitable for beginners", () => {
    expect(suitableForBeginners("manuscript")).toBe(true);
  });
  it("modular not suitable", () => {
    expect(suitableForBeginners("modular")).toBe(false);
  });
});

describe("primaryApplication", () => {
  it("modular for magazine editorial", () => {
    expect(primaryApplication("modular")).toBe("magazine_editorial");
  });
});

describe("originEra", () => {
  it("modular from swiss international", () => {
    expect(originEra("modular")).toBe("swiss_international");
  });
});

describe("typographicGrids", () => {
  it("returns 5 grids", () => {
    expect(typographicGrids()).toHaveLength(5);
  });
});
