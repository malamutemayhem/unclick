import { describe, it, expect } from "vitest";
import {
  effectiveness, operatorRisk, costPerTrigger, weatherDependency,
  repeatability, remoteOperable, requiresPermit, triggerMechanism,
  bestApplication, avalancheControls,
} from "../avalanche-control-calc.js";

describe("effectiveness", () => {
  it("helicopter bomb most effective", () => {
    expect(effectiveness("helicopter_bomb")).toBeGreaterThan(effectiveness("ski_cut"));
  });
});

describe("operatorRisk", () => {
  it("ski cut highest operator risk", () => {
    expect(operatorRisk("ski_cut")).toBeGreaterThan(operatorRisk("gazex"));
  });
});

describe("costPerTrigger", () => {
  it("helicopter bomb most expensive", () => {
    expect(costPerTrigger("helicopter_bomb")).toBeGreaterThan(costPerTrigger("ski_cut"));
  });
});

describe("weatherDependency", () => {
  it("helicopter bomb most weather dependent", () => {
    expect(weatherDependency("helicopter_bomb")).toBeGreaterThan(weatherDependency("gazex"));
  });
});

describe("repeatability", () => {
  it("gazex most repeatable", () => {
    expect(repeatability("gazex")).toBeGreaterThan(repeatability("helicopter_bomb"));
  });
});

describe("remoteOperable", () => {
  it("gazex is remote operable", () => {
    expect(remoteOperable("gazex")).toBe(true);
  });
  it("explosive is not", () => {
    expect(remoteOperable("explosive")).toBe(false);
  });
});

describe("requiresPermit", () => {
  it("explosive requires permit", () => {
    expect(requiresPermit("explosive")).toBe(true);
  });
  it("ski cut does not", () => {
    expect(requiresPermit("ski_cut")).toBe(false);
  });
});

describe("triggerMechanism", () => {
  it("gazex is propane oxygen explosion", () => {
    expect(triggerMechanism("gazex")).toBe("propane_oxygen_explosion");
  });
});

describe("bestApplication", () => {
  it("avalauncher for highway corridor", () => {
    expect(bestApplication("avalauncher")).toBe("highway_corridor");
  });
});

describe("avalancheControls", () => {
  it("returns 5 controls", () => {
    expect(avalancheControls()).toHaveLength(5);
  });
});
