import { describe, it, expect } from "vitest";
import {
  depthFraction, strengthRating, visibleFromFront, routerRequired,
  cuttingTimeMinutes, shelfSupport, glueRequired, bestForApplication,
  difficultyRating, dadoTypes,
} from "../dado-joint-calc.js";

describe("depthFraction", () => {
  it("rabbeted is deepest", () => {
    expect(depthFraction("rabbeted")).toBeGreaterThan(
      depthFraction("sliding")
    );
  });
});

describe("strengthRating", () => {
  it("sliding is strongest", () => {
    expect(strengthRating("sliding")).toBeGreaterThan(
      strengthRating("through")
    );
  });
});

describe("visibleFromFront", () => {
  it("through is visible", () => {
    expect(visibleFromFront("through")).toBe(true);
  });
  it("stopped is not visible", () => {
    expect(visibleFromFront("stopped")).toBe(false);
  });
});

describe("routerRequired", () => {
  it("sliding needs a router", () => {
    expect(routerRequired("sliding")).toBe(true);
  });
  it("through does not", () => {
    expect(routerRequired("through")).toBe(false);
  });
});

describe("cuttingTimeMinutes", () => {
  it("sliding takes longest", () => {
    expect(cuttingTimeMinutes("sliding")).toBeGreaterThan(
      cuttingTimeMinutes("through")
    );
  });
});

describe("shelfSupport", () => {
  it("sliding supports shelves best", () => {
    expect(shelfSupport("sliding")).toBeGreaterThan(
      shelfSupport("rabbeted")
    );
  });
});

describe("glueRequired", () => {
  it("through needs glue", () => {
    expect(glueRequired("through")).toBe(true);
  });
  it("sliding does not need glue", () => {
    expect(glueRequired("sliding")).toBe(false);
  });
});

describe("bestForApplication", () => {
  it("sliding is best for drawer dividers", () => {
    expect(bestForApplication("sliding")).toBe("drawer_divider");
  });
});

describe("difficultyRating", () => {
  it("sliding is hardest", () => {
    expect(difficultyRating("sliding")).toBeGreaterThan(
      difficultyRating("through")
    );
  });
});

describe("dadoTypes", () => {
  it("returns 5 types", () => {
    expect(dadoTypes()).toHaveLength(5);
  });
});
