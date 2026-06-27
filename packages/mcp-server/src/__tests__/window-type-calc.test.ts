import { describe, it, expect } from "vitest";
import {
  ventilationArea, weatherSeal, viewClarity,
  easeOfOperation, securityRating, opensOutward,
  allowsScreens, bestRoom, costMultiplier, windowTypes,
} from "../window-type-calc.js";

describe("ventilationArea", () => {
  it("casement ventilates most", () => {
    expect(ventilationArea("casement")).toBeGreaterThan(
      ventilationArea("fixed")
    );
  });
});

describe("weatherSeal", () => {
  it("fixed has best seal", () => {
    expect(weatherSeal("fixed")).toBeGreaterThan(
      weatherSeal("sliding")
    );
  });
});

describe("viewClarity", () => {
  it("fixed has clearest view", () => {
    expect(viewClarity("fixed")).toBeGreaterThan(
      viewClarity("double_hung")
    );
  });
});

describe("easeOfOperation", () => {
  it("fixed is easiest (no operation needed)", () => {
    expect(easeOfOperation("fixed")).toBeGreaterThan(
      easeOfOperation("double_hung")
    );
  });
});

describe("securityRating", () => {
  it("fixed is most secure", () => {
    expect(securityRating("fixed")).toBeGreaterThan(
      securityRating("sliding")
    );
  });
});

describe("opensOutward", () => {
  it("casement opens outward", () => {
    expect(opensOutward("casement")).toBe(true);
  });
  it("sliding does not", () => {
    expect(opensOutward("sliding")).toBe(false);
  });
});

describe("allowsScreens", () => {
  it("double hung allows screens", () => {
    expect(allowsScreens("double_hung")).toBe(true);
  });
  it("casement does not", () => {
    expect(allowsScreens("casement")).toBe(false);
  });
});

describe("bestRoom", () => {
  it("awning for bathroom", () => {
    expect(bestRoom("awning")).toBe("bathroom");
  });
});

describe("costMultiplier", () => {
  it("casement costs more than fixed", () => {
    expect(costMultiplier("casement")).toBeGreaterThan(
      costMultiplier("fixed")
    );
  });
});

describe("windowTypes", () => {
  it("returns 5 types", () => {
    expect(windowTypes()).toHaveLength(5);
  });
});
