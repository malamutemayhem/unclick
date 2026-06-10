import { describe, it, expect } from "vitest";
import {
  abvRangeHigh, volumePercent, flavorQuality,
  toxicCompounds, drinkable, redistillable,
  collectionOrder, aromaCharacter, valueRating, spiritCuts,
} from "../spirit-cut-calc.js";

describe("abvRangeHigh", () => {
  it("foreshots has highest abv", () => {
    expect(abvRangeHigh("foreshots")).toBeGreaterThan(
      abvRangeHigh("tails")
    );
  });
});

describe("volumePercent", () => {
  it("feints have largest volume", () => {
    expect(volumePercent("feints")).toBeGreaterThan(
      volumePercent("hearts")
    );
  });
});

describe("flavorQuality", () => {
  it("hearts have best flavor", () => {
    expect(flavorQuality("hearts")).toBeGreaterThan(
      flavorQuality("heads")
    );
  });
});

describe("toxicCompounds", () => {
  it("foreshots are most toxic", () => {
    expect(toxicCompounds("foreshots")).toBeGreaterThan(
      toxicCompounds("hearts")
    );
  });
});

describe("drinkable", () => {
  it("hearts are drinkable", () => {
    expect(drinkable("hearts")).toBe(true);
  });
  it("foreshots are not drinkable", () => {
    expect(drinkable("foreshots")).toBe(false);
  });
});

describe("redistillable", () => {
  it("heads can be redistilled", () => {
    expect(redistillable("heads")).toBe(true);
  });
  it("foreshots cannot", () => {
    expect(redistillable("foreshots")).toBe(false);
  });
});

describe("collectionOrder", () => {
  it("foreshots come first", () => {
    expect(collectionOrder("foreshots")).toBeLessThan(
      collectionOrder("hearts")
    );
  });
});

describe("aromaCharacter", () => {
  it("hearts are clean and smooth", () => {
    expect(aromaCharacter("hearts")).toBe("clean_smooth");
  });
});

describe("valueRating", () => {
  it("hearts are most valuable", () => {
    expect(valueRating("hearts")).toBeGreaterThan(
      valueRating("tails")
    );
  });
});

describe("spiritCuts", () => {
  it("returns 5 cuts", () => {
    expect(spiritCuts()).toHaveLength(5);
  });
});
