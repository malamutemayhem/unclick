import { describe, it, expect } from "vitest";
import {
  petComfort, maneuverability, petCapacity, foldSize,
  strollerCost, allTerrain, detachableCarrier, wheelType,
  bestUse, petStrollers,
} from "../pet-stroller-calc.js";

describe("petComfort", () => {
  it("jogger three wheel air most pet comfort", () => {
    expect(petComfort("jogger_three_wheel_air")).toBeGreaterThan(petComfort("convertible_carrier_detach"));
  });
});

describe("maneuverability", () => {
  it("jogger three wheel air most maneuverable", () => {
    expect(maneuverability("jogger_three_wheel_air")).toBeGreaterThan(maneuverability("double_decker_multi_pet"));
  });
});

describe("petCapacity", () => {
  it("double decker multi pet most pet capacity", () => {
    expect(petCapacity("double_decker_multi_pet")).toBeGreaterThan(petCapacity("convertible_carrier_detach"));
  });
});

describe("foldSize", () => {
  it("convertible carrier detach best fold size", () => {
    expect(foldSize("convertible_carrier_detach")).toBeGreaterThan(foldSize("double_decker_multi_pet"));
  });
});

describe("strollerCost", () => {
  it("jogger three wheel air most expensive", () => {
    expect(strollerCost("jogger_three_wheel_air")).toBeGreaterThan(strollerCost("standard_single_fold"));
  });
});

describe("allTerrain", () => {
  it("jogger three wheel air is all terrain", () => {
    expect(allTerrain("jogger_three_wheel_air")).toBe(true);
  });
  it("standard single fold is not all terrain", () => {
    expect(allTerrain("standard_single_fold")).toBe(false);
  });
});

describe("detachableCarrier", () => {
  it("convertible carrier detach has detachable carrier", () => {
    expect(detachableCarrier("convertible_carrier_detach")).toBe(true);
  });
  it("standard single fold has no detachable carrier", () => {
    expect(detachableCarrier("standard_single_fold")).toBe(false);
  });
});

describe("wheelType", () => {
  it("jogger three wheel air uses air filled rubber tire", () => {
    expect(wheelType("jogger_three_wheel_air")).toBe("air_filled_rubber_tire");
  });
});

describe("bestUse", () => {
  it("double decker multi pet best for two pet vet visit", () => {
    expect(bestUse("double_decker_multi_pet")).toBe("two_pet_vet_visit");
  });
});

describe("petStrollers", () => {
  it("returns 5 types", () => {
    expect(petStrollers()).toHaveLength(5);
  });
});
