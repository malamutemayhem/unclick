import { describe, it, expect } from "vitest";
import {
  quality, throughput, energy, uniformity,
  fdCost, continuous, forPharma, sublimation,
  bestUse, freezeDryerTypes,
} from "../freeze-dryer-type-calc.js";

describe("quality", () => {
  it("shelf batch highest quality", () => {
    expect(quality("shelf_batch_pharma")).toBeGreaterThan(quality("atmospheric_belt_food"));
  });
});

describe("throughput", () => {
  it("atmospheric belt highest throughput", () => {
    expect(throughput("atmospheric_belt_food")).toBeGreaterThan(throughput("shelf_batch_pharma"));
  });
});

describe("energy", () => {
  it("microwave assisted most energy efficient", () => {
    expect(energy("microwave_assisted_vacuum")).toBeGreaterThan(energy("shelf_batch_pharma"));
  });
});

describe("uniformity", () => {
  it("shelf batch best uniformity", () => {
    expect(uniformity("shelf_batch_pharma")).toBeGreaterThan(uniformity("rotary_drum_continuous"));
  });
});

describe("fdCost", () => {
  it("shelf batch most expensive", () => {
    expect(fdCost("shelf_batch_pharma")).toBeGreaterThan(fdCost("atmospheric_belt_food"));
  });
});

describe("continuous", () => {
  it("rotary drum is continuous", () => {
    expect(continuous("rotary_drum_continuous")).toBe(true);
  });
  it("shelf batch not continuous", () => {
    expect(continuous("shelf_batch_pharma")).toBe(false);
  });
});

describe("forPharma", () => {
  it("shelf batch for pharma", () => {
    expect(forPharma("shelf_batch_pharma")).toBe(true);
  });
  it("atmospheric belt not for pharma", () => {
    expect(forPharma("atmospheric_belt_food")).toBe(false);
  });
});

describe("sublimation", () => {
  it("spray freeze uses spray into cryogen", () => {
    expect(sublimation("spray_freeze_particle")).toBe("spray_into_cryogen_then_dry");
  });
});

describe("bestUse", () => {
  it("rotary drum best for instant coffee", () => {
    expect(bestUse("rotary_drum_continuous")).toBe("instant_coffee_bulk_granule");
  });
});

describe("freezeDryerTypes", () => {
  it("returns 5 types", () => {
    expect(freezeDryerTypes()).toHaveLength(5);
  });
});
