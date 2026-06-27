import { describe, it, expect } from "vitest";
import {
  symmetryScore, collectibility, fragility,
  displayQuality, formationTime, hasDefinedFaces,
  commonInCollections, exampleMineral, growthPattern, crystalHabits,
} from "../crystal-habit-calc.js";

describe("symmetryScore", () => {
  it("prismatic most symmetric", () => {
    expect(symmetryScore("prismatic")).toBeGreaterThan(
      symmetryScore("massive")
    );
  });
});

describe("collectibility", () => {
  it("prismatic most collectible", () => {
    expect(collectibility("prismatic")).toBeGreaterThan(
      collectibility("massive")
    );
  });
});

describe("fragility", () => {
  it("acicular most fragile", () => {
    expect(fragility("acicular")).toBeGreaterThan(
      fragility("massive")
    );
  });
});

describe("displayQuality", () => {
  it("prismatic best display", () => {
    expect(displayQuality("prismatic")).toBeGreaterThan(
      displayQuality("massive")
    );
  });
});

describe("formationTime", () => {
  it("massive longest formation", () => {
    expect(formationTime("massive")).toBeGreaterThan(
      formationTime("acicular")
    );
  });
});

describe("hasDefinedFaces", () => {
  it("prismatic has defined faces", () => {
    expect(hasDefinedFaces("prismatic")).toBe(true);
  });
  it("massive does not", () => {
    expect(hasDefinedFaces("massive")).toBe(false);
  });
});

describe("commonInCollections", () => {
  it("botryoidal is common in collections", () => {
    expect(commonInCollections("botryoidal")).toBe(true);
  });
  it("massive is not", () => {
    expect(commonInCollections("massive")).toBe(false);
  });
});

describe("exampleMineral", () => {
  it("prismatic is tourmaline beryl", () => {
    expect(exampleMineral("prismatic")).toBe("tourmaline_beryl");
  });
});

describe("growthPattern", () => {
  it("acicular is needle like", () => {
    expect(growthPattern("acicular")).toBe("needle_like");
  });
});

describe("crystalHabits", () => {
  it("returns 5 habits", () => {
    expect(crystalHabits()).toHaveLength(5);
  });
});
