import { describe, it, expect } from "vitest";
import {
  milkNeeded, yieldPercent, rennetAmount, starterCulture,
  saltAmount, brineConcentration, curdTemp, agingTime,
  agingTemp, agingHumidity, wheyVolume, milkFatContent,
  costPerKg, cheeseTypes,
} from "../cheese-calc.js";

describe("milkNeeded", () => {
  it("parmesan needs most milk", () => {
    expect(milkNeeded(1, "parmesan")).toBeGreaterThan(milkNeeded(1, "ricotta"));
  });
});

describe("yieldPercent", () => {
  it("cream cheese has highest yield", () => {
    expect(yieldPercent("cream_cheese")).toBeGreaterThan(yieldPercent("cheddar"));
  });
});

describe("rennetAmount", () => {
  it("scales with milk", () => {
    expect(rennetAmount(10)).toBeGreaterThan(rennetAmount(5));
  });
});

describe("starterCulture", () => {
  it("2% of milk", () => {
    expect(starterCulture(10)).toBe(0.2);
  });
});

describe("saltAmount", () => {
  it("20g per kg at 2%", () => {
    expect(saltAmount(1)).toBe(20);
  });
});

describe("brineConcentration", () => {
  it("percent of total", () => {
    expect(brineConcentration(1, 4)).toBe(20);
  });
});

describe("curdTemp", () => {
  it("ricotta is hottest", () => {
    expect(curdTemp("ricotta")).toBeGreaterThan(curdTemp("cheddar"));
  });
});

describe("agingTime", () => {
  it("mozzarella is fresh", () => {
    expect(agingTime("mozzarella").maxWeeks).toBe(0);
  });

  it("parmesan ages longest", () => {
    expect(agingTime("parmesan").minWeeks).toBeGreaterThan(agingTime("cheddar").minWeeks);
  });
});

describe("agingTemp", () => {
  it("fresh cheeses stored cold", () => {
    expect(agingTemp("mozzarella").maxC).toBeLessThan(agingTemp("cheddar").maxC);
  });
});

describe("agingHumidity", () => {
  it("brie needs high humidity", () => {
    expect(agingHumidity("brie")).toBeGreaterThan(agingHumidity("cheddar"));
  });
});

describe("wheyVolume", () => {
  it("most of milk becomes whey", () => {
    expect(wheyVolume(10, "cheddar")).toBeGreaterThan(8);
  });
});

describe("milkFatContent", () => {
  it("buffalo highest fat", () => {
    expect(milkFatContent("buffalo")).toBeGreaterThan(milkFatContent("cow"));
  });
});

describe("costPerKg", () => {
  it("positive cost", () => {
    expect(costPerKg(10, 2, 1)).toBe(20);
  });
});

describe("cheeseTypes", () => {
  it("returns 8 types", () => {
    expect(cheeseTypes()).toHaveLength(8);
    expect(cheeseTypes()).toContain("cheddar");
  });
});
