import { describe, it, expect } from "vitest";
import {
  energyReductionPercent, certificationCost, marketAdoption,
  occupantHealthFocus, waterConservation, netZeroRequired,
  focusesOnEnvelope, originCountry, primaryMetric, greenBuildingStandards,
} from "../green-building-calc.js";

describe("energyReductionPercent", () => {
  it("living building highest reduction", () => {
    expect(energyReductionPercent("living_building")).toBeGreaterThan(
      energyReductionPercent("leed")
    );
  });
});

describe("certificationCost", () => {
  it("living building most expensive cert", () => {
    expect(certificationCost("living_building")).toBeGreaterThan(
      certificationCost("breeam")
    );
  });
});

describe("marketAdoption", () => {
  it("leed most adopted", () => {
    expect(marketAdoption("leed")).toBeGreaterThan(
      marketAdoption("living_building")
    );
  });
});

describe("occupantHealthFocus", () => {
  it("well most health focused", () => {
    expect(occupantHealthFocus("well")).toBeGreaterThan(
      occupantHealthFocus("passivhaus")
    );
  });
});

describe("waterConservation", () => {
  it("living building best water conservation", () => {
    expect(waterConservation("living_building")).toBeGreaterThan(
      waterConservation("passivhaus")
    );
  });
});

describe("netZeroRequired", () => {
  it("living building requires net zero", () => {
    expect(netZeroRequired("living_building")).toBe(true);
  });
  it("leed does not", () => {
    expect(netZeroRequired("leed")).toBe(false);
  });
});

describe("focusesOnEnvelope", () => {
  it("passivhaus focuses on envelope", () => {
    expect(focusesOnEnvelope("passivhaus")).toBe(true);
  });
  it("well does not", () => {
    expect(focusesOnEnvelope("well")).toBe(false);
  });
});

describe("originCountry", () => {
  it("passivhaus from germany", () => {
    expect(originCountry("passivhaus")).toBe("germany");
  });
});

describe("primaryMetric", () => {
  it("well measures health performance", () => {
    expect(primaryMetric("well")).toBe("health_performance");
  });
});

describe("greenBuildingStandards", () => {
  it("returns 5 standards", () => {
    expect(greenBuildingStandards()).toHaveLength(5);
  });
});
