import { describe, it, expect } from "vitest";
import {
  seedAccuracy, plantingSpeed, seedSpacing, depthControl,
  ppCost, variableRate, forSmallSeed, meteringConfig,
  bestUse, precisionPlanterTypes,
} from "../precision-planter-calc.js";

describe("seedAccuracy", () => {
  it("electric drive best seed accuracy", () => {
    expect(seedAccuracy("electric_drive")).toBeGreaterThan(seedAccuracy("finger_pickup"));
  });
});

describe("plantingSpeed", () => {
  it("air seed delivery fastest planting speed", () => {
    expect(plantingSpeed("air_seed_delivery")).toBeGreaterThan(plantingSpeed("finger_pickup"));
  });
});

describe("seedSpacing", () => {
  it("electric drive best seed spacing", () => {
    expect(seedSpacing("electric_drive")).toBeGreaterThan(seedSpacing("finger_pickup"));
  });
});

describe("depthControl", () => {
  it("electric drive best depth control", () => {
    expect(depthControl("electric_drive")).toBeGreaterThan(depthControl("finger_pickup"));
  });
});

describe("ppCost", () => {
  it("electric drive most expensive", () => {
    expect(ppCost("electric_drive")).toBeGreaterThan(ppCost("finger_pickup"));
  });
});

describe("variableRate", () => {
  it("electric drive has variable rate", () => {
    expect(variableRate("electric_drive")).toBe(true);
  });
  it("vacuum metering no variable rate", () => {
    expect(variableRate("vacuum_metering")).toBe(false);
  });
});

describe("forSmallSeed", () => {
  it("air seed delivery for small seed", () => {
    expect(forSmallSeed("air_seed_delivery")).toBe(true);
  });
  it("vacuum metering not for small seed", () => {
    expect(forSmallSeed("vacuum_metering")).toBe(false);
  });
});

describe("meteringConfig", () => {
  it("belt metering uses precision belt", () => {
    expect(meteringConfig("belt_metering")).toBe("precision_belt_metering_individual_seed_pocket_electric_motor");
  });
});

describe("bestUse", () => {
  it("finger pickup for budget corn planting", () => {
    expect(bestUse("finger_pickup")).toBe("corn_planting_budget_planter_mechanical_singulation_standard");
  });
});

describe("precisionPlanterTypes", () => {
  it("returns 5 types", () => {
    expect(precisionPlanterTypes()).toHaveLength(5);
  });
});
