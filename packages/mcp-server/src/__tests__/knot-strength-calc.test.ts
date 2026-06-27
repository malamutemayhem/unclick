import { describe, it, expect } from "vitest";
import {
  strengthRetentionPercent, securityRating, easeOfUntying, tyingTimeSeconds,
  jamsPermanently, worksWhenWet, joinsDifferentDiameters, loadDirection,
  difficultyRating, knotTypes,
} from "../knot-strength-calc.js";

describe("strengthRetentionPercent", () => {
  it("figure eight retains most strength", () => {
    expect(strengthRetentionPercent("figure_eight")).toBeGreaterThan(
      strengthRetentionPercent("reef")
    );
  });
});

describe("securityRating", () => {
  it("figure eight is most secure", () => {
    expect(securityRating("figure_eight")).toBeGreaterThan(
      securityRating("clove_hitch")
    );
  });
});

describe("easeOfUntying", () => {
  it("bowline unties easiest", () => {
    expect(easeOfUntying("bowline")).toBeGreaterThan(
      easeOfUntying("reef")
    );
  });
});

describe("tyingTimeSeconds", () => {
  it("clove hitch is fastest to tie", () => {
    expect(tyingTimeSeconds("clove_hitch")).toBeLessThanOrEqual(
      tyingTimeSeconds("bowline")
    );
  });
});

describe("jamsPermanently", () => {
  it("reef knot can jam", () => {
    expect(jamsPermanently("reef")).toBe(true);
  });
  it("bowline does not jam", () => {
    expect(jamsPermanently("bowline")).toBe(false);
  });
});

describe("worksWhenWet", () => {
  it("bowline works wet", () => {
    expect(worksWhenWet("bowline")).toBe(true);
  });
  it("reef does not work wet", () => {
    expect(worksWhenWet("reef")).toBe(false);
  });
});

describe("joinsDifferentDiameters", () => {
  it("sheet bend joins different diameters", () => {
    expect(joinsDifferentDiameters("sheet_bend")).toBe(true);
  });
  it("bowline does not", () => {
    expect(joinsDifferentDiameters("bowline")).toBe(false);
  });
});

describe("loadDirection", () => {
  it("clove hitch loads perpendicular", () => {
    expect(loadDirection("clove_hitch")).toBe("perpendicular");
  });
});

describe("difficultyRating", () => {
  it("figure eight is easy", () => {
    expect(difficultyRating("figure_eight")).toBe(1);
  });
});

describe("knotTypes", () => {
  it("returns 5 types", () => {
    expect(knotTypes()).toHaveLength(5);
  });
});
