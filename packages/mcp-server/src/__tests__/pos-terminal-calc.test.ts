import { describe, it, expect } from "vitest";
import {
  transactionSpeed, hardwareCost, portability, receiptOptions,
  customerThroughput, acceptsContactless, requiresInternet, paymentMethods,
  bestBusiness, posTerminals,
} from "../pos-terminal-calc.js";

describe("transactionSpeed", () => {
  it("integrated fastest transactions", () => {
    expect(transactionSpeed("integrated")).toBeGreaterThan(transactionSpeed("mobile"));
  });
});

describe("hardwareCost", () => {
  it("self service kiosk most expensive hardware", () => {
    expect(hardwareCost("self_service_kiosk")).toBeGreaterThan(hardwareCost("virtual"));
  });
});

describe("portability", () => {
  it("mobile most portable", () => {
    expect(portability("mobile")).toBeGreaterThan(portability("countertop"));
  });
});

describe("receiptOptions", () => {
  it("integrated most receipt options", () => {
    expect(receiptOptions("integrated")).toBeGreaterThan(receiptOptions("mobile"));
  });
});

describe("customerThroughput", () => {
  it("self service kiosk highest throughput", () => {
    expect(customerThroughput("self_service_kiosk")).toBeGreaterThan(customerThroughput("virtual"));
  });
});

describe("acceptsContactless", () => {
  it("countertop accepts contactless", () => {
    expect(acceptsContactless("countertop")).toBe(true);
  });
  it("virtual does not", () => {
    expect(acceptsContactless("virtual")).toBe(false);
  });
});

describe("requiresInternet", () => {
  it("mobile requires internet", () => {
    expect(requiresInternet("mobile")).toBe(true);
  });
  it("countertop does not", () => {
    expect(requiresInternet("countertop")).toBe(false);
  });
});

describe("paymentMethods", () => {
  it("integrated supports all payment types", () => {
    expect(paymentMethods("integrated")).toBe("all_payment_types");
  });
});

describe("bestBusiness", () => {
  it("mobile for food truck", () => {
    expect(bestBusiness("mobile")).toBe("food_truck_market_stall");
  });
});

describe("posTerminals", () => {
  it("returns 5 terminals", () => {
    expect(posTerminals()).toHaveLength(5);
  });
});
