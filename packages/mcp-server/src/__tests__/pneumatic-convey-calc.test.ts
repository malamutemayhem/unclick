import { describe, it, expect } from "vitest";
import {
  throughput, distance, gentleness, dustFree,
  pcCost, enclosed, forFragile, transport,
  bestUse, pneumaticConveyTypes,
} from "../pneumatic-convey-calc.js";

describe("throughput", () => {
  it("semi dense highest throughput", () => {
    expect(throughput("semi_dense_medium")).toBeGreaterThan(throughput("dilute_phase_vacuum"));
  });
});

describe("distance", () => {
  it("dense phase slug longest distance", () => {
    expect(distance("dense_phase_slug")).toBeGreaterThan(distance("dilute_phase_vacuum"));
  });
});

describe("gentleness", () => {
  it("dense phase plug gentlest", () => {
    expect(gentleness("dense_phase_plug")).toBeGreaterThan(gentleness("dilute_phase_positive"));
  });
});

describe("dustFree", () => {
  it("dilute vacuum best dust free", () => {
    expect(dustFree("dilute_phase_vacuum")).toBeGreaterThan(dustFree("dense_phase_slug"));
  });
});

describe("pcCost", () => {
  it("dense phase slug most expensive", () => {
    expect(pcCost("dense_phase_slug")).toBeGreaterThan(pcCost("dilute_phase_vacuum"));
  });
});

describe("enclosed", () => {
  it("all pneumatic conveyors are enclosed", () => {
    expect(enclosed("dilute_phase_positive")).toBe(true);
    expect(enclosed("dense_phase_slug")).toBe(true);
  });
});

describe("forFragile", () => {
  it("dense phase plug for fragile", () => {
    expect(forFragile("dense_phase_plug")).toBe(true);
  });
  it("dilute phase not for fragile", () => {
    expect(forFragile("dilute_phase_positive")).toBe(false);
  });
});

describe("transport", () => {
  it("semi dense uses medium velocity strand", () => {
    expect(transport("semi_dense_medium")).toBe("medium_velocity_strand_flow_transition");
  });
});

describe("bestUse", () => {
  it("dense phase plug for pellet granule", () => {
    expect(bestUse("dense_phase_plug")).toBe("pellet_granule_minimal_breakage_attrition");
  });
});

describe("pneumaticConveyTypes", () => {
  it("returns 5 types", () => {
    expect(pneumaticConveyTypes()).toHaveLength(5);
  });
});
