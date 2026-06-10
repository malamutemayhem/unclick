import { describe, it, expect } from "vitest";
import {
  elasticity, heatResistanceCelsius, chemicalResistance,
  oilResistance, gasImpermeability, biodegradable,
  foodSafe, bestApplication, costPerKg, rubberTypes,
} from "../rubber-type-calc.js";

describe("elasticity", () => {
  it("natural rubber is most elastic", () => {
    expect(elasticity("natural")).toBeGreaterThan(elasticity("butyl"));
  });
});

describe("heatResistanceCelsius", () => {
  it("silicone handles most heat", () => {
    expect(heatResistanceCelsius("silicone")).toBeGreaterThan(
      heatResistanceCelsius("natural")
    );
  });
});

describe("chemicalResistance", () => {
  it("nitrile resists chemicals best", () => {
    expect(chemicalResistance("nitrile")).toBeGreaterThan(
      chemicalResistance("natural")
    );
  });
});

describe("oilResistance", () => {
  it("nitrile resists oil best", () => {
    expect(oilResistance("nitrile")).toBeGreaterThan(
      oilResistance("natural")
    );
  });
});

describe("gasImpermeability", () => {
  it("butyl is most gas impermeable", () => {
    expect(gasImpermeability("butyl")).toBeGreaterThan(
      gasImpermeability("silicone")
    );
  });
});

describe("biodegradable", () => {
  it("natural rubber is biodegradable", () => {
    expect(biodegradable("natural")).toBe(true);
  });
  it("silicone is not biodegradable", () => {
    expect(biodegradable("silicone")).toBe(false);
  });
});

describe("foodSafe", () => {
  it("silicone is food safe", () => {
    expect(foodSafe("silicone")).toBe(true);
  });
  it("neoprene is not food safe", () => {
    expect(foodSafe("neoprene")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("nitrile for gloves", () => {
    expect(bestApplication("nitrile")).toBe("gloves");
  });
});

describe("costPerKg", () => {
  it("silicone costs most", () => {
    expect(costPerKg("silicone")).toBeGreaterThan(costPerKg("natural"));
  });
});

describe("rubberTypes", () => {
  it("returns 5 types", () => {
    expect(rubberTypes()).toHaveLength(5);
  });
});
