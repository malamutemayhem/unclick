import { describe, it, expect } from "vitest";
import {
  strikingEmphasis, grapplingEmphasis, flexibilityRequired,
  beltLevels, selfDefenseRating, olympic,
  usesWeapons, originCountry, fitnessScore, martialArts,
} from "../martial-art-calc.js";

describe("strikingEmphasis", () => {
  it("muay thai has highest striking", () => {
    expect(strikingEmphasis("muay_thai")).toBeGreaterThan(
      strikingEmphasis("judo")
    );
  });
});

describe("grapplingEmphasis", () => {
  it("judo has highest grappling", () => {
    expect(grapplingEmphasis("judo")).toBeGreaterThan(
      grapplingEmphasis("karate")
    );
  });
});

describe("flexibilityRequired", () => {
  it("taekwondo needs most flexibility", () => {
    expect(flexibilityRequired("taekwondo")).toBeGreaterThan(
      flexibilityRequired("judo")
    );
  });
});

describe("beltLevels", () => {
  it("karate has 10 belt levels", () => {
    expect(beltLevels("karate")).toBe(10);
  });
  it("muay thai has no belt system", () => {
    expect(beltLevels("muay_thai")).toBe(0);
  });
});

describe("selfDefenseRating", () => {
  it("muay thai rates high for self defense", () => {
    expect(selfDefenseRating("muay_thai")).toBeGreaterThan(
      selfDefenseRating("taekwondo")
    );
  });
});

describe("olympic", () => {
  it("judo is olympic", () => {
    expect(olympic("judo")).toBe(true);
  });
  it("muay thai is not", () => {
    expect(olympic("muay_thai")).toBe(false);
  });
});

describe("usesWeapons", () => {
  it("none use weapons", () => {
    expect(usesWeapons("karate")).toBe(false);
  });
});

describe("originCountry", () => {
  it("muay thai from thailand", () => {
    expect(originCountry("muay_thai")).toBe("thailand");
  });
});

describe("fitnessScore", () => {
  it("muay thai has highest fitness", () => {
    expect(fitnessScore("muay_thai")).toBeGreaterThan(
      fitnessScore("karate")
    );
  });
});

describe("martialArts", () => {
  it("returns 5 types", () => {
    expect(martialArts()).toHaveLength(5);
  });
});
