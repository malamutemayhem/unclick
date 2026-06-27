import { describe, it, expect } from "vitest";
import {
  targetMoisturePercent, dryingDays, tempCelsius,
  humidityPercent, shrinkagePercent, defectRisk,
  energyCostRating, colorChangeRisk, costPerBoardFoot, kilnDryingWoods,
} from "../kiln-drying-calc.js";

describe("targetMoisturePercent", () => {
  it("walnut has lowest target moisture", () => {
    expect(targetMoisturePercent("walnut")).toBeLessThan(
      targetMoisturePercent("pine")
    );
  });
});

describe("dryingDays", () => {
  it("oak takes longest to dry", () => {
    expect(dryingDays("oak")).toBeGreaterThan(
      dryingDays("pine")
    );
  });
});

describe("tempCelsius", () => {
  it("pine uses highest temp", () => {
    expect(tempCelsius("pine")).toBeGreaterThan(
      tempCelsius("cherry")
    );
  });
});

describe("humidityPercent", () => {
  it("pine needs highest humidity", () => {
    expect(humidityPercent("pine")).toBeGreaterThan(
      humidityPercent("oak")
    );
  });
});

describe("shrinkagePercent", () => {
  it("maple shrinks most", () => {
    expect(shrinkagePercent("maple")).toBeGreaterThan(
      shrinkagePercent("pine")
    );
  });
});

describe("defectRisk", () => {
  it("maple has highest defect risk", () => {
    expect(defectRisk("maple")).toBeGreaterThan(
      defectRisk("pine")
    );
  });
});

describe("energyCostRating", () => {
  it("oak costs most energy", () => {
    expect(energyCostRating("oak")).toBeGreaterThan(
      energyCostRating("pine")
    );
  });
});

describe("colorChangeRisk", () => {
  it("cherry risks color change", () => {
    expect(colorChangeRisk("cherry")).toBe(true);
  });
  it("walnut does not", () => {
    expect(colorChangeRisk("walnut")).toBe(false);
  });
});

describe("costPerBoardFoot", () => {
  it("walnut costs most", () => {
    expect(costPerBoardFoot("walnut")).toBeGreaterThan(
      costPerBoardFoot("pine")
    );
  });
});

describe("kilnDryingWoods", () => {
  it("returns 5 woods", () => {
    expect(kilnDryingWoods()).toHaveLength(5);
  });
});
