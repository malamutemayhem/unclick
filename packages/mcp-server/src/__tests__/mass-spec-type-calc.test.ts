import { describe, it, expect } from "vitest";
import {
  resolution, sensitivity, speed, massAccuracy,
  msCost, highRes, forProteomics, analyzer,
  bestUse, massSpecTypes,
} from "../mass-spec-type-calc.js";

describe("resolution", () => {
  it("orbitrap highest resolution", () => {
    expect(resolution("orbitrap_high_res")).toBeGreaterThan(resolution("quadrupole_single_quad"));
  });
});

describe("sensitivity", () => {
  it("triple quad most sensitive", () => {
    expect(sensitivity("triple_quad_mrm")).toBeGreaterThan(sensitivity("quadrupole_single_quad"));
  });
});

describe("speed", () => {
  it("tof fastest", () => {
    expect(speed("tof_time_of_flight")).toBeGreaterThan(speed("orbitrap_high_res"));
  });
});

describe("massAccuracy", () => {
  it("orbitrap best mass accuracy", () => {
    expect(massAccuracy("orbitrap_high_res")).toBeGreaterThan(massAccuracy("triple_quad_mrm"));
  });
});

describe("msCost", () => {
  it("orbitrap most expensive", () => {
    expect(msCost("orbitrap_high_res")).toBeGreaterThan(msCost("quadrupole_single_quad"));
  });
});

describe("highRes", () => {
  it("orbitrap is high res", () => {
    expect(highRes("orbitrap_high_res")).toBe(true);
  });
  it("triple quad not high res", () => {
    expect(highRes("triple_quad_mrm")).toBe(false);
  });
});

describe("forProteomics", () => {
  it("orbitrap for proteomics", () => {
    expect(forProteomics("orbitrap_high_res")).toBe(true);
  });
  it("quadrupole not for proteomics", () => {
    expect(forProteomics("quadrupole_single_quad")).toBe(false);
  });
});

describe("analyzer", () => {
  it("triple quad uses q1 collision q3 mrm", () => {
    expect(analyzer("triple_quad_mrm")).toBe("q1_collision_q3_mrm");
  });
});

describe("bestUse", () => {
  it("orbitrap best for proteomics intact protein", () => {
    expect(bestUse("orbitrap_high_res")).toBe("proteomics_intact_protein_id");
  });
});

describe("massSpecTypes", () => {
  it("returns 5 types", () => {
    expect(massSpecTypes()).toHaveLength(5);
  });
});
