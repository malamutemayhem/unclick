import { describe, it, expect } from "vitest";
import {
  feederCapacity, refillDays, seedCost, monthlySeedPounds,
  bestSeed, squirrelBaffle, mountingHeight, cleaningInterval,
  nectarRecipe, windowStrikeRisk, speciesAttracted, annualCost,
  feederTypes,
} from "../bird-feeder.js";

describe("feederCapacity", () => {
  it("hopper largest", () => {
    expect(feederCapacity("hopper")).toBeGreaterThan(feederCapacity("tube"));
  });
});

describe("refillDays", () => {
  it("positive days", () => {
    expect(refillDays(4, 10)).toBeGreaterThan(0);
  });

  it("infinite with no birds", () => {
    expect(refillDays(4, 0)).toBe(Infinity);
  });
});

describe("seedCost", () => {
  it("positive cost", () => {
    expect(seedCost(5, 2)).toBe(10);
  });
});

describe("monthlySeedPounds", () => {
  it("positive pounds", () => {
    expect(monthlySeedPounds(20)).toBeGreaterThan(0);
  });
});

describe("bestSeed", () => {
  it("suet for suet feeder", () => {
    expect(bestSeed("suet")).toBe("suet");
  });

  it("nyjer for nyjer feeder", () => {
    expect(bestSeed("nyjer")).toBe("nyjer");
  });
});

describe("squirrelBaffle", () => {
  it("adds 16 inches", () => {
    expect(squirrelBaffle(2)).toBe(18);
  });
});

describe("mountingHeight", () => {
  it("platform lowest", () => {
    expect(mountingHeight("platform")).toBeLessThan(mountingHeight("tube"));
  });
});

describe("cleaningInterval", () => {
  it("platform cleaned most often", () => {
    expect(cleaningInterval("platform")).toBeLessThan(cleaningInterval("tube"));
  });
});

describe("nectarRecipe", () => {
  it("4:1 ratio", () => {
    const recipe = nectarRecipe(4);
    expect(recipe.sugarCups).toBe(1);
    expect(recipe.totalCups).toBe(5);
  });
});

describe("windowStrikeRisk", () => {
  it("high in danger zone", () => {
    expect(windowStrikeRisk(8)).toContain("high");
  });

  it("low when very close", () => {
    expect(windowStrikeRisk(2)).toContain("low");
  });
});

describe("speciesAttracted", () => {
  it("sunflower attracts most", () => {
    expect(speciesAttracted("sunflower")).toBeGreaterThan(speciesAttracted("nyjer"));
  });
});

describe("annualCost", () => {
  it("positive cost", () => {
    expect(annualCost(20, 2)).toBeGreaterThan(0);
  });
});

describe("feederTypes", () => {
  it("returns 6 types", () => {
    expect(feederTypes()).toHaveLength(6);
  });
});
