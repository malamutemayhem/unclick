import { describe, it, expect } from "vitest";
import {
  productVariety, maintenanceFrequency, revenuePerUnit, footprintSqFt,
  purchaseCost, requiresRefrigeration, cashless, dispensingMethod,
  bestLocation, vendingMachines,
} from "../vending-machine-calc.js";

describe("productVariety", () => {
  it("micro market most variety", () => {
    expect(productVariety("micro_market")).toBeGreaterThan(productVariety("robot_barista"));
  });
});

describe("maintenanceFrequency", () => {
  it("robot barista most maintenance", () => {
    expect(maintenanceFrequency("robot_barista")).toBeGreaterThan(maintenanceFrequency("snack_beverage"));
  });
});

describe("revenuePerUnit", () => {
  it("micro market highest revenue", () => {
    expect(revenuePerUnit("micro_market")).toBeGreaterThan(revenuePerUnit("snack_beverage"));
  });
});

describe("footprintSqFt", () => {
  it("micro market largest footprint", () => {
    expect(footprintSqFt("micro_market")).toBeGreaterThan(footprintSqFt("snack_beverage"));
  });
});

describe("purchaseCost", () => {
  it("robot barista most expensive", () => {
    expect(purchaseCost("robot_barista")).toBeGreaterThan(purchaseCost("snack_beverage"));
  });
});

describe("requiresRefrigeration", () => {
  it("fresh food requires refrigeration", () => {
    expect(requiresRefrigeration("fresh_food")).toBe(true);
  });
  it("smart locker does not", () => {
    expect(requiresRefrigeration("smart_locker")).toBe(false);
  });
});

describe("cashless", () => {
  it("micro market is cashless", () => {
    expect(cashless("micro_market")).toBe(true);
  });
  it("snack beverage is not", () => {
    expect(cashless("snack_beverage")).toBe(false);
  });
});

describe("dispensingMethod", () => {
  it("robot barista uses robotic arm brew", () => {
    expect(dispensingMethod("robot_barista")).toBe("robotic_arm_brew");
  });
});

describe("bestLocation", () => {
  it("micro market for large office", () => {
    expect(bestLocation("micro_market")).toBe("large_office_100plus");
  });
});

describe("vendingMachines", () => {
  it("returns 5 machines", () => {
    expect(vendingMachines()).toHaveLength(5);
  });
});
