import { describe, it, expect } from "vitest";
import {
  capacityPerHour, avgSpeedKmh, capitalCostPerKmM,
  constructionYears, reliabilityScore, gradeseparated,
  electricPowered, guidanceTech, bestUseCase, transitModes,
} from "../transit-mode-calc.js";

describe("capacityPerHour", () => {
  it("metro highest capacity", () => {
    expect(capacityPerHour("metro")).toBeGreaterThan(
      capacityPerHour("bus")
    );
  });
});

describe("avgSpeedKmh", () => {
  it("commuter rail fastest", () => {
    expect(avgSpeedKmh("commuter_rail")).toBeGreaterThan(
      avgSpeedKmh("bus")
    );
  });
});

describe("capitalCostPerKmM", () => {
  it("metro most expensive", () => {
    expect(capitalCostPerKmM("metro")).toBeGreaterThan(
      capitalCostPerKmM("brt")
    );
  });
});

describe("constructionYears", () => {
  it("metro longest to build", () => {
    expect(constructionYears("metro")).toBeGreaterThan(
      constructionYears("bus")
    );
  });
});

describe("reliabilityScore", () => {
  it("metro most reliable", () => {
    expect(reliabilityScore("metro")).toBeGreaterThan(
      reliabilityScore("bus")
    );
  });
});

describe("gradeseparated", () => {
  it("metro is grade separated", () => {
    expect(gradeseparated("metro")).toBe(true);
  });
  it("bus is not", () => {
    expect(gradeseparated("bus")).toBe(false);
  });
});

describe("electricPowered", () => {
  it("light rail is electric", () => {
    expect(electricPowered("light_rail")).toBe(true);
  });
  it("bus is not", () => {
    expect(electricPowered("bus")).toBe(false);
  });
});

describe("guidanceTech", () => {
  it("bus is driver steered", () => {
    expect(guidanceTech("bus")).toBe("driver_steered");
  });
});

describe("bestUseCase", () => {
  it("metro for high demand trunk", () => {
    expect(bestUseCase("metro")).toBe("high_demand_trunk");
  });
});

describe("transitModes", () => {
  it("returns 5 modes", () => {
    expect(transitModes()).toHaveLength(5);
  });
});
