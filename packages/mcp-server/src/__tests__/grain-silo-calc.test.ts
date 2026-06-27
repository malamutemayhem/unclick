import { describe, it, expect } from "vitest";
import {
  capacityTonnes, moistureControlRating, pestResistance,
  ventilationRating, storageMonths, belowGround,
  buildDays, repairability, costEstimate, siloTypes,
} from "../grain-silo-calc.js";

describe("capacityTonnes", () => {
  it("stone tower has most capacity", () => {
    expect(capacityTonnes("stone_tower")).toBeGreaterThan(
      capacityTonnes("wicker_granary")
    );
  });
});

describe("moistureControlRating", () => {
  it("raised crib has best moisture control", () => {
    expect(moistureControlRating("raised_crib")).toBeGreaterThan(
      moistureControlRating("pit_storage")
    );
  });
});

describe("pestResistance", () => {
  it("stone tower has best pest resistance", () => {
    expect(pestResistance("stone_tower")).toBeGreaterThan(
      pestResistance("wicker_granary")
    );
  });
});

describe("ventilationRating", () => {
  it("wicker granary has best ventilation", () => {
    expect(ventilationRating("wicker_granary")).toBeGreaterThan(
      ventilationRating("pit_storage")
    );
  });
});

describe("storageMonths", () => {
  it("stone tower stores longest", () => {
    expect(storageMonths("stone_tower")).toBeGreaterThan(
      storageMonths("wicker_granary")
    );
  });
});

describe("belowGround", () => {
  it("pit storage is below ground", () => {
    expect(belowGround("pit_storage")).toBe(true);
  });
  it("stone tower is not", () => {
    expect(belowGround("stone_tower")).toBe(false);
  });
});

describe("buildDays", () => {
  it("stone tower takes longest to build", () => {
    expect(buildDays("stone_tower")).toBeGreaterThan(
      buildDays("wicker_granary")
    );
  });
});

describe("repairability", () => {
  it("pit storage is easiest to repair", () => {
    expect(repairability("pit_storage")).toBeGreaterThan(
      repairability("stone_tower")
    );
  });
});

describe("costEstimate", () => {
  it("stone tower is most expensive", () => {
    expect(costEstimate("stone_tower")).toBeGreaterThan(
      costEstimate("wicker_granary")
    );
  });
});

describe("siloTypes", () => {
  it("returns 5 types", () => {
    expect(siloTypes()).toHaveLength(5);
  });
});
