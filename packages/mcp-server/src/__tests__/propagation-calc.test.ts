import { describe, it, expect } from "vitest";
import {
  rootingWeeks, successRatePercent, parentPlantStress,
  hormoneRequired, newPlantsPerAttempt, equipmentNeeded,
  seasonDependent, skillLevel, costPerAttempt, propagationMethods,
} from "../propagation-calc.js";

describe("rootingWeeks", () => {
  it("layering takes longest", () => {
    expect(rootingWeeks("layering")).toBeGreaterThan(
      rootingWeeks("stem_cutting")
    );
  });
  it("division is instant", () => {
    expect(rootingWeeks("division")).toBe(0);
  });
});

describe("successRatePercent", () => {
  it("division has highest success", () => {
    expect(successRatePercent("division")).toBeGreaterThan(
      successRatePercent("leaf_cutting")
    );
  });
});

describe("parentPlantStress", () => {
  it("division is most stressful", () => {
    expect(parentPlantStress("division")).toBeGreaterThan(
      parentPlantStress("layering")
    );
  });
});

describe("hormoneRequired", () => {
  it("stem cutting needs hormone", () => {
    expect(hormoneRequired("stem_cutting")).toBe(true);
  });
  it("division does not", () => {
    expect(hormoneRequired("division")).toBe(false);
  });
});

describe("newPlantsPerAttempt", () => {
  it("division yields most plants", () => {
    expect(newPlantsPerAttempt("division")).toBeGreaterThan(
      newPlantsPerAttempt("stem_cutting")
    );
  });
});

describe("equipmentNeeded", () => {
  it("air layering needs most equipment", () => {
    expect(equipmentNeeded("air_layering")).toBeGreaterThan(
      equipmentNeeded("leaf_cutting")
    );
  });
});

describe("seasonDependent", () => {
  it("division is most season dependent", () => {
    expect(seasonDependent("division")).toBeGreaterThan(
      seasonDependent("air_layering")
    );
  });
});

describe("skillLevel", () => {
  it("air layering needs most skill", () => {
    expect(skillLevel("air_layering")).toBeGreaterThan(
      skillLevel("leaf_cutting")
    );
  });
});

describe("costPerAttempt", () => {
  it("air layering is most expensive", () => {
    expect(costPerAttempt("air_layering")).toBeGreaterThan(
      costPerAttempt("leaf_cutting")
    );
  });
});

describe("propagationMethods", () => {
  it("returns 5 methods", () => {
    expect(propagationMethods()).toHaveLength(5);
  });
});
