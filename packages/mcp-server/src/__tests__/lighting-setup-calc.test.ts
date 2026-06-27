import { describe, it, expect } from "vitest";
import {
  dramaticEffect, flatteringRating, shadowDepth,
  setupDifficulty, lightsRequired, naturalLight,
  bestForHeadshot, bestSubject, moodConveyed, lightingSetups,
} from "../lighting-setup-calc.js";

describe("dramaticEffect", () => {
  it("split is most dramatic", () => {
    expect(dramaticEffect("split")).toBeGreaterThan(
      dramaticEffect("broad")
    );
  });
});

describe("flatteringRating", () => {
  it("butterfly is most flattering", () => {
    expect(flatteringRating("butterfly")).toBeGreaterThan(
      flatteringRating("split")
    );
  });
});

describe("shadowDepth", () => {
  it("split has deepest shadows", () => {
    expect(shadowDepth("split")).toBeGreaterThan(
      shadowDepth("broad")
    );
  });
});

describe("setupDifficulty", () => {
  it("butterfly is hardest to set up", () => {
    expect(setupDifficulty("butterfly")).toBeGreaterThan(
      setupDifficulty("split")
    );
  });
});

describe("lightsRequired", () => {
  it("rembrandt needs 2 lights", () => {
    expect(lightsRequired("rembrandt")).toBe(2);
  });
  it("split needs 1", () => {
    expect(lightsRequired("split")).toBe(1);
  });
});

describe("naturalLight", () => {
  it("rembrandt works with natural light", () => {
    expect(naturalLight("rembrandt")).toBe(true);
  });
  it("butterfly does not", () => {
    expect(naturalLight("butterfly")).toBe(false);
  });
});

describe("bestForHeadshot", () => {
  it("butterfly is good for headshots", () => {
    expect(bestForHeadshot("butterfly")).toBe(true);
  });
  it("split is not", () => {
    expect(bestForHeadshot("split")).toBe(false);
  });
});

describe("bestSubject", () => {
  it("butterfly for beauty", () => {
    expect(bestSubject("butterfly")).toBe("beauty");
  });
});

describe("moodConveyed", () => {
  it("split conveys mystery", () => {
    expect(moodConveyed("split")).toBe("mysterious");
  });
});

describe("lightingSetups", () => {
  it("returns 5 types", () => {
    expect(lightingSetups()).toHaveLength(5);
  });
});
