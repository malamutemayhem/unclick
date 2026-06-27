import { describe, it, expect } from "vitest";
import {
  meltingPointCelsius, skinAbsorption, moistureBarrier,
  herbCarryingCapacity, shelfLifeMonths, vegan,
  hypoallergenic, bestUse, costPerKg, salveBases,
} from "../salve-base-calc.js";

describe("meltingPointCelsius", () => {
  it("beeswax melts at highest temp", () => {
    expect(meltingPointCelsius("beeswax")).toBeGreaterThan(
      meltingPointCelsius("coconut_oil")
    );
  });
});

describe("skinAbsorption", () => {
  it("coconut oil absorbs best", () => {
    expect(skinAbsorption("coconut_oil")).toBeGreaterThan(
      skinAbsorption("beeswax")
    );
  });
});

describe("moistureBarrier", () => {
  it("beeswax has best barrier", () => {
    expect(moistureBarrier("beeswax")).toBeGreaterThan(
      moistureBarrier("coconut_oil")
    );
  });
});

describe("herbCarryingCapacity", () => {
  it("coconut oil carries herbs best", () => {
    expect(herbCarryingCapacity("coconut_oil")).toBeGreaterThan(
      herbCarryingCapacity("beeswax")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("beeswax lasts longest", () => {
    expect(shelfLifeMonths("beeswax")).toBeGreaterThan(
      shelfLifeMonths("coconut_oil")
    );
  });
});

describe("vegan", () => {
  it("shea butter is vegan", () => {
    expect(vegan("shea_butter")).toBe(true);
  });
  it("beeswax is not", () => {
    expect(vegan("beeswax")).toBe(false);
  });
});

describe("hypoallergenic", () => {
  it("beeswax is hypoallergenic", () => {
    expect(hypoallergenic("beeswax")).toBe(true);
  });
  it("lanolin is not", () => {
    expect(hypoallergenic("lanolin")).toBe(false);
  });
});

describe("bestUse", () => {
  it("beeswax best for lip balm", () => {
    expect(bestUse("beeswax")).toBe("lip_balm");
  });
});

describe("costPerKg", () => {
  it("lanolin costs most", () => {
    expect(costPerKg("lanolin")).toBeGreaterThan(
      costPerKg("tallow")
    );
  });
});

describe("salveBases", () => {
  it("returns 5 bases", () => {
    expect(salveBases()).toHaveLength(5);
  });
});
