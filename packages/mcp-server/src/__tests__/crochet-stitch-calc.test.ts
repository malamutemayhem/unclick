import { describe, it, expect } from "vitest";
import {
  height, yarnConsumption, drapeFactor,
  speedRating, warmth, structural,
  lacyAppearance, bestProject, beginnerFriendly, crochetStitches,
} from "../crochet-stitch-calc.js";

describe("height", () => {
  it("treble is tallest", () => {
    expect(height("treble")).toBeGreaterThan(height("chain"));
  });
});

describe("yarnConsumption", () => {
  it("treble uses most yarn", () => {
    expect(yarnConsumption("treble")).toBeGreaterThan(
      yarnConsumption("chain")
    );
  });
});

describe("drapeFactor", () => {
  it("chain has most drape", () => {
    expect(drapeFactor("chain")).toBeGreaterThan(
      drapeFactor("single")
    );
  });
});

describe("speedRating", () => {
  it("chain is fastest", () => {
    expect(speedRating("chain")).toBeGreaterThan(
      speedRating("single")
    );
  });
});

describe("warmth", () => {
  it("single is warmest", () => {
    expect(warmth("single")).toBeGreaterThan(warmth("treble"));
  });
});

describe("structural", () => {
  it("single is structural", () => {
    expect(structural("single")).toBe(true);
  });
  it("double is not", () => {
    expect(structural("double")).toBe(false);
  });
});

describe("lacyAppearance", () => {
  it("shell is lacy", () => {
    expect(lacyAppearance("shell")).toBe(true);
  });
  it("single is not lacy", () => {
    expect(lacyAppearance("single")).toBe(false);
  });
});

describe("bestProject", () => {
  it("single for amigurumi", () => {
    expect(bestProject("single")).toBe("amigurumi");
  });
});

describe("beginnerFriendly", () => {
  it("chain is most beginner friendly", () => {
    expect(beginnerFriendly("chain")).toBeGreaterThan(
      beginnerFriendly("shell")
    );
  });
});

describe("crochetStitches", () => {
  it("returns 5 types", () => {
    expect(crochetStitches()).toHaveLength(5);
  });
});
