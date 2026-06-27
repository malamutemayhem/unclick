import { describe, it, expect } from "vitest";
import {
  diversionRate, ghgEmissions, operatingCost,
  landRequired, resourceRecovery, producesEnergy,
  acceptsOrganicWaste, byproduct, bestForWasteType, wasteManagementMethods,
} from "../waste-management-calc.js";

describe("diversionRate", () => {
  it("recycling highest diversion", () => {
    expect(diversionRate("recycling")).toBeGreaterThan(
      diversionRate("landfill")
    );
  });
});

describe("ghgEmissions", () => {
  it("landfill highest emissions", () => {
    expect(ghgEmissions("landfill")).toBeGreaterThan(
      ghgEmissions("recycling")
    );
  });
});

describe("operatingCost", () => {
  it("incineration most expensive", () => {
    expect(operatingCost("incineration")).toBeGreaterThan(
      operatingCost("landfill")
    );
  });
});

describe("landRequired", () => {
  it("landfill needs most land", () => {
    expect(landRequired("landfill")).toBeGreaterThan(
      landRequired("incineration")
    );
  });
});

describe("resourceRecovery", () => {
  it("recycling best recovery", () => {
    expect(resourceRecovery("recycling")).toBeGreaterThan(
      resourceRecovery("landfill")
    );
  });
});

describe("producesEnergy", () => {
  it("incineration produces energy", () => {
    expect(producesEnergy("incineration")).toBe(true);
  });
  it("recycling does not", () => {
    expect(producesEnergy("recycling")).toBe(false);
  });
});

describe("acceptsOrganicWaste", () => {
  it("composting accepts organic", () => {
    expect(acceptsOrganicWaste("composting")).toBe(true);
  });
  it("recycling does not", () => {
    expect(acceptsOrganicWaste("recycling")).toBe(false);
  });
});

describe("byproduct", () => {
  it("anaerobic digestion produces biogas", () => {
    expect(byproduct("anaerobic_digestion")).toBe("biogas");
  });
});

describe("bestForWasteType", () => {
  it("composting best for food and garden", () => {
    expect(bestForWasteType("composting")).toBe("food_garden");
  });
});

describe("wasteManagementMethods", () => {
  it("returns 5 methods", () => {
    expect(wasteManagementMethods()).toHaveLength(5);
  });
});
