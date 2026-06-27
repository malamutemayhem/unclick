import { describe, it, expect } from "vitest";
import {
  colonyElimination, protectionDuration, disruption, chemicalExposure,
  treatmentCost, requiresEvacuation, preventative, activeAgent,
  bestScenario, termiteTreatments,
} from "../termite-treatment-calc.js";

describe("colonyElimination", () => {
  it("bait system best colony elimination", () => {
    expect(colonyElimination("bait_system")).toBeGreaterThan(colonyElimination("borate_wood"));
  });
});

describe("protectionDuration", () => {
  it("bait system longest protection", () => {
    expect(protectionDuration("bait_system")).toBeGreaterThan(protectionDuration("fumigation"));
  });
});

describe("disruption", () => {
  it("fumigation most disruptive", () => {
    expect(disruption("fumigation")).toBeGreaterThan(disruption("bait_system"));
  });
});

describe("chemicalExposure", () => {
  it("fumigation highest chemical exposure", () => {
    expect(chemicalExposure("fumigation")).toBeGreaterThan(chemicalExposure("heat_treatment"));
  });
});

describe("treatmentCost", () => {
  it("fumigation most expensive", () => {
    expect(treatmentCost("fumigation")).toBeGreaterThan(treatmentCost("borate_wood"));
  });
});

describe("requiresEvacuation", () => {
  it("fumigation requires evacuation", () => {
    expect(requiresEvacuation("fumigation")).toBe(true);
  });
  it("bait system does not", () => {
    expect(requiresEvacuation("bait_system")).toBe(false);
  });
});

describe("preventative", () => {
  it("liquid barrier is preventative", () => {
    expect(preventative("liquid_barrier")).toBe(true);
  });
  it("fumigation is not", () => {
    expect(preventative("fumigation")).toBe(false);
  });
});

describe("activeAgent", () => {
  it("fumigation uses sulfuryl fluoride tent", () => {
    expect(activeAgent("fumigation")).toBe("sulfuryl_fluoride_tent");
  });
});

describe("bestScenario", () => {
  it("bait system for active colony monitoring", () => {
    expect(bestScenario("bait_system")).toBe("active_colony_monitoring");
  });
});

describe("termiteTreatments", () => {
  it("returns 5 treatments", () => {
    expect(termiteTreatments()).toHaveLength(5);
  });
});
