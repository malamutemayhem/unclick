import { describe, it, expect } from "vitest";
import {
  filmUniformity, throughput, thicknessControl, edgeBead,
  scCost, automated, forPhotoresist, coaterConfig,
  bestUse, spinCoaterTypes,
} from "../spin-coater-calc.js";

describe("filmUniformity", () => {
  it("cluster spin best film uniformity", () => {
    expect(filmUniformity("cluster_spin")).toBeGreaterThan(filmUniformity("manual_spin"));
  });
});

describe("throughput", () => {
  it("cluster spin highest throughput", () => {
    expect(throughput("cluster_spin")).toBeGreaterThan(throughput("manual_spin"));
  });
});

describe("thicknessControl", () => {
  it("cluster spin best thickness control", () => {
    expect(thicknessControl("cluster_spin")).toBeGreaterThan(thicknessControl("manual_spin"));
  });
});

describe("edgeBead", () => {
  it("cluster spin best edge bead control", () => {
    expect(edgeBead("cluster_spin")).toBeGreaterThan(edgeBead("manual_spin"));
  });
});

describe("scCost", () => {
  it("cluster spin most expensive", () => {
    expect(scCost("cluster_spin")).toBeGreaterThan(scCost("manual_spin"));
  });
});

describe("automated", () => {
  it("cluster spin is automated", () => {
    expect(automated("cluster_spin")).toBe(true);
  });
  it("manual spin not automated", () => {
    expect(automated("manual_spin")).toBe(false);
  });
});

describe("forPhotoresist", () => {
  it("cluster spin for photoresist", () => {
    expect(forPhotoresist("cluster_spin")).toBe(true);
  });
  it("hot plate spin not for photoresist", () => {
    expect(forPhotoresist("hot_plate_spin")).toBe(false);
  });
});

describe("coaterConfig", () => {
  it("dual dispense uses two nozzle primer resist sequence", () => {
    expect(coaterConfig("dual_dispense")).toBe("dual_dispense_spin_coater_two_nozzle_primer_resist_sequence");
  });
});

describe("bestUse", () => {
  it("manual spin for lab research single wafer photoresist dev", () => {
    expect(bestUse("manual_spin")).toBe("lab_research_manual_spin_coater_single_wafer_photoresist_dev");
  });
});

describe("spinCoaterTypes", () => {
  it("returns 5 types", () => {
    expect(spinCoaterTypes()).toHaveLength(5);
  });
});
