import { describe, it, expect } from "vitest";
import {
  sensitivity, range, selectivity, durability,
  gdCost, continuous, forExplosive, sensor,
  bestUse, gasDetectTypes,
} from "../gas-detect-calc.js";

describe("sensitivity", () => {
  it("pid most sensitive", () => {
    expect(sensitivity("photoionization_voc")).toBeGreaterThan(sensitivity("catalytic_bead_lel"));
  });
});

describe("range", () => {
  it("open path widest range", () => {
    expect(range("open_path_laser")).toBeGreaterThan(range("catalytic_bead_lel"));
  });
});

describe("selectivity", () => {
  it("open path most selective", () => {
    expect(selectivity("open_path_laser")).toBeGreaterThan(selectivity("catalytic_bead_lel"));
  });
});

describe("durability", () => {
  it("ndir most durable", () => {
    expect(durability("infrared_point_ndir")).toBeGreaterThan(durability("electrochemical_toxic"));
  });
});

describe("gdCost", () => {
  it("open path most expensive", () => {
    expect(gdCost("open_path_laser")).toBeGreaterThan(gdCost("catalytic_bead_lel"));
  });
});

describe("continuous", () => {
  it("ndir is continuous", () => {
    expect(continuous("infrared_point_ndir")).toBe(true);
  });
  it("pid not continuous", () => {
    expect(continuous("photoionization_voc")).toBe(false);
  });
});

describe("forExplosive", () => {
  it("catalytic for explosive", () => {
    expect(forExplosive("catalytic_bead_lel")).toBe(true);
  });
  it("electrochemical not explosive", () => {
    expect(forExplosive("electrochemical_toxic")).toBe(false);
  });
});

describe("sensor", () => {
  it("pid uses uv lamp", () => {
    expect(sensor("photoionization_voc")).toBe("uv_lamp_pid_broad_spectrum_voc");
  });
});

describe("bestUse", () => {
  it("electrochemical for parking garage", () => {
    expect(bestUse("electrochemical_toxic")).toBe("parking_garage_co_no2_monitor");
  });
});

describe("gasDetectTypes", () => {
  it("returns 5 types", () => {
    expect(gasDetectTypes()).toHaveLength(5);
  });
});
