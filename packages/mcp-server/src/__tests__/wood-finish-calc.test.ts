import { describe, it, expect } from "vitest";
import {
  dryTimeHours, durability, waterResistance,
  repairability, naturalGrain, foodSafe,
  bestProject, coatsNeeded, costPerLiter, woodFinishes,
} from "../wood-finish-calc.js";

describe("dryTimeHours", () => {
  it("tung oil dries slowest", () => {
    expect(dryTimeHours("tung_oil")).toBeGreaterThan(
      dryTimeHours("shellac")
    );
  });
});

describe("durability", () => {
  it("polyurethane is most durable", () => {
    expect(durability("polyurethane")).toBeGreaterThan(
      durability("wax")
    );
  });
});

describe("waterResistance", () => {
  it("polyurethane is most water resistant", () => {
    expect(waterResistance("polyurethane")).toBeGreaterThan(
      waterResistance("shellac")
    );
  });
});

describe("repairability", () => {
  it("shellac is most repairable", () => {
    expect(repairability("shellac")).toBeGreaterThan(
      repairability("polyurethane")
    );
  });
});

describe("naturalGrain", () => {
  it("tung oil shows grain best", () => {
    expect(naturalGrain("tung_oil")).toBeGreaterThan(
      naturalGrain("polyurethane")
    );
  });
});

describe("foodSafe", () => {
  it("tung oil is food safe", () => {
    expect(foodSafe("tung_oil")).toBe(true);
  });
  it("lacquer is not food safe", () => {
    expect(foodSafe("lacquer")).toBe(false);
  });
});

describe("bestProject", () => {
  it("polyurethane best for floors", () => {
    expect(bestProject("polyurethane")).toBe("floors");
  });
});

describe("coatsNeeded", () => {
  it("tung oil needs most coats", () => {
    expect(coatsNeeded("tung_oil")).toBeGreaterThan(
      coatsNeeded("wax")
    );
  });
});

describe("costPerLiter", () => {
  it("wax costs most", () => {
    expect(costPerLiter("wax")).toBeGreaterThan(
      costPerLiter("polyurethane")
    );
  });
});

describe("woodFinishes", () => {
  it("returns 5 finishes", () => {
    expect(woodFinishes()).toHaveLength(5);
  });
});
