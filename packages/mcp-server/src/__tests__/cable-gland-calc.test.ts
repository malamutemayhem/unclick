import { describe, it, expect } from "vitest";
import {
  sealRating, cableRange, pulloutResist, corrosionResist,
  glandCost, metalBody, forHazardous, threadType,
  bestUse, cableGlands,
} from "../cable-gland-calc.js";

describe("sealRating", () => {
  it("explosion proof highest seal rating", () => {
    expect(sealRating("explosion_proof_exd")).toBeGreaterThan(sealRating("emt_strain_relief"));
  });
});

describe("cableRange", () => {
  it("brass nickel plated widest cable range", () => {
    expect(cableRange("brass_nickel_plated")).toBeGreaterThan(cableRange("explosion_proof_exd"));
  });
});

describe("pulloutResist", () => {
  it("explosion proof highest pullout resistance", () => {
    expect(pulloutResist("explosion_proof_exd")).toBeGreaterThan(pulloutResist("nylon_metric_standard"));
  });
});

describe("corrosionResist", () => {
  it("stainless marine grade best corrosion resistance", () => {
    expect(corrosionResist("stainless_marine_grade")).toBeGreaterThan(corrosionResist("emt_strain_relief"));
  });
});

describe("glandCost", () => {
  it("explosion proof most expensive", () => {
    expect(glandCost("explosion_proof_exd")).toBeGreaterThan(glandCost("nylon_metric_standard"));
  });
});

describe("metalBody", () => {
  it("brass nickel plated has metal body", () => {
    expect(metalBody("brass_nickel_plated")).toBe(true);
  });
  it("nylon metric standard no metal body", () => {
    expect(metalBody("nylon_metric_standard")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("explosion proof is for hazardous", () => {
    expect(forHazardous("explosion_proof_exd")).toBe(true);
  });
  it("brass nickel plated not for hazardous", () => {
    expect(forHazardous("brass_nickel_plated")).toBe(false);
  });
});

describe("threadType", () => {
  it("stainless marine grade uses npt pipe thread", () => {
    expect(threadType("stainless_marine_grade")).toBe("npt_pipe_thread");
  });
});

describe("bestUse", () => {
  it("explosion proof best for atex zone cable entry", () => {
    expect(bestUse("explosion_proof_exd")).toBe("atex_zone_cable_entry");
  });
});

describe("cableGlands", () => {
  it("returns 5 types", () => {
    expect(cableGlands()).toHaveLength(5);
  });
});
