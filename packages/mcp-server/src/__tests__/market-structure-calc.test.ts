import { describe, it, expect } from "vitest";
import {
  numFirms, priceControlPower, barriersToEntry,
  productDifferentiation, consumerSurplus, priceTaker,
  requiresRegulation, realWorldExample, efficiencyType, marketStructures,
} from "../market-structure-calc.js";

describe("numFirms", () => {
  it("perfect competition has most firms", () => {
    expect(numFirms("perfect_competition")).toBeGreaterThan(
      numFirms("monopoly")
    );
  });
});

describe("priceControlPower", () => {
  it("monopoly has most price control", () => {
    expect(priceControlPower("monopoly")).toBeGreaterThan(
      priceControlPower("perfect_competition")
    );
  });
});

describe("barriersToEntry", () => {
  it("monopoly highest barriers", () => {
    expect(barriersToEntry("monopoly")).toBeGreaterThan(
      barriersToEntry("monopolistic_competition")
    );
  });
});

describe("productDifferentiation", () => {
  it("monopolistic competition most differentiated", () => {
    expect(productDifferentiation("monopolistic_competition")).toBeGreaterThan(
      productDifferentiation("perfect_competition")
    );
  });
});

describe("consumerSurplus", () => {
  it("perfect competition highest consumer surplus", () => {
    expect(consumerSurplus("perfect_competition")).toBeGreaterThan(
      consumerSurplus("monopoly")
    );
  });
});

describe("priceTaker", () => {
  it("perfect competition is price taker", () => {
    expect(priceTaker("perfect_competition")).toBe(true);
  });
  it("monopoly is not", () => {
    expect(priceTaker("monopoly")).toBe(false);
  });
});

describe("requiresRegulation", () => {
  it("monopoly requires regulation", () => {
    expect(requiresRegulation("monopoly")).toBe(true);
  });
  it("perfect competition does not", () => {
    expect(requiresRegulation("perfect_competition")).toBe(false);
  });
});

describe("realWorldExample", () => {
  it("oligopoly example is airline industry", () => {
    expect(realWorldExample("oligopoly")).toBe("airline_industry");
  });
});

describe("efficiencyType", () => {
  it("perfect competition is allocatively efficient", () => {
    expect(efficiencyType("perfect_competition")).toBe("allocatively_efficient");
  });
});

describe("marketStructures", () => {
  it("returns 5 structures", () => {
    expect(marketStructures()).toHaveLength(5);
  });
});
