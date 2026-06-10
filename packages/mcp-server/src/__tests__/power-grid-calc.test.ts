import { describe, it, expect } from "vitest";
import {
  reliabilityScore, scalability, renewableIntegration,
  transmissionLoss, implementationCost, selfHealing,
  connectedToMainGrid, bestApplication, controlMechanism, gridTypes,
} from "../power-grid-calc.js";

describe("reliabilityScore", () => {
  it("smart grid most reliable", () => {
    expect(reliabilityScore("smart_grid")).toBeGreaterThan(
      reliabilityScore("island")
    );
  });
});

describe("scalability", () => {
  it("centralized most scalable", () => {
    expect(scalability("centralized")).toBeGreaterThan(
      scalability("island")
    );
  });
});

describe("renewableIntegration", () => {
  it("smart grid best for renewables", () => {
    expect(renewableIntegration("smart_grid")).toBeGreaterThan(
      renewableIntegration("centralized")
    );
  });
});

describe("transmissionLoss", () => {
  it("centralized has most loss", () => {
    expect(transmissionLoss("centralized")).toBeGreaterThan(
      transmissionLoss("island")
    );
  });
});

describe("implementationCost", () => {
  it("smart grid costs most", () => {
    expect(implementationCost("smart_grid")).toBeGreaterThan(
      implementationCost("island")
    );
  });
});

describe("selfHealing", () => {
  it("smart grid is self healing", () => {
    expect(selfHealing("smart_grid")).toBe(true);
  });
  it("centralized is not", () => {
    expect(selfHealing("centralized")).toBe(false);
  });
});

describe("connectedToMainGrid", () => {
  it("centralized is connected", () => {
    expect(connectedToMainGrid("centralized")).toBe(true);
  });
  it("island is not", () => {
    expect(connectedToMainGrid("island")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("island for remote community", () => {
    expect(bestApplication("island")).toBe("remote_community");
  });
});

describe("controlMechanism", () => {
  it("smart grid uses AI optimization", () => {
    expect(controlMechanism("smart_grid")).toBe("ai_optimization");
  });
});

describe("gridTypes", () => {
  it("returns 5 types", () => {
    expect(gridTypes()).toHaveLength(5);
  });
});
