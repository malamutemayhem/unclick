import { describe, it, expect } from "vitest";
import {
  survivalImpact, weightGrams, costUsd, trainingRequired,
  reliabilityScore, requiresBattery, preventsBurial, rescuePhase,
  bestScenario, snowSafetyGears,
} from "../snow-safety-gear-calc.js";

describe("survivalImpact", () => {
  it("beacon highest survival impact", () => {
    expect(survivalImpact("beacon")).toBeGreaterThan(survivalImpact("avalung"));
  });
});

describe("weightGrams", () => {
  it("airbag pack heaviest", () => {
    expect(weightGrams("airbag_pack")).toBeGreaterThan(weightGrams("beacon"));
  });
});

describe("costUsd", () => {
  it("airbag pack most expensive", () => {
    expect(costUsd("airbag_pack")).toBeGreaterThan(costUsd("probe"));
  });
});

describe("trainingRequired", () => {
  it("beacon most training", () => {
    expect(trainingRequired("beacon")).toBeGreaterThan(trainingRequired("shovel"));
  });
});

describe("reliabilityScore", () => {
  it("probe most reliable", () => {
    expect(reliabilityScore("probe")).toBeGreaterThan(reliabilityScore("avalung"));
  });
});

describe("requiresBattery", () => {
  it("beacon requires battery", () => {
    expect(requiresBattery("beacon")).toBe(true);
  });
  it("probe does not", () => {
    expect(requiresBattery("probe")).toBe(false);
  });
});

describe("preventsBurial", () => {
  it("airbag pack prevents burial", () => {
    expect(preventsBurial("airbag_pack")).toBe(true);
  });
  it("beacon does not", () => {
    expect(preventsBurial("beacon")).toBe(false);
  });
});

describe("rescuePhase", () => {
  it("beacon is electronic signal search", () => {
    expect(rescuePhase("beacon")).toBe("electronic_signal_search");
  });
});

describe("bestScenario", () => {
  it("airbag pack for high consequence terrain", () => {
    expect(bestScenario("airbag_pack")).toBe("high_consequence_terrain");
  });
});

describe("snowSafetyGears", () => {
  it("returns 5 gears", () => {
    expect(snowSafetyGears()).toHaveLength(5);
  });
});
