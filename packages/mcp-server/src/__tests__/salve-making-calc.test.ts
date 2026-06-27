import { describe, it, expect } from "vitest";
import {
  meltingPointCelsius, absorptionRate, moisturizingRating,
  barrierStrength, veganFriendly, allergenRisk,
  bestApplication, shelfLifeMonths, costPerKg, salveBases,
} from "../salve-making-calc.js";

describe("meltingPointCelsius", () => {
  it("beeswax melts at highest temp", () => {
    expect(meltingPointCelsius("beeswax")).toBeGreaterThan(
      meltingPointCelsius("cocoa_butter")
    );
  });
});

describe("absorptionRate", () => {
  it("lanolin absorbs fastest", () => {
    expect(absorptionRate("lanolin")).toBeGreaterThan(
      absorptionRate("beeswax")
    );
  });
});

describe("moisturizingRating", () => {
  it("lanolin moisturizes best", () => {
    expect(moisturizingRating("lanolin")).toBeGreaterThan(
      moisturizingRating("beeswax")
    );
  });
});

describe("barrierStrength", () => {
  it("beeswax has strongest barrier", () => {
    expect(barrierStrength("beeswax")).toBeGreaterThan(
      barrierStrength("shea_butter")
    );
  });
});

describe("veganFriendly", () => {
  it("shea butter is vegan", () => {
    expect(veganFriendly("shea_butter")).toBe(true);
  });
  it("beeswax is not", () => {
    expect(veganFriendly("beeswax")).toBe(false);
  });
});

describe("allergenRisk", () => {
  it("lanolin has highest allergen risk", () => {
    expect(allergenRisk("lanolin")).toBeGreaterThan(
      allergenRisk("shea_butter")
    );
  });
});

describe("bestApplication", () => {
  it("beeswax is best for lip balm", () => {
    expect(bestApplication("beeswax")).toBe("lip_balm");
  });
});

describe("shelfLifeMonths", () => {
  it("beeswax lasts longest", () => {
    expect(shelfLifeMonths("beeswax")).toBeGreaterThan(
      shelfLifeMonths("lanolin")
    );
  });
});

describe("costPerKg", () => {
  it("beeswax costs most", () => {
    expect(costPerKg("beeswax")).toBeGreaterThan(
      costPerKg("tallow")
    );
  });
});

describe("salveBases", () => {
  it("returns 5 bases", () => {
    expect(salveBases()).toHaveLength(5);
  });
});
