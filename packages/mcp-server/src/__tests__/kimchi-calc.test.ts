import { describe, it, expect } from "vitest";
import {
  saltingHours, fermentationDays, chiliFlakesPercent,
  fishSauceRequired, crunchRetention, liquidContent,
  shelfLifeWeeks, spiceLevel, costPerKg, kimchiStyles,
} from "../kimchi-calc.js";

describe("saltingHours", () => {
  it("baechu salts longest", () => {
    expect(saltingHours("baechu")).toBeGreaterThan(
      saltingHours("oi_sobagi")
    );
  });
});

describe("fermentationDays", () => {
  it("dongchimi ferments longest", () => {
    expect(fermentationDays("dongchimi")).toBeGreaterThan(
      fermentationDays("oi_sobagi")
    );
  });
});

describe("chiliFlakesPercent", () => {
  it("kkakdugi has most chili", () => {
    expect(chiliFlakesPercent("kkakdugi")).toBeGreaterThan(
      chiliFlakesPercent("baechu")
    );
  });
  it("dongchimi has no chili", () => {
    expect(chiliFlakesPercent("dongchimi")).toBe(0);
  });
});

describe("fishSauceRequired", () => {
  it("baechu needs fish sauce", () => {
    expect(fishSauceRequired("baechu")).toBe(true);
  });
  it("dongchimi does not", () => {
    expect(fishSauceRequired("dongchimi")).toBe(false);
  });
});

describe("crunchRetention", () => {
  it("kkakdugi is crunchiest", () => {
    expect(crunchRetention("kkakdugi")).toBeGreaterThan(
      crunchRetention("baechu")
    );
  });
});

describe("liquidContent", () => {
  it("dongchimi has most liquid", () => {
    expect(liquidContent("dongchimi")).toBeGreaterThan(
      liquidContent("baechu")
    );
  });
});

describe("shelfLifeWeeks", () => {
  it("baechu lasts longest", () => {
    expect(shelfLifeWeeks("baechu")).toBeGreaterThan(
      shelfLifeWeeks("oi_sobagi")
    );
  });
});

describe("spiceLevel", () => {
  it("kkakdugi is spiciest", () => {
    expect(spiceLevel("kkakdugi")).toBeGreaterThan(
      spiceLevel("dongchimi")
    );
  });
});

describe("costPerKg", () => {
  it("oi sobagi is most expensive", () => {
    expect(costPerKg("oi_sobagi")).toBeGreaterThan(
      costPerKg("dongchimi")
    );
  });
});

describe("kimchiStyles", () => {
  it("returns 5 styles", () => {
    expect(kimchiStyles()).toHaveLength(5);
  });
});
