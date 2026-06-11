import { describe, it, expect } from "vitest";
import {
  sensitivity, selectivity, lifespan, response,
  gdCost, continuous, forLel, sensor,
  bestUse, gasDetectorCatTypes,
} from "../gas-detector-cat-calc.js";

describe("sensitivity", () => {
  it("pid most sensitive", () => {
    expect(sensitivity("photoionization_pid")).toBeGreaterThan(sensitivity("catalytic_bead_lel"));
  });
});

describe("selectivity", () => {
  it("electrochemical most selective", () => {
    expect(selectivity("electrochemical_toxic")).toBeGreaterThan(selectivity("semiconductor_mos"));
  });
});

describe("lifespan", () => {
  it("fid longest lifespan", () => {
    expect(lifespan("flame_ionization_fid")).toBeGreaterThan(lifespan("electrochemical_toxic"));
  });
});

describe("response", () => {
  it("pid fastest response", () => {
    expect(response("photoionization_pid")).toBeGreaterThan(response("electrochemical_toxic"));
  });
});

describe("gdCost", () => {
  it("fid most expensive", () => {
    expect(gdCost("flame_ionization_fid")).toBeGreaterThan(gdCost("semiconductor_mos"));
  });
});

describe("continuous", () => {
  it("all are continuous monitoring", () => {
    expect(continuous("catalytic_bead_lel")).toBe(true);
    expect(continuous("electrochemical_toxic")).toBe(true);
  });
});

describe("forLel", () => {
  it("catalytic bead for lel detection", () => {
    expect(forLel("catalytic_bead_lel")).toBe(true);
  });
  it("electrochemical not for lel", () => {
    expect(forLel("electrochemical_toxic")).toBe(false);
  });
});

describe("sensor", () => {
  it("catalytic bead uses platinum coil", () => {
    expect(sensor("catalytic_bead_lel")).toBe("platinum_coil_bead_catalytic_oxidation");
  });
});

describe("bestUse", () => {
  it("pid for voc detection", () => {
    expect(bestUse("photoionization_pid")).toBe("voc_leak_detect_benzene_toluene_ppb");
  });
});

describe("gasDetectorCatTypes", () => {
  it("returns 5 types", () => {
    expect(gasDetectorCatTypes()).toHaveLength(5);
  });
});
