import { describe, it, expect } from "vitest";
import {
  stationsCount, threadLength, chainLinkHeight, laysFlat,
  decorativeRating, difficultyRating, sewingTimeMinutesPerSig,
  coverRequired, costPerBook, copticVariants,
} from "../coptic-binding-calc.js";

describe("stationsCount", () => {
  it("taller spine needs more stations", () => {
    expect(stationsCount(20)).toBeGreaterThan(stationsCount(10));
  });
});

describe("threadLength", () => {
  it("more signatures needs more thread", () => {
    expect(threadLength(10, 15)).toBeGreaterThan(threadLength(5, 15));
  });
});

describe("chainLinkHeight", () => {
  it("crossed has tallest links", () => {
    expect(chainLinkHeight("crossed")).toBeGreaterThan(
      chainLinkHeight("basic")
    );
  });
});

describe("laysFlat", () => {
  it("basic lays flat", () => {
    expect(laysFlat("basic")).toBe(true);
  });
  it("ethiopian does not lay flat", () => {
    expect(laysFlat("ethiopian")).toBe(false);
  });
});

describe("decorativeRating", () => {
  it("caterpillar is most decorative", () => {
    expect(decorativeRating("caterpillar")).toBeGreaterThan(
      decorativeRating("basic")
    );
  });
});

describe("difficultyRating", () => {
  it("crossed is hardest", () => {
    expect(difficultyRating("crossed")).toBeGreaterThan(
      difficultyRating("basic")
    );
  });
});

describe("sewingTimeMinutesPerSig", () => {
  it("crossed takes longest", () => {
    expect(sewingTimeMinutesPerSig("crossed")).toBeGreaterThan(
      sewingTimeMinutesPerSig("basic")
    );
  });
});

describe("coverRequired", () => {
  it("no cover required", () => {
    expect(coverRequired()).toBe(false);
  });
});

describe("costPerBook", () => {
  it("crossed is most expensive", () => {
    expect(costPerBook("crossed")).toBeGreaterThan(costPerBook("basic"));
  });
});

describe("copticVariants", () => {
  it("returns 5 variants", () => {
    expect(copticVariants()).toHaveLength(5);
  });
});
