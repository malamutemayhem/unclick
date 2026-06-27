import { describe, it, expect } from "vitest";
import {
  accuracy, speed, convergence, capacity,
  simCost, parallel, forSignoff, engine,
  bestUse, spiceSims,
} from "../spice-sim-calc.js";

describe("accuracy", () => {
  it("dc operating point highest accuracy", () => {
    expect(accuracy("dc_operating_point")).toBeGreaterThan(accuracy("monte_carlo_stat"));
  });
});

describe("speed", () => {
  it("dc operating point fastest", () => {
    expect(speed("dc_operating_point")).toBeGreaterThan(speed("monte_carlo_stat"));
  });
});

describe("convergence", () => {
  it("ac frequency sweep best convergence", () => {
    expect(convergence("ac_frequency_sweep")).toBeGreaterThan(convergence("transient_time_domain"));
  });
});

describe("capacity", () => {
  it("dc operating point largest capacity", () => {
    expect(capacity("dc_operating_point")).toBeGreaterThan(capacity("monte_carlo_stat"));
  });
});

describe("simCost", () => {
  it("monte carlo stat most expensive", () => {
    expect(simCost("monte_carlo_stat")).toBeGreaterThan(simCost("dc_operating_point"));
  });
});

describe("parallel", () => {
  it("monte carlo stat is parallel", () => {
    expect(parallel("monte_carlo_stat")).toBe(true);
  });
  it("transient time domain not parallel", () => {
    expect(parallel("transient_time_domain")).toBe(false);
  });
});

describe("forSignoff", () => {
  it("corner pvt for signoff", () => {
    expect(forSignoff("corner_pvt")).toBe(true);
  });
  it("ac frequency sweep not for signoff", () => {
    expect(forSignoff("ac_frequency_sweep")).toBe(false);
  });
});

describe("engine", () => {
  it("monte carlo stat uses random param variation", () => {
    expect(engine("monte_carlo_stat")).toBe("random_param_variation");
  });
});

describe("bestUse", () => {
  it("corner pvt best for worst case timing margin", () => {
    expect(bestUse("corner_pvt")).toBe("worst_case_timing_margin");
  });
});

describe("spiceSims", () => {
  it("returns 5 types", () => {
    expect(spiceSims()).toHaveLength(5);
  });
});
