import { describe, it, expect } from "vitest";
import {
  coziness, breathability, decorStyle, versatility,
  throwCost, machineWash, needsPower, fabricType,
  bestUse, throwBlankets,
} from "../throw-blanket-calc.js";

describe("coziness", () => {
  it("fleece plush soft coziest", () => {
    expect(coziness("fleece_plush_soft")).toBeGreaterThan(coziness("cotton_waffle_weave"));
  });
});

describe("breathability", () => {
  it("cotton waffle weave most breathable", () => {
    expect(breathability("cotton_waffle_weave")).toBeGreaterThan(breathability("weighted_anxiety_calm"));
  });
});

describe("decorStyle", () => {
  it("chunky knit chenille best decor style", () => {
    expect(decorStyle("chunky_knit_chenille")).toBeGreaterThan(decorStyle("electric_heated_warm"));
  });
});

describe("versatility", () => {
  it("cotton waffle weave most versatile", () => {
    expect(versatility("cotton_waffle_weave")).toBeGreaterThan(versatility("weighted_anxiety_calm"));
  });
});

describe("throwCost", () => {
  it("weighted anxiety calm most expensive", () => {
    expect(throwCost("weighted_anxiety_calm")).toBeGreaterThan(throwCost("fleece_plush_soft"));
  });
});

describe("machineWash", () => {
  it("fleece plush soft is machine washable", () => {
    expect(machineWash("fleece_plush_soft")).toBe(true);
  });
  it("electric heated warm is not", () => {
    expect(machineWash("electric_heated_warm")).toBe(false);
  });
});

describe("needsPower", () => {
  it("electric heated warm needs power", () => {
    expect(needsPower("electric_heated_warm")).toBe(true);
  });
  it("weighted anxiety calm does not", () => {
    expect(needsPower("weighted_anxiety_calm")).toBe(false);
  });
});

describe("fabricType", () => {
  it("weighted anxiety calm uses glass bead mink cover", () => {
    expect(fabricType("weighted_anxiety_calm")).toBe("glass_bead_mink_cover");
  });
});

describe("bestUse", () => {
  it("fleece plush soft best for movie night couch cuddle", () => {
    expect(bestUse("fleece_plush_soft")).toBe("movie_night_couch_cuddle");
  });
});

describe("throwBlankets", () => {
  it("returns 5 types", () => {
    expect(throwBlankets()).toHaveLength(5);
  });
});
