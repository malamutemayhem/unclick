import { describe, it, expect } from "vitest";
import {
  pageCapacity, laysFlat, durabilityRating,
  toolsRequired, constructionHours, exposedSpine,
  bestApplication, skillLevel, costPerBook, bindingStyles,
} from "../book-binding-calc.js";

describe("pageCapacity", () => {
  it("perfect binding holds most pages", () => {
    expect(pageCapacity("perfect")).toBeGreaterThan(
      pageCapacity("japanese_stab")
    );
  });
});

describe("laysFlat", () => {
  it("coptic lays flat", () => {
    expect(laysFlat("coptic")).toBe(true);
  });
  it("perfect does not", () => {
    expect(laysFlat("perfect")).toBe(false);
  });
});

describe("durabilityRating", () => {
  it("case bound is most durable", () => {
    expect(durabilityRating("case_bound")).toBeGreaterThan(
      durabilityRating("perfect")
    );
  });
});

describe("toolsRequired", () => {
  it("case bound needs most tools", () => {
    expect(toolsRequired("case_bound")).toBeGreaterThan(
      toolsRequired("japanese_stab")
    );
  });
});

describe("constructionHours", () => {
  it("case bound takes longest", () => {
    expect(constructionHours("case_bound")).toBeGreaterThan(
      constructionHours("japanese_stab")
    );
  });
});

describe("exposedSpine", () => {
  it("coptic has exposed spine", () => {
    expect(exposedSpine("coptic")).toBe(true);
  });
  it("case bound does not", () => {
    expect(exposedSpine("case_bound")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("case bound is best for hardcovers", () => {
    expect(bestApplication("case_bound")).toBe("hardcovers");
  });
});

describe("skillLevel", () => {
  it("case bound needs highest skill", () => {
    expect(skillLevel("case_bound")).toBeGreaterThan(
      skillLevel("japanese_stab")
    );
  });
});

describe("costPerBook", () => {
  it("case bound costs most", () => {
    expect(costPerBook("case_bound")).toBeGreaterThan(
      costPerBook("perfect")
    );
  });
});

describe("bindingStyles", () => {
  it("returns 5 styles", () => {
    expect(bindingStyles()).toHaveLength(5);
  });
});
